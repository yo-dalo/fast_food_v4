const express = require('express');
const router = express.Router();
const mailController = require('../Utility/Send_email');

// POST route to send an email
router.post('/send-email', mailController.sendEmail);

module.exports = router;
