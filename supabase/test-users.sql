-- Insert test users with hashed passwords (password: 123456)
-- Note: In production, passwords should be hashed with bcrypt

INSERT INTO users (id, email, password_hash, name, phone, user_type) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@maridao.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'Admin Sistema', '(11) 99999-0000', 'admin'),
  ('550e8400-e29b-41d4-a716-446655440002', 'cliente@teste.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'Cliente Teste', '(11) 99999-1111', 'client'),
  ('550e8400-e29b-41d4-a716-446655440003', 'prestador@teste.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'Prestador Teste', '(11) 99999-2222', 'provider')
ON CONFLICT (email) DO NOTHING;

-- Insert test addresses
INSERT INTO addresses (user_id, street, number, neighborhood, city, state, cep) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Rua Admin', '100', 'Centro', 'São Paulo', 'SP', '01234567'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Rua Cliente', '200', 'Vila Teste', 'São Paulo', 'SP', '01234567'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Rua Prestador', '300', 'Bairro Teste', 'São Paulo', 'SP', '01234567')
ON CONFLICT DO NOTHING;

-- Insert test provider
INSERT INTO providers (user_id, bio, experience_years, is_premium) VALUES
  ('550e8400-e29b-41d4-a716-446655440003', 'Prestador de teste com experiência em múltiplas áreas', 5, true)
ON CONFLICT (user_id) DO NOTHING;

-- Get specialty IDs and insert provider specialties
DO $$
DECLARE
    provider_uuid UUID := '550e8400-e29b-41d4-a716-446655440003';
    provider_id UUID;
    eletrica_id UUID;
    hidraulica_id UUID;
BEGIN
    -- Get provider ID
    SELECT id INTO provider_id FROM providers WHERE user_id = provider_uuid;
    
    -- Get specialty IDs
    SELECT id INTO eletrica_id FROM specialties WHERE name = 'Elétrica';
    SELECT id INTO hidraulica_id FROM specialties WHERE name = 'Hidráulica';
    
    -- Insert provider specialties
    IF provider_id IS NOT NULL AND eletrica_id IS NOT NULL THEN
        INSERT INTO provider_specialties (provider_id, specialty_id) VALUES (provider_id, eletrica_id)
        ON CONFLICT (provider_id, specialty_id) DO NOTHING;
    END IF;
    
    IF provider_id IS NOT NULL AND hidraulica_id IS NOT NULL THEN
        INSERT INTO provider_specialties (provider_id, specialty_id) VALUES (provider_id, hidraulica_id)
        ON CONFLICT (provider_id, specialty_id) DO NOTHING;
    END IF;
END $$;
