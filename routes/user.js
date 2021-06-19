const express = require('express');
const { registerUser, allUser, loginUser } = require('../controllers/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.get('/allusers', auth, allUser);
router.post('/login', loginUser)


module.exports = router;