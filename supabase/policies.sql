-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Service role can manage all users" ON users
    FOR ALL USING (auth.role() = 'service_role');

-- Clients policies
CREATE POLICY "Clients can view their own data" ON clients
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Service role can manage all clients" ON clients
    FOR ALL USING (auth.role() = 'service_role');

-- Providers policies
CREATE POLICY "Providers can view their own data" ON providers
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Anyone can view available providers" ON providers
    FOR SELECT USING (is_available = true);

CREATE POLICY "Service role can manage all providers" ON providers
    FOR ALL USING (auth.role() = 'service_role');

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own addresses" ON addresses
    FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Service role can manage all addresses" ON addresses
    FOR ALL USING (auth.role() = 'service_role');

-- Provider specialties policies
CREATE POLICY "Anyone can view provider specialties" ON provider_specialties
    FOR SELECT USING (true);

CREATE POLICY "Service role can manage provider specialties" ON provider_specialties
    FOR ALL USING (auth.role() = 'service_role');

-- Appointments policies
CREATE POLICY "Users can view their own appointments" ON appointments
    FOR SELECT USING (
        auth.uid()::text IN (
            SELECT user_id::text FROM clients WHERE id = client_id
            UNION
            SELECT user_id::text FROM providers WHERE id = provider_id
        )
    );

CREATE POLICY "Service role can manage all appointments" ON appointments
    FOR ALL USING (auth.role() = 'service_role');

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Clients can create reviews for their appointments" ON reviews
    FOR INSERT WITH CHECK (
        auth.uid()::text IN (SELECT user_id::text FROM clients WHERE id = client_id)
    );

CREATE POLICY "Service role can manage all reviews" ON reviews
    FOR ALL USING (auth.role() = 'service_role');

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Service role can manage all notifications" ON notifications
    FOR ALL USING (auth.role() = 'service_role');
