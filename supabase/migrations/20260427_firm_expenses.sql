-- ─── Tabla principal de gastos operativos ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.firm_expenses (
  id                  uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz    NOT NULL DEFAULT now(),
  expense_date        date           NOT NULL,
  category            text           NOT NULL
                                     CHECK (category IN (
                                       'Publicidad','Software/IA','Movilidad',
                                       'Gestoría','Viáticos','Seguridad Social','Otro'
                                     )),
  description         text           NOT NULL,
  vendor_name         text,
  vendor_country      text           NOT NULL DEFAULT 'Colombia',
  vendor_tax_id       text,
  amount              numeric(14,2)  NOT NULL CHECK (amount > 0),
  currency            text           NOT NULL DEFAULT 'COP'
                                     CHECK (currency IN ('COP','USD','EUR')),
  exchange_rate       numeric(10,2)  NOT NULL DEFAULT 1 CHECK (exchange_rate > 0),
  amount_cop          numeric(14,2)  GENERATED ALWAYS AS (round(amount * exchange_rate, 2)) STORED,
  is_deductible       boolean        NOT NULL DEFAULT true,
  payment_method      text           NOT NULL DEFAULT 'Transferencia',
  evidence_url        text,
  related_client_name text,
  related_client_id   uuid           REFERENCES client_profiles(id) ON DELETE SET NULL,
  notes               text,
  created_by          uuid           REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS firm_expenses_date_idx     ON firm_expenses (expense_date DESC);
CREATE INDEX IF NOT EXISTS firm_expenses_category_idx ON firm_expenses (category);
CREATE INDEX IF NOT EXISTS firm_expenses_currency_idx ON firm_expenses (currency);
CREATE INDEX IF NOT EXISTS firm_expenses_deductible_idx ON firm_expenses (is_deductible);

-- ─── RLS ───────────────────────────────────────────────────────────────────────
ALTER TABLE public.firm_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_full_access_expenses" ON public.firm_expenses
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.firm_expenses TO authenticated;
GRANT ALL ON public.firm_expenses TO service_role;

-- ─── View: Renta Líquida Mensual ───────────────────────────────────────────────
-- Ingresos (firm_payments, status != Pendiente) vs Gastos deducibles (firm_expenses)
CREATE OR REPLACE VIEW public.v_renta_liquida_mensual AS
WITH ingresos AS (
  SELECT
    to_char(payment_date, 'YYYY-MM') AS mes,
    date_trunc('month', payment_date::timestamp)::date AS mes_fecha,
    SUM(amount)::numeric(14,2) AS ingresos_brutos,
    COUNT(*) AS num_pagos
  FROM firm_payments
  WHERE status <> 'Pendiente'
  GROUP BY 1, 2
),
gastos AS (
  SELECT
    to_char(expense_date, 'YYYY-MM') AS mes,
    date_trunc('month', expense_date::timestamp)::date AS mes_fecha,
    SUM(amount_cop)::numeric(14,2) AS total_gastos,
    SUM(CASE WHEN is_deductible THEN amount_cop ELSE 0 END)::numeric(14,2) AS gastos_deducibles,
    COUNT(*) AS num_gastos
  FROM firm_expenses
  GROUP BY 1, 2
)
SELECT
  COALESCE(i.mes, g.mes)                                        AS mes,
  COALESCE(i.mes_fecha, g.mes_fecha)                            AS mes_fecha,
  COALESCE(i.ingresos_brutos, 0)                                AS ingresos_brutos,
  COALESCE(g.total_gastos, 0)                                   AS total_gastos,
  COALESCE(g.gastos_deducibles, 0)                              AS gastos_deducibles,
  (COALESCE(i.ingresos_brutos, 0) - COALESCE(g.gastos_deducibles, 0)) AS renta_liquida,
  COALESCE(i.num_pagos, 0)                                      AS num_ingresos,
  COALESCE(g.num_gastos, 0)                                     AS num_gastos
FROM ingresos i
FULL OUTER JOIN gastos g ON i.mes = g.mes
ORDER BY mes DESC;

GRANT SELECT ON public.v_renta_liquida_mensual TO authenticated, service_role;

-- ─── View: Documento Soporte DIAN (gastos exterior) ───────────────────────────
-- Agrupa gastos en moneda extranjera para el Documento Soporte obligatorio
CREATE OR REPLACE VIEW public.v_documento_soporte_dian AS
SELECT
  id,
  expense_date,
  vendor_name,
  vendor_country,
  vendor_tax_id,
  description,
  amount              AS valor_original,
  currency            AS moneda,
  exchange_rate       AS trm_aplicada,
  amount_cop          AS valor_cop,
  round(amount_cop * 0.15, 2) AS retencion_fuente_renta,  -- 15% retención servicios exterior
  round(amount_cop * 0.85, 2) AS neto_pagado_cop,
  is_deductible,
  evidence_url,
  to_char(expense_date, 'YYYY-MM') AS periodo
FROM firm_expenses
WHERE currency <> 'COP'
ORDER BY expense_date DESC;

GRANT SELECT ON public.v_documento_soporte_dian TO authenticated, service_role;

SELECT pg_notify('pgrst', 'reload schema');
