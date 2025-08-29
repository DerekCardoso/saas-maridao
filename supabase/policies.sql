-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Allow public read access to basic user info for providers (for listings)
CREATE POLICY "Public can view provider users" ON users
  FOR SELECT USING (user_type = 'provider');

-- Clients policies
CREATE POLICY "Clients can view their own data" ON clients
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Clients can update their own data" ON clients
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Providers policies
CREATE POLICY "Providers can view their own data" ON providers
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Providers can update their own data" ON providers
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Allow public read access to providers (for listings)
CREATE POLICY "Public can view providers" ON providers
  FOR SELECT USING (true);

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own addresses" ON addresses
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Provider specialties policies
CREATE POLICY "Provider specialties are publicly viewable" ON provider_specialties
  FOR SELECT USING (true);

CREATE POLICY "Providers can manage their own specialties" ON provider_specialties
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_specialties.provider_id 
      AND providers.user_id = auth.uid()::text
    )
  );
