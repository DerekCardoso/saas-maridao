-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow service role to bypass RLS for user management
CREATE POLICY "Service role can manage users" ON users
    FOR ALL USING (auth.role() = 'service_role');

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own addresses" ON addresses
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Clients policies
CREATE POLICY "Clients can view their own data" ON clients
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Service role can manage clients" ON clients
    FOR ALL USING (auth.role() = 'service_role');

-- Providers policies
CREATE POLICY "Anyone can view providers" ON providers
    FOR SELECT USING (true);

CREATE POLICY "Providers can update their own data" ON providers
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Service role can manage providers" ON providers
    FOR ALL USING (auth.role() = 'service_role');

-- Provider specialties policies
CREATE POLICY "Anyone can view provider specialties" ON provider_specialties
    FOR SELECT USING (true);

CREATE POLICY "Providers can manage their own specialties" ON provider_specialties
    FOR ALL USING (
        auth.uid()::text IN (
            SELECT user_id::text FROM providers WHERE id = provider_id
        )
    );

-- Categories policies
CREATE POLICY "Anyone can view categories" ON categories
    FOR SELECT USING (true);

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON appointments
    FOR SELECT USING (
        auth.uid()::text IN (
            SELECT user_id::text FROM clients WHERE id = client_id
            UNION
            SELECT user_id::text FROM providers WHERE id = provider_id
        )
    );

CREATE POLICY "Users can manage their own appointments" ON appointments
    FOR ALL USING (
        auth.uid()::text IN (
            SELECT user_id::text FROM clients WHERE id = client_id
            UNION
            SELECT user_id::text FROM providers WHERE id = provider_id
        )
    );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Clients can create reviews for their appointments" ON reviews
    FOR INSERT WITH CHECK (
        auth.uid()::text IN (
            SELECT user_id::text FROM clients WHERE id = client_id
        )
    );

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
    FOR SELECT USING (
        auth.uid()::text = sender_id::text OR 
        auth.uid()::text = receiver_id::text
    );

CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (auth.uid()::text = sender_id::text);

CREATE POLICY "Users can update their own messages" ON messages
    FOR UPDATE USING (
        auth.uid()::text = sender_id::text OR 
        auth.uid()::text = receiver_id::text
    );
