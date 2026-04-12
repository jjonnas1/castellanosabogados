-- Add google_event_id to appointments table for bidirectional GCal sync
alter table public.appointments
  add column if not exists google_event_id text;

create unique index if not exists idx_appointments_google_event_id
  on public.appointments (google_event_id)
  where google_event_id is not null;
