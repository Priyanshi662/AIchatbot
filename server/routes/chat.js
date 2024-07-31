const express = require('express');
const { getChatResponse } = require('../controllers/chat.js');
const router = express.Router();

router.post('/', getChatResponse);

module.exports = router;
