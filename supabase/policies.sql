-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Allow public read access for providers" ON users
    FOR SELECT USING (user_type = 'provider');

-- Clients policies
CREATE POLICY "Clients can view their own data" ON clients
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Clients can update their own data" ON clients
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Providers policies
CREATE POLICY "Providers can view their own data" ON providers
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Providers can update their own data" ON providers
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Allow public read access for providers" ON providers
    FOR SELECT USING (true);

-- Addresses policies
CREATE POLICY "Users can view their own addresses" ON addresses
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own addresses" ON addresses
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own addresses" ON addresses
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own addresses" ON addresses
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Provider specialties policies
CREATE POLICY "Provider specialties are publicly readable" ON provider_specialties
    FOR SELECT USING (true);

CREATE POLICY "Providers can manage their own specialties" ON provider_specialties
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM providers 
            WHERE providers.id = provider_specialties.provider_id 
            AND providers.user_id::text = auth.uid()::text
        )
    );
