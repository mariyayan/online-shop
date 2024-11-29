const express = require('express');
const router = express.Router();
const { checkReqBody, checkCookies, textParser } = require('../middlewares/middlewares');
const {
    registerUser,
    authenticateUser,
    logoutUser,
} = require('../controllers/reg-auth-logout-controller');

router.post('/registration', textParser.none(), checkReqBody, registerUser);
router.post('/authentication', textParser.none(), checkReqBody, authenticateUser);
router.get('/logout', checkCookies, logoutUser);

module.exports = router;