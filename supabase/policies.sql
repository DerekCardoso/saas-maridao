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

-- Users policies
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Public read policies for providers and related data (needed for browsing)
CREATE POLICY "Anyone can view providers" ON providers FOR SELECT USING (true);
CREATE POLICY "Anyone can view provider specialties" ON provider_specialties FOR SELECT USING (true);
CREATE POLICY "Anyone can view provider availability" ON provider_availability FOR SELECT USING (true);
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);

-- Allow public read access to user basic info for providers
CREATE POLICY "Anyone can view provider user info" ON users FOR SELECT USING (user_type = 'provider');

-- Clients policies
CREATE POLICY "Users can view their own client data" ON clients FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = clients.user_id AND auth.uid()::text = users.id::text)
);

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = addresses.user_id AND auth.uid()::text = users.id::text)
);

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON appointments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM clients c JOIN users u ON c.user_id = u.id 
    WHERE c.id = appointments.client_id AND auth.uid()::text = u.id::text
  ) OR EXISTS (
    SELECT 1 FROM providers p JOIN users u ON p.user_id = u.id 
    WHERE p.id = appointments.provider_id AND auth.uid()::text = u.id::text
  )
);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages FOR SELECT USING (
  auth.uid()::text = sender_id::text OR auth.uid()::text = receiver_id::text
);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications FOR SELECT USING (
  auth.uid()::text = user_id::text
);

-- Insert policies (for authenticated users)
CREATE POLICY "Authenticated users can insert clients" ON clients FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE users.id = clients.user_id AND auth.uid()::text = users.id::text)
);

CREATE POLICY "Authenticated users can insert providers" ON providers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE users.id = providers.user_id AND auth.uid()::text = users.id::text)
);

CREATE POLICY "Authenticated users can insert addresses" ON addresses FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE users.id = addresses.user_id AND auth.uid()::text = users.id::text)
);

CREATE POLICY "Authenticated users can insert provider specialties" ON provider_specialties FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM providers p JOIN users u ON p.user_id = u.id 
    WHERE p.id = provider_specialties.provider_id AND auth.uid()::text = u.id::text
  )
);
