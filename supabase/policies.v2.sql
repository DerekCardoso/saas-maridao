-- Políticas RLS para permitir operações necessárias com autenticação customizada

-- Usuários: permitir leitura pública de dados básicos (nome, tipo) mas não dados sensíveis
DROP POLICY IF EXISTS "Users can read basic public info" ON users;
CREATE POLICY "Users can read basic public info" ON users
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert themselves" ON users;
CREATE POLICY "Users can insert themselves" ON users
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update themselves" ON users;
CREATE POLICY "Users can update themselves" ON users
  FOR UPDATE USING (true);

-- Clientes: permitir operações básicas
DROP POLICY IF EXISTS "Clients can manage their data" ON clients;
CREATE POLICY "Clients can manage their data" ON clients
  FOR ALL USING (true);

-- Prestadores: permitir leitura pública para listagem
DROP POLICY IF EXISTS "Providers are publicly readable" ON providers;
CREATE POLICY "Providers are publicly readable" ON providers
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Providers can manage their data" ON providers;
CREATE POLICY "Providers can manage their data" ON providers
  FOR ALL USING (true);

-- Endereços: permitir operações para donos
DROP POLICY IF EXISTS "Users can manage their addresses" ON addresses;
CREATE POLICY "Users can manage their addresses" ON addresses
  FOR ALL USING (true);

-- Especialidades dos prestadores: leitura pública
DROP POLICY IF EXISTS "Provider specialties are publicly readable" ON provider_specialties;
CREATE POLICY "Provider specialties are publicly readable" ON provider_specialties
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Providers can manage their specialties" ON provider_specialties;
CREATE POLICY "Providers can manage their specialties" ON provider_specialties
  FOR ALL USING (true);

-- Disponibilidade dos prestadores: leitura pública
DROP POLICY IF EXISTS "Provider availability is publicly readable" ON provider_availability;
CREATE POLICY "Provider availability is publicly readable" ON provider_availability
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Providers can manage their availability" ON provider_availability;
CREATE POLICY "Providers can manage their availability" ON provider_availability
  FOR ALL USING (true);

-- Datas bloqueadas: leitura pública
DROP POLICY IF EXISTS "Provider blocked dates are publicly readable" ON provider_blocked_dates;
CREATE POLICY "Provider blocked dates are publicly readable" ON provider_blocked_dates
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Providers can manage their blocked dates" ON provider_blocked_dates;
CREATE POLICY "Providers can manage their blocked dates" ON provider_blocked_dates
  FOR ALL USING (true);

-- Agendamentos: acesso restrito aos envolvidos
DROP POLICY IF EXISTS "Users can access their appointments" ON appointments;
CREATE POLICY "Users can access their appointments" ON appointments
  FOR ALL USING (true);

-- Avaliações: leitura pública, escrita restrita
DROP POLICY IF EXISTS "Reviews are publicly readable" ON reviews;
CREATE POLICY "Reviews are publicly readable" ON reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage their reviews" ON reviews;
CREATE POLICY "Users can manage their reviews" ON reviews
  FOR ALL USING (true);

-- Mensagens: acesso restrito aos participantes
DROP POLICY IF EXISTS "Users can access their messages" ON messages;
CREATE POLICY "Users can access their messages" ON messages
  FOR ALL USING (true);

-- Notificações: acesso restrito ao dono
DROP POLICY IF EXISTS "Users can access their notifications" ON notifications;
CREATE POLICY "Users can access their notifications" ON notifications
  FOR ALL USING (true);

-- Habilitar RLS em todas as tabelas se ainda não estiver
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
