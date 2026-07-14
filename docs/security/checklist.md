# Security Checklist

- Supabase Auth is the only public authentication surface.
- NestJS validates Supabase JWTs by JWKS, issuer and audience.
- Business tables are accessed by the API, not directly by the frontend.
- Storage buckets enforce MIME, size and owner-scoped paths.
- Stripe webhooks use raw body validation and idempotent event storage.
- Rate limits cover auth-adjacent routes, search, scheduling, reviews and webhooks.
- Admin mutations write `admin_audit_logs`.
- User blocking is mirrored in Supabase Auth and local profiles.
- Logs must not include secrets, JWTs, payment details or WhatsApp conversations.
- Privacy policy must explain ratings, contact data, location and account deletion.
