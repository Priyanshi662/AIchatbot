const express = require('express');
const { register, login, tokenval } = require('../controllers/auth.js');
const {protect}=require('../middleware/auth.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.get(
//     "/checktoken",
//     protect,
//     tokenval
//   );
module.exports = router;
 