-- Insert test admin user
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'admin@maridao.com', 'Admin Maridão', '(11) 99999-0000', 'admin', true, '$2b$10$rQZ9QmZ9QmZ9QmZ9QmZ9QeJ9QmZ9QmZ9QmZ9QmZ9QmZ9QmZ9QmZ9Q')
ON CONFLICT (email) DO NOTHING;

-- Insert test client user
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'cliente@teste.com', 'João Silva', '(11) 99999-1111', 'client', false, '$2b$10$rQZ9QmZ9QmZ9QmZ9QmZ9QeJ9QmZ9QmZ9QmZ9QmZ9QmZ9QmZ9QmZ9Q')
ON CONFLICT (email) DO NOTHING;

-- Insert client record
INSERT INTO clients (id, user_id) VALUES 
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001')
ON CONFLICT DO NOTHING;

-- Insert test provider user
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES 
('550e8400-e29b-41d4-a716-446655440002', 'prestador@teste.com', 'Carlos Santos', '(11) 99999-2222', 'provider', false, '$2b$10$rQZ9QmZ9QmZ9QmZ9QmZ9QeJ9QmZ9QmZ9QmZ9QmZ9QmZ9QmZ9QmZ9Q')
ON CONFLICT (email) DO NOTHING;

-- Insert provider record
INSERT INTO providers (id, user_id, bio, experience_years, is_premium, rating, total_services) VALUES 
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440002', 'Eletricista com 10 anos de experiência', 10, true, 4.8, 150)
ON CONFLICT DO NOTHING;

-- Insert provider specialties
INSERT INTO provider_specialties (provider_id, name) VALUES 
('550e8400-e29b-41d4-a716-446655440012', 'Elétrica'),
('550e8400-e29b-41d4-a716-446655440012', 'Instalações')
ON CONFLICT DO NOTHING;

-- Insert test addresses
INSERT INTO addresses (user_id, street, number, neighborhood, city, state, cep) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234567'),
('550e8400-e29b-41d4-a716-446655440002', 'Av. Paulista', '456', 'Bela Vista', 'São Paulo', 'SP', '01310100')
ON CONFLICT DO NOTHING;

-- Note: All test users have password "123456"
