# Supabase e Postgres

## Conexões

- `DATABASE_MIGRATION_URL`: conexão direta usada apenas por migrations.
- `DATABASE_URL`: pooler usado pela API no Railway.
- `SUPABASE_SERVICE_ROLE_KEY`: somente na API.
- O frontend recebe apenas URL e chave anon.

## Segurança

As tabelas de negócio têm RLS habilitado e não concedem acesso para `anon` ou
`authenticated`. Toda regra de negócio passa pelo NestJS. O bucket
`provider-avatars` permite leitura pública e escrita apenas na pasta do próprio
usuário.

## Super Admin

Crie o usuário no Supabase Auth e depois execute:

```sql
insert into profiles (id, role, name, email)
values ('AUTH_USER_UUID', 'super_admin', 'Administrador', 'admin@example.com');
```
