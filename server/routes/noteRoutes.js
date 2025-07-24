const express = require('express');
const { createNote, getNotes, deleteNote } = require('../controllers/noteController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, createNote);
router.get('/', verifyToken, getNotes);
router.delete('/:id', verifyToken, deleteNote);

module.exports = router;
