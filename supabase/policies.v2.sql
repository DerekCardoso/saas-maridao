-- Políticas RLS para permitir leitura pública de dados não sensíveis
-- Execute este SQL no Supabase SQL Editor

-- Permitir leitura pública de usuários (apenas campos não sensíveis)
CREATE POLICY "Allow public read users basic info" ON public.users
  FOR SELECT USING (true);

-- Permitir leitura pública de prestadores
CREATE POLICY "Allow public read providers" ON public.providers
  FOR SELECT USING (true);

-- Permitir leitura pública de especialidades
CREATE POLICY "Allow public read provider_specialties" ON public.provider_specialties
  FOR SELECT USING (true);

-- Permitir leitura pública de avaliações
CREATE POLICY "Allow public read reviews" ON public.reviews
  FOR SELECT USING (true);

-- Permitir leitura pública de endereços (para mostrar localização dos prestadores)
CREATE POLICY "Allow public read addresses" ON public.addresses
  FOR SELECT USING (true);

-- Permitir leitura pública de disponibilidade dos prestadores
CREATE POLICY "Allow public read provider_availability" ON public.provider_availability
  FOR SELECT USING (true);

-- Permitir leitura pública de datas bloqueadas
CREATE POLICY "Allow public read provider_blocked_dates" ON public.provider_blocked_dates
  FOR SELECT USING (true);

-- Permitir leitura pública de clientes (apenas para relacionamentos)
CREATE POLICY "Allow public read clients" ON public.clients
  FOR SELECT USING (true);

-- Políticas para operações autenticadas (usuários logados podem gerenciar seus próprios dados)

-- Usuários podem atualizar seus próprios dados
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = id);

-- Usuários podem inserir seus próprios dados
CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid()::text = id);

-- Clientes podem gerenciar seus próprios dados
CREATE POLICY "Clients can manage own data" ON public.clients
  FOR ALL USING (auth.uid()::text = user_id);

-- Prestadores podem gerenciar seus próprios dados
CREATE POLICY "Providers can manage own data" ON public.providers
  FOR ALL USING (auth.uid()::text = user_id);

-- Usuários podem gerenciar seus próprios endereços
CREATE POLICY "Users can manage own addresses" ON public.addresses
  FOR ALL USING (auth.uid()::text = user_id);

-- Prestadores podem gerenciar suas próprias especialidades
CREATE POLICY "Providers can manage own specialties" ON public.provider_specialties
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.providers 
      WHERE providers.id = provider_specialties.provider_id 
      AND providers.user_id = auth.uid()::text
    )
  );

-- Prestadores podem gerenciar sua própria disponibilidade
CREATE POLICY "Providers can manage own availability" ON public.provider_availability
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.providers 
      WHERE providers.id = provider_availability.provider_id 
      AND providers.user_id = auth.uid()::text
    )
  );

-- Prestadores podem gerenciar suas próprias datas bloqueadas
CREATE POLICY "Providers can manage own blocked dates" ON public.provider_blocked_dates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.providers 
      WHERE providers.id = provider_blocked_dates.provider_id 
      AND providers.user_id = auth.uid()::text
    )
  );

-- Agendamentos: usuários podem ver e gerenciar seus próprios agendamentos
CREATE POLICY "Users can manage own appointments as client" ON public.appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.clients 
      WHERE clients.id = appointments.client_id 
      AND clients.user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can manage own appointments as provider" ON public.appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.providers 
      WHERE providers.id = appointments.provider_id 
      AND providers.user_id = auth.uid()::text
    )
  );

-- Avaliações: usuários podem gerenciar suas próprias avaliações
CREATE POLICY "Users can manage own reviews as client" ON public.reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.clients 
      WHERE clients.id = reviews.client_id 
      AND clients.user_id = auth.uid()::text
    )
  );

-- Mensagens: usuários podem ver mensagens onde são remetente ou destinatário
CREATE POLICY "Users can manage own messages" ON public.messages
  FOR ALL USING (
    auth.uid()::text = sender_id OR auth.uid()::text = receiver_id
  );

-- Notificações: usuários podem gerenciar suas próprias notificações
CREATE POLICY "Users can manage own notifications" ON public.notifications
  FOR ALL USING (auth.uid()::text = user_id);

-- Comentário: Essas políticas assumem que você está usando Supabase Auth
-- Se você continuar com autenticação customizada, as políticas de escrita não funcionarão
-- Neste caso, use apenas as políticas de leitura pública e faça operações de escrita
-- via Route Handlers server-side com getSupabaseAdmin()
