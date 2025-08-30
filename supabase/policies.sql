-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text AND is_admin = true
        )
    );

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text AND is_admin = true
        )
    );

-- Clients policies
CREATE POLICY "Clients can view their own data" ON clients
    FOR SELECT USING (
        user_id::text = auth.uid()::text
    );

CREATE POLICY "Clients can update their own data" ON clients
    FOR UPDATE USING (
        user_id::text = auth.uid()::text
    );

-- Providers policies
CREATE POLICY "Anyone can view providers" ON providers
    FOR SELECT USING (true);

CREATE POLICY "Providers can update their own data" ON providers
    FOR UPDATE USING (
        user_id::text = auth.uid()::text
    );

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses
    FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can manage their own addresses" ON addresses
    FOR ALL USING (user_id::text = auth.uid()::text);

-- Provider specialties policies
CREATE POLICY "Anyone can view provider specialties" ON provider_specialties
    FOR SELECT USING (true);

CREATE POLICY "Providers can manage their own specialties" ON provider_specialties
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM providers 
            WHERE id = provider_id AND user_id::text = auth.uid()::text
        )
    );

-- Service categories policies
CREATE POLICY "Anyone can view service categories" ON service_categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage service categories" ON service_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text AND is_admin = true
        )
    );

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON appointments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM clients c 
            WHERE c.id = client_id AND c.user_id::text = auth.uid()::text
        ) OR
        EXISTS (
            SELECT 1 FROM providers p 
            WHERE p.id = provider_id AND p.user_id::text = auth.uid()::text
        )
    );

CREATE POLICY "Clients can create appointments" ON appointments
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM clients c 
            WHERE c.id = client_id AND c.user_id::text = auth.uid()::text
        )
    );

CREATE POLICY "Users can update their own appointments" ON appointments
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM clients c 
            WHERE c.id = client_id AND c.user_id::text = auth.uid()::text
        ) OR
        EXISTS (
            SELECT 1 FROM providers p 
            WHERE p.id = provider_id AND p.user_id::text = auth.uid()::text
        )
    );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Clients can create reviews for their appointments" ON reviews
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM clients c 
            WHERE c.id = client_id AND c.user_id::text = auth.uid()::text
        )
    );

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
    FOR SELECT USING (
        sender_id::text = auth.uid()::text OR 
        receiver_id::text = auth.uid()::text
    );

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (sender_id::text = auth.uid()::text);

CREATE POLICY "Users can update their own sent messages" ON messages
    FOR UPDATE USING (sender_id::text = auth.uid()::text);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (user_id::text = auth.uid()::text);

CREATE POLICY "System can create notifications" ON notifications
    FOR INSERT WITH CHECK (true);
