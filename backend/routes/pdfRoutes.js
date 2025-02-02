const express = require('express');
const { createPDF } = require('../controllers/pdfController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/generate-pdf', auth, createPDF); // POST request to generate PDF

module.exports = router;
