const Post = require('../models/Post');

// GET /api/posts
async function getPosts(req, res, next) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

// GET /api/posts/:id
async function getPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

// POST /api/posts
async function createPost(req, res, next) {
  try {
    const { title, content, author, tags, published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    const post = await Post.create({ title, content, author, tags, published });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

// PUT /api/posts/:id
async function updatePost(req, res, next) {
  try {
    const updates = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/posts/:id
async function deletePost(req, res, next) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};