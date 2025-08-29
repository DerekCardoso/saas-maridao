-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own addresses" ON addresses
  FOR ALL USING (auth.uid()::text = user_id::text);

-- Providers policies
CREATE POLICY "Anyone can view providers" ON providers
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Providers can update their own profile" ON providers
  FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Specialties policies (public read)
CREATE POLICY "Anyone can view specialties" ON specialties
  FOR SELECT TO authenticated, anon USING (true);

-- Provider specialties policies
CREATE POLICY "Anyone can view provider specialties" ON provider_specialties
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Providers can manage their own specialties" ON provider_specialties
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_specialties.provider_id 
      AND providers.user_id::text = auth.uid()::text
    )
  );

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (
    auth.uid()::text = client_id::text OR 
    auth.uid()::text IN (
      SELECT user_id::text FROM providers WHERE id = appointments.provider_id
    )
  );

CREATE POLICY "Clients can create appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid()::text = client_id::text);

CREATE POLICY "Users can update their own appointments" ON appointments
  FOR UPDATE USING (
    auth.uid()::text = client_id::text OR 
    auth.uid()::text IN (
      SELECT user_id::text FROM providers WHERE id = appointments.provider_id
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Clients can create reviews for their appointments" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid()::text = client_id::text AND
    EXISTS (
      SELECT 1 FROM appointments 
      WHERE appointments.id = reviews.appointment_id 
      AND appointments.client_id::text = auth.uid()::text
      AND appointments.status = 'completed'
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid()::text = user_id::text);
