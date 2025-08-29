-- Insert test users with hashed passwords (password: 123456)
-- Hash generated with bcrypt rounds=10: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi

-- Admin user
INSERT INTO users (id, email, name, phone, password, user_type, is_admin) 
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@maridao.com',
    'Administrador Sistema',
    '(11) 99999-0000',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin',
    true
) ON CONFLICT (email) DO NOTHING;

-- Test client
INSERT INTO users (id, email, name, phone, password, user_type, is_admin) 
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'cliente@teste.com',
    'Maria Silva Cliente',
    '(11) 99999-1111',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'client',
    false
) ON CONFLICT (email) DO NOTHING;

-- Test provider
INSERT INTO users (id, email, name, phone, password, user_type, is_admin) 
VALUES (
    '00000000-0000-0000-0000-000000000003',
    'prestador@teste.com',
    'João Santos Prestador',
    '(11) 99999-2222',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'provider',
    false
) ON CONFLICT (email) DO NOTHING;

-- Insert client record
INSERT INTO clients (id, user_id) 
VALUES (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002'
) ON CONFLICT (user_id) DO NOTHING;

-- Insert provider record
INSERT INTO providers (id, user_id, bio, experience_years, is_premium, is_available, rating, total_services) 
VALUES (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'Prestador experiente em serviços residenciais e comerciais',
    5,
    true,
    true,
    4.8,
    150
) ON CONFLICT (user_id) DO NOTHING;

-- Insert provider specialties
INSERT INTO provider_specialties (provider_id, name) 
VALUES 
    ('00000000-0000-0000-0000-000000000003', 'Elétrica'),
    ('00000000-0000-0000-0000-000000000003', 'Hidráulica'),
    ('00000000-0000-0000-0000-000000000003', 'Pintura')
ON CONFLICT DO NOTHING;

-- Insert test addresses
INSERT INTO addresses (user_id, street, number, neighborhood, city, state, cep, is_primary) 
VALUES 
    ('00000000-0000-0000-0000-000000000002', 'Rua das Flores', '123', 'Centro', 'São Paulo', 'SP', '01234567', true),
    ('00000000-0000-0000-0000-000000000003', 'Av. Paulista', '456', 'Bela Vista', 'São Paulo', 'SP', '01310100', true)
ON CONFLICT DO NOTHING;

-- Insert test categories
INSERT INTO categories (name, description, icon) 
VALUES 
    ('Elétrica', 'Serviços elétricos residenciais e comerciais', 'zap'),
    ('Hidráulica', 'Serviços de encanamento e hidráulica', 'droplets'),
    ('Pintura', 'Pintura residencial e comercial', 'paintbrush'),
    ('Limpeza', 'Serviços de limpeza e organização', 'sparkles'),
    ('Jardinagem', 'Cuidados com jardins e plantas', 'leaf')
ON CONFLICT (name) DO NOTHING;
