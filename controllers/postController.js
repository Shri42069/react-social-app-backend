const posts = require('../models/postModel');

exports.createPost = (req, res) => {
  const { email, name, content, image } = req.body;

  const newPost = {
    id: Date.now(),
    email,
    name,
    content,
    image,
    createdAt: new Date().toISOString(),
  };

  posts.unshift(newPost); // add to start of feed
  res.json({ success: true, post: newPost });
};

exports.getAllPosts = (req, res) => {
  res.json({ success: true, posts });
};
