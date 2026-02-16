
-- Crear tabla
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  img VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0
);

-- Datos de prueba 
INSERT INTO posts (titulo, img, descripcion, likes)
SELECT 'Post de prueba', 'https://picsum.photos/600/400', 'Descripción de prueba', 0
WHERE NOT EXISTS (SELECT 1 FROM posts);
