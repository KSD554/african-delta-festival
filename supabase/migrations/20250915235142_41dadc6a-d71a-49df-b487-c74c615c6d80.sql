-- Ensure RLS is enabled (safe to run if already enabled)
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- Replace any existing deny-all select policy to avoid duplicates
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'participants' 
      AND policyname = 'No public reads on participants'
  ) THEN
    DROP POLICY "No public reads on participants" ON public.participants;
  END IF;
END$$;

-- Explicitly deny all SELECTs from client roles (anon/authenticated)
CREATE POLICY "No public reads on participants"
ON public.participants
FOR SELECT
USING (false);
