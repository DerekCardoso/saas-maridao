-- Insert test users with bcrypt hashed passwords
-- Password for all test users: "123456"
-- Hash generated with: bcrypt.hash("123456", 10)

-- Test Admin User
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@maridao.com', 'Admin Sistema', '(11) 99999-0001', 'admin', true, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (email) DO NOTHING;

-- Test Client Users
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'cliente1@teste.com', 'Maria Silva', '(11) 99999-0002', 'client', false, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('550e8400-e29b-41d4-a716-446655440003', 'cliente2@teste.com', 'João Santos', '(11) 99999-0003', 'client', false, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (email) DO NOTHING;

-- Test Provider Users
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'prestador1@teste.com', 'Carlos Pereira', '(11) 99999-0004', 'provider', false, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('550e8400-e29b-41d4-a716-446655440005', 'prestador2@teste.com', 'Ana Costa', '(11) 99999-0005', 'provider', false, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (email) DO NOTHING;

-- Create client records
INSERT INTO clients (id, user_id) VALUES
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003')
ON CONFLICT (user_id) DO NOTHING;

-- Create provider records
INSERT INTO providers (id, user_id, bio, experience_years, rating, is_premium, is_available) VALUES
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Especialista em encanamento com 10 anos de experiência', 10, 4.8, true, true),
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Eletricista certificada, atendimento residencial e comercial', 7, 4.9, false, true)
ON CONFLICT (user_id) DO NOTHING;

-- Add specialties for providers
INSERT INTO provider_specialties (provider_id, name) VALUES
('770e8400-e29b-41d4-a716-446655440004', 'Encanamento'),
('770e8400-e29b-41d4-a716-446655440004', 'Desentupimento'),
('770e8400-e29b-41d4-a716-446655440005', 'Instalação Elétrica'),
('770e8400-e29b-41d4-a716-446655440005', 'Manutenção Elétrica')
ON CONFLICT DO NOTHING;

-- Add test addresses
INSERT INTO addresses (user_id, street, number, neighborhood, city, state, cep, is_primary) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234-567', true),
('550e8400-e29b-41d4-a716-446655440003', 'Av. Paulista', '456', 'Bela Vista', 'São Paulo', 'SP', '01310-100', true),
('550e8400-e29b-41d4-a716-446655440004', 'Rua Augusta', '789', 'Consolação', 'São Paulo', 'SP', '01305-000', true),
('550e8400-e29b-41d4-a716-446655440005', 'Rua Oscar Freire', '321', 'Jardins', 'São Paulo', 'SP', '01426-001', true)
ON CONFLICT DO NOTHING;
