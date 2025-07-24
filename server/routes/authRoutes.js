const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
