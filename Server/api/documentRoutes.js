const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.get('/documents', documentController.getDocumentsSolr);
router.get('/documents/:id', documentController.getDocument)

module.exports = router;
