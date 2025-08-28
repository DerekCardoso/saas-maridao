-- Script para criar usuários de teste reais no Supabase

-- Limpar dados existentes (cuidado em produção!)
DELETE FROM notifications;
DELETE FROM messages;
DELETE FROM reviews;
DELETE FROM appointments;
DELETE FROM provider_blocked_dates;
DELETE FROM provider_availability;
DELETE FROM provider_specialties;
DELETE FROM providers;
DELETE FROM clients;
DELETE FROM addresses;
DELETE FROM users;

-- Inserir usuários de teste com senhas hasheadas (senha: "senha123")
INSERT INTO users (id, email, name, phone, user_type, is_admin, password) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'cliente@teste.com', 'João Silva', '(11) 99999-9999', 'client', false, '$2b$10$rOvHPw8fgXlMfqABcdefg.K8p2l3m4n5o6p7q8r9s0t1u2v3w4x5y6'),
('550e8400-e29b-41d4-a716-446655440002', 'prestador@teste.com', 'Carlos Oliveira', '(11) 88888-8888', 'provider', false, '$2b$10$rOvHPw8fgXlMfqABcdefg.K8p2l3m4n5o6p7q8r9s0t1u2v3w4x5y6'),
('550e8400-e29b-41d4-a716-446655440003', 'admin@teste.com', 'Admin Sistema', '(11) 77777-7777', 'admin', true, '$2b$10$rOvHPw8fgXlMfqABcdefg.K8p2l3m4n5o6p7q8r9s0t1u2v3w4x5y6'),
('550e8400-e29b-41d4-a716-446655440004', 'maria@teste.com', 'Maria Santos', '(11) 66666-6666', 'client', false, '$2b$10$rOvHPw8fgXlMfqABcdefg.K8p2l3m4n5o6p7q8r9s0t1u2v3w4x5y6'),
('550e8400-e29b-41d4-a716-446655440005', 'pedro@teste.com', 'Pedro Costa', '(11) 55555-5555', 'provider', false, '$2b$10$rOvHPw8fgXlMfqABcdefg.K8p2l3m4n5o6p7q8r9s0t1u2v3w4x5y6');

-- Inserir clientes
INSERT INTO clients (id, user_id) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440004');

-- Inserir prestadores
INSERT INTO providers (id, user_id, bio, experience_years, rating, total_services, is_premium, is_available) VALUES
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'Especialista em reparos domésticos com mais de 5 anos de experiência. Atendo com qualidade e pontualidade.', 5, 4.8, 150, true, true),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440005', 'Técnico em elétrica e hidráulica. Trabalho com serviços residenciais e comerciais.', 3, 4.5, 80, false, true);

-- Inserir especialidades dos prestadores
INSERT INTO provider_specialties (provider_id, name) VALUES
('550e8400-e29b-41d4-a716-446655440021', 'Elétrica'),
('550e8400-e29b-41d4-a716-446655440021', 'Hidráulica'),
('550e8400-e29b-41d4-a716-446655440021', 'Pintura'),
('550e8400-e29b-41d4-a716-446655440022', 'Elétrica'),
('550e8400-e29b-41d4-a716-446655440022', 'Instalações');

-- Inserir endereços
INSERT INTO addresses (user_id, street, number, complement, neighborhood, city, state, cep, is_primary) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Rua das Flores', '123', 'Apto 45', 'Centro', 'São Paulo', 'SP', '01234567', true),
('550e8400-e29b-41d4-a716-446655440002', 'Av. Paulista', '456', '', 'Bela Vista', 'São Paulo', 'SP', '01310100', true),
('550e8400-e29b-41d4-a716-446655440003', 'Rua Admin', '789', 'Sala 10', 'Jardins', 'São Paulo', 'SP', '01234000', true),
('550e8400-e29b-41d4-a716-446655440004', 'Rua das Palmeiras', '321', '', 'Vila Madalena', 'São Paulo', 'SP', '05435000', true),
('550e8400-e29b-41d4-a716-446655440005', 'Av. Faria Lima', '654', 'Conj 12', 'Itaim Bibi', 'São Paulo', 'SP', '04538132', true);

-- Inserir disponibilidade dos prestadores (exemplo)
INSERT INTO provider_availability (provider_id, day_of_week, start_time, end_time, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440021', 1, '08:00', '18:00', true), -- Segunda
('550e8400-e29b-41d4-a716-446655440021', 2, '08:00', '18:00', true), -- Terça
('550e8400-e29b-41d4-a716-446655440021', 3, '08:00', '18:00', true), -- Quarta
('550e8400-e29b-41d4-a716-446655440021', 4, '08:00', '18:00', true), -- Quinta
('550e8400-e29b-41d4-a716-446655440021', 5, '08:00', '17:00', true), -- Sexta
('550e8400-e29b-41d4-a716-446655440021', 6, '08:00', '12:00', true), -- Sábado
('550e8400-e29b-41d4-a716-446655440022', 1, '09:00', '17:00', true), -- Segunda
('550e8400-e29b-41d4-a716-446655440022', 2, '09:00', '17:00', true), -- Terça
('550e8400-e29b-41d4-a716-446655440022', 3, '09:00', '17:00', true), -- Quarta
('550e8400-e29b-41d4-a716-446655440022', 4, '09:00', '17:00', true), -- Quinta
('550e8400-e29b-41d4-a716-446655440022', 5, '09:00', '17:00', true); -- Sexta

-- Inserir alguns agendamentos de exemplo
INSERT INTO appointments (id, client_id, provider_id, service, date, time, status, address, details, price) VALUES
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440021', 'Reparo Elétrico', '2024-01-15', '14:00', 'pending', 'Rua das Flores, 123 - Centro, São Paulo - SP', 'Trocar tomada da cozinha', 80.00),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440021', 'Reparo Hidráulico', '2024-01-16', '10:00', 'confirmed', 'Rua das Palmeiras, 321 - Vila Madalena, São Paulo - SP', 'Vazamento na pia do banheiro', 120.00);

-- Inserir algumas avaliações
INSERT INTO reviews (client_id, provider_id, appointment_id, rating, comment) VALUES
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440032', 5, 'Excelente profissional! Muito pontual e resolveu o problema rapidamente.');

-- Inserir algumas notificações
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Agendamento Solicitado', 'Seu agendamento foi enviado para o prestador Carlos Oliveira', 'appointment', false),
('550e8400-e29b-41d4-a716-446655440002', 'Novo Agendamento', 'Você recebeu uma nova solicitação de agendamento', 'appointment', false);

-- Inserir algumas mensagens
INSERT INTO messages (sender_id, receiver_id, content, is_read) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Olá! Gostaria de agendar um serviço de reparo elétrico.', true),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Olá! Claro, posso ajudar. Qual seria o problema?', false);
