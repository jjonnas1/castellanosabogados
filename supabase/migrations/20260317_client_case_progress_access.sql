-- Enable client-side read access to their legal cases by email
alter table public.legal_cases add column if not exists client_email text;

create index if not exists idx_legal_cases_client_email on public.legal_cases (client_email);

-- Replace select policy so owner or linked client can read
DROP POLICY IF EXISTS "cases_select_own" ON public.legal_cases;
CREATE POLICY "cases_select_owner_or_client"
  ON public.legal_cases
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR lower(coalesce(client_email, '')) = lower(coalesce(auth.jwt()->>'email', ''))
  );

-- Keep strict write ownership for lawyers/admin owners
DROP POLICY IF EXISTS "cases_insert_own" ON public.legal_cases;
CREATE POLICY "cases_insert_own"
  ON public.legal_cases
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "cases_update_own" ON public.legal_cases;
CREATE POLICY "cases_update_own"
  ON public.legal_cases
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "cases_delete_own" ON public.legal_cases;
CREATE POLICY "cases_delete_own"
  ON public.legal_cases
  FOR DELETE
  USING (auth.uid() = user_id);
