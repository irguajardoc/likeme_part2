const pool = require('../config/db');

async function getAllPosts() {
  // Captura de errores con try/catch en consulta SQL
  try {
    const { rows } = await pool.query(
      'SELECT id, titulo, img, descripcion, likes FROM posts ORDER BY id DESC'
    );
    return rows;
  } catch (err) {
    
    err.status = 500;
    err.message = 'Error al obtener los posts';
    throw err;
  }
}

async function createPost({ titulo, img, descripcion }) {
  try {
    const query = {
      text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING id, titulo, img, descripcion, likes',
      values: [titulo, img, descripcion],
    };

    const { rows } = await pool.query(query);
    return rows[0];
  } catch (err) {
    err.status = 500;
    err.message = 'Error al crear el post';
    throw err;
  }
}

async function deletePostById(id) {
  try {
    const { rowCount } = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    return rowCount; 
  } catch (err) {
    err.status = 500;
    err.message = 'Error al eliminar el post';
    throw err;
  }
}

async function likePostById(id) {
  // Ruta PUT para modificar registros (likes)
  try {
    const { rows, rowCount } = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING id, titulo, img, descripcion, likes',
      [id]
    );

    if (rowCount === 0) return null;
    return rows[0];
  } catch (err) {
    err.status = 500;
    err.message = 'Error al registrar el like';
    throw err;
  }
}

module.exports = {
  getAllPosts,
  createPost,
  deletePostById,
  likePostById,
};
