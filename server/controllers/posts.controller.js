

const Posts = require('../models/posts.model');

async function getPosts(req, res, next) {
  try {
    const posts = await Posts.getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const { titulo, img, descripcion } = req.body;

    // Validación mínima
    if (!titulo || !img || !descripcion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: titulo, img, descripcion' });
    }

    const newPost = await Posts.createPost({ titulo, img, descripcion });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  //  Ruta DELETE para eliminar registros
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser numérico' });
    }

    const deletedCount = await Posts.deletePostById(id);

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    //  No Content es estándar para DELETE exitoso
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function likePost(req, res, next) {
  // Ruta PUT para incrementar likes
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'El id debe ser numérico' });
    }

    const updatedPost = await Posts.likePostById(id);

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    return res.json(updatedPost);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPosts,
  createPost,
  deletePost,
  likePost,
};
