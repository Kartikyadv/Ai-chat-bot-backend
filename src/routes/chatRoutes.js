const express = require('express');
const { handleMessage, getChat } = require('../controllers/chatController');

const router = express.Router();

router.post('/message', handleMessage);
router.get('/history', getChat);

module.exports = router;