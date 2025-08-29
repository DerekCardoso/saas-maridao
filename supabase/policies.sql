-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view provider users" ON users;
DROP POLICY IF EXISTS "Public can view providers" ON providers;
DROP POLICY IF EXISTS "Provider specialties are publicly viewable" ON provider_specialties;
DROP POLICY IF EXISTS "Public can view reviews" ON reviews;

-- Users policies - Allow public read for provider listings
CREATE POLICY "Public can view provider users" ON users
  FOR SELECT USING (user_type = 'provider');

CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Clients policies
CREATE POLICY "Clients can view their own data" ON clients
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Clients can update their own data" ON clients
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Providers policies - Allow public read for listings
CREATE POLICY "Public can view providers" ON providers
  FOR SELECT USING (true);

CREATE POLICY "Providers can view their own data" ON providers
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Providers can update their own data" ON providers
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own addresses" ON addresses
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own addresses" ON addresses
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Provider specialties policies - Allow public read for listings
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

-- Reviews policies - Allow public read for provider ratings
CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Clients can create reviews" ON reviews
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = reviews.client_id 
      AND clients.user_id = auth.uid()::text
    )
  );

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = appointments.client_id 
      AND clients.user_id = auth.uid()::text
    ) OR EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = appointments.provider_id 
      AND providers.user_id = auth.uid()::text
    )
  );

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (
    auth.uid()::text = sender_id OR auth.uid()::text = receiver_id
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid()::text = user_id);
