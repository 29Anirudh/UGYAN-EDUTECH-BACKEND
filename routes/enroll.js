const express = require('express');
const router = express.Router();
const { enroll } = require('../controllers/enrollController');
const auth = require('../middleware/authMiddleware');
router.post('/', auth, enroll);
module.exports = router;