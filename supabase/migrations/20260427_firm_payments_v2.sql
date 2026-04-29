-- Columnas adicionales para pagos vinculados a clientes e installments
ALTER TABLE public.firm_payments
  ADD COLUMN IF NOT EXISTS client_profile_id uuid REFERENCES client_profiles(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS total_amount      numeric(12,2) CHECK (total_amount >= 0),
  ADD COLUMN IF NOT EXISTS payment_due_date  date;

CREATE INDEX IF NOT EXISTS firm_payments_client_profile_idx ON firm_payments (client_profile_id);

SELECT pg_notify('pgrst', 'reload schema');
