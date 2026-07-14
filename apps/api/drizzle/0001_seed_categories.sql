insert into service_categories (slug, name, description) values
  ('eletrica', 'Eletrica', 'Instalacoes, manutencao e reparos eletricos.'),
  ('hidraulica', 'Hidraulica', 'Vazamentos, encanamentos e instalacoes hidraulicas.'),
  ('montagem-moveis', 'Montagem de Moveis', 'Montagem, desmontagem e ajustes de moveis.'),
  ('pintura', 'Pintura', 'Pintura residencial e pequenos acabamentos.'),
  ('reparos-gerais', 'Reparos Gerais', 'Manutencoes e consertos diversos.'),
  ('instalacoes', 'Instalacoes', 'Instalacao de suportes, cortinas, luminarias e equipamentos.')
on conflict (slug) do nothing;
