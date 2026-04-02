const express = require('express');
const forumController = require('./forum.controller');

const router = express.Router();

router.get('/categories', forumController.getCategories);

module.exports = router;