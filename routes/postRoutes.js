const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController');

router.post('/create', createPost);
router.get('/feed', getAllPosts);

module.exports = router;
