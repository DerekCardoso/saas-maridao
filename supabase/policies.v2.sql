-- RLS must already be enabled (it is in your schema.sql).
-- These policies allow public reads for "public" data that your UI fetches
-- without a Supabase Auth session, while keeping sensitive tables locked.

-- 1) Providers are publicly listable.
DROP POLICY IF EXISTS "Public read providers" ON providers;
CREATE POLICY "Public read providers"
ON providers
FOR SELECT
TO anon
USING (true);

-- 2) Provider specialties are publicly listable.
DROP POLICY IF EXISTS "Public read provider_specialties" ON provider_specialties;
CREATE POLICY "Public read provider_specialties"
ON provider_specialties
FOR SELECT
TO anon
USING (true);

-- 3) Allow reading only provider 'user' rows publicly (for names, etc.)
-- NOTE: This still exposes the full users row for provider accounts.
-- If you need column-level restrictions, prefer a VIEW that selects only safe columns.
DROP POLICY IF EXISTS "Public read users of providers" ON users;
CREATE POLICY "Public read users of providers"
ON users
FOR SELECT
TO anon
USING (
  EXISTS (
    SELECT 1 FROM providers p WHERE p.user_id = users.id
  )
);

-- 4) Reviews can be public (for provider profiles/pages).
DROP POLICY IF EXISTS "Public read reviews" ON reviews;
CREATE POLICY "Public read reviews"
ON reviews
FOR SELECT
TO anon
USING (true);

-- IMPORTANT:
-- Do not add public policies for appointments, messages, notifications, or addresses.
-- Access to those should require an authenticated session, or be done server-side with the admin client.
