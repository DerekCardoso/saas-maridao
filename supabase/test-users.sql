-- Insert test users with hashed passwords (password: 123456)
-- Hash generated using bcrypt with salt rounds 10

INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@maridao.com', 'Admin Sistema', '11999999999', 'admin', true, '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ'),
('550e8400-e29b-41d4-a716-446655440002', 'cliente@teste.com', 'Cliente Teste', '11888888888', 'client', false, '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ'),
('550e8400-e29b-41d4-a716-446655440003', 'prestador@teste.com', 'Prestador Teste', '11777777777', 'provider', false, '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ')
ON CONFLICT (email) DO NOTHING;

-- Insert client record
INSERT INTO clients (id, user_id) VALUES
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

-- Insert provider record
INSERT INTO providers (id, user_id, bio, experience_years, rating, is_premium, category_ids) VALUES
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Prestador de serviços experiente', 5, 4.8, true, '{"eletricista", "encanador"}')
ON CONFLICT (id) DO NOTHING;

-- Insert test addresses
INSERT INTO addresses (user_id, street, number, neighborhood, city, state, cep, is_primary) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234-567', true),
('550e8400-e29b-41d4-a716-446655440003', 'Av. Paulista', '456', 'Bela Vista', 'São Paulo', 'SP', '01310-100', true)
ON CONFLICT DO NOTHING;

-- Insert provider specialties
INSERT INTO provider_specialties (provider_id, name) VALUES
('770e8400-e29b-41d4-a716-446655440003', 'Instalação Elétrica'),
('770e8400-e29b-41d4-a716-446655440003', 'Reparo Hidráulico')
ON CONFLICT DO NOTHING;
