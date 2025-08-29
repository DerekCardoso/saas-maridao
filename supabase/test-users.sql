-- Insert test users with bcrypt hashed passwords (password: 123456)
-- Hash generated with: bcrypt.hash('123456', 10)

-- Admin user
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'admin@maridao.com', 'Administrador', '(11) 99999-0000', 'admin', true, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (email) DO NOTHING;

-- Test client
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'cliente@teste.com', 'Cliente Teste', '(11) 99999-1111', 'client', false, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (email) DO NOTHING;

-- Test provider
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES 
('550e8400-e29b-41d4-a716-446655440002', 'prestador@teste.com', 'Prestador Teste', '(11) 99999-2222', 'provider', false, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (email) DO NOTHING;

-- Create client record
INSERT INTO clients (id, user_id) VALUES 
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001')
ON CONFLICT (user_id) DO NOTHING;

-- Create provider record
INSERT INTO providers (id, user_id, bio, experience_years, is_premium, rating, total_services) VALUES 
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440002', 'Prestador de serviços experiente', 5, true, 4.5, 150)
ON CONFLICT (user_id) DO NOTHING;

-- Add provider specialties
INSERT INTO provider_specialties (provider_id, name) VALUES 
('550e8400-e29b-41d4-a716-446655440020', 'Eletricista'),
('550e8400-e29b-41d4-a716-446655440020', 'Encanador'),
('550e8400-e29b-41d4-a716-446655440020', 'Pintor')
ON CONFLICT DO NOTHING;

-- Add test addresses
INSERT INTO addresses (user_id, street, number, neighborhood, city, state, cep, is_primary) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234-567', true),
('550e8400-e29b-41d4-a716-446655440002', 'Av. Paulista', '456', 'Bela Vista', 'São Paulo', 'SP', '01310-100', true)
ON CONFLICT DO NOTHING;
