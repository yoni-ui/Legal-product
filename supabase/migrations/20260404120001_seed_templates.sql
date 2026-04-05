INSERT INTO templates (slug, title, category, is_free, body_md, variable_schema)
VALUES
  (
    'mutual-nda-free',
    'Mutual NDA (starter)',
    'NDA',
    true,
    '# Mutual Non-Disclosure Agreement' || E'\n\n' ||
    'Effective date: {{effective_date}}' || E'\n\n' ||
    'Party A: {{party_a_name}}' || E'\n' ||
    'Party B: {{party_b_name}}' || E'\n\n' ||
    'Each party agrees to keep confidential information secret.' || E'\n\n' ||
    'Placeholder — not legal advice.',
    '{}'::jsonb
  ),
  (
    'services-agreement-pro',
    'Professional services agreement',
    'Services',
    false,
    '# Services Agreement' || E'\n\n' ||
    'Client: {{client_name}}' || E'\n' ||
    'Provider: {{provider_name}}' || E'\n\n' ||
    'Placeholder — not legal advice.',
    '{}'::jsonb
  );
