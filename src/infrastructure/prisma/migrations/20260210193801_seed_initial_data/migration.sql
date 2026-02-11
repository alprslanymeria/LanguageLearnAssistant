/* =========================
   Seed Languages
   ========================= */

IF NOT EXISTS (SELECT 1 FROM [Language] WHERE [name] = 'english')
INSERT INTO [Language] ([name], [imageUrl])
VALUES ('english', '/images/flags/uk.png');

IF NOT EXISTS (SELECT 1 FROM [Language] WHERE [name] = 'turkish')
INSERT INTO [Language] ([name], [imageUrl])
VALUES ('turkish', '/images/flags/tr.png');

IF NOT EXISTS (SELECT 1 FROM [Language] WHERE [name] = 'german')
INSERT INTO [Language] ([name], [imageUrl])
VALUES ('german', '/images/flags/de.png');

IF NOT EXISTS (SELECT 1 FROM [Language] WHERE [name] = 'russian')
INSERT INTO [Language] ([name], [imageUrl])
VALUES ('russian', '/images/flags/rs.png');


/* =========================
   Seed Practices
   ========================= */

-- ENGLISH
INSERT INTO [Practice] ([languageId], [name])
SELECT l.id, p.name
FROM (VALUES
  ('flashcard'),
  ('reading'),
  ('writing'),
  ('listening')
) AS p(name)
CROSS JOIN [Language] l
WHERE l.name = 'english'
AND NOT EXISTS (
  SELECT 1 FROM [Practice] pr
  WHERE pr.languageId = l.id AND pr.name = p.name
);

-- TURKISH
INSERT INTO [Practice] ([languageId], [name])
SELECT l.id, p.name
FROM (VALUES
  ('flashcard'),
  ('reading'),
  ('writing'),
  ('listening')
) AS p(name)
CROSS JOIN [Language] l
WHERE l.name = 'turkish'
AND NOT EXISTS (
  SELECT 1 FROM [Practice] pr
  WHERE pr.languageId = l.id AND pr.name = p.name
);

-- GERMAN
INSERT INTO [Practice] ([languageId], [name])
SELECT l.id, p.name
FROM (VALUES
  ('flashcard'),
  ('reading'),
  ('writing'),
  ('listening')
) AS p(name)
CROSS JOIN [Language] l
WHERE l.name = 'german'
AND NOT EXISTS (
  SELECT 1 FROM [Practice] pr
  WHERE pr.languageId = l.id AND pr.name = p.name
);

-- RUSSIAN
INSERT INTO [Practice] ([languageId], [name])
SELECT l.id, p.name
FROM (VALUES
  ('flashcard'),
  ('reading'),
  ('writing'),
  ('listening')
) AS p(name)
CROSS JOIN [Language] l
WHERE l.name = 'russian'
AND NOT EXISTS (
  SELECT 1 FROM [Practice] pr
  WHERE pr.languageId = l.id AND pr.name = p.name
);
