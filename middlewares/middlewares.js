const jwt = require('jsonwebtoken');
const { secretKey } = require('../models/User');
const { generateNewRefreshToken, isRefreshTokenValid } = require('../services/reg-auth-logout.service');
const { checkIsUserExists, deleteRefreshToken } = require('../services/reg-auth-logout.service.js');
const { unsetCookies, setCookies } = require('../controllers/reg-auth-logout-controller');

const authenticateToken = async function(jwtToken, jwtExpiration) {

    let nowTime = new Date();

    if (jwtExpiration <= nowTime) {
        return false;
    }
    try {
        let result = jwt.verify(jwtToken, secretKey);
        return true;
    } catch (e) {
        return false;
    }
};


const refreshTokenFunc = async function(jwtExpiration, refreshToken, res) {

    let nowTime = new Date();
    let timeDifference = Math.round((jwtExpiration - nowTime) / 60000);

    if (timeDifference <= 15) {

        let isRTValid = await isRefreshTokenValid(refreshToken);

        if (!isRTValid) {
            return false;
        }

        unsetCookies(res);
        let tokensData = await generateNewRefreshToken(refreshToken);
        return [true, tokensData];
    }
    return [true];
};



const authenticateAndRefreshTokens = async function(jwtToken, jwtExpiration, refreshToken, res) {

    let authenticateTokenResult = await authenticateToken(jwtToken, jwtExpiration, refreshToken);
    if (!authenticateTokenResult) {
        return [false];
    }

    let refreshTokenResult = await refreshTokenFunc(jwtExpiration, refreshToken, res);

    if (!refreshTokenResult) {
        return [false];
    }
    return refreshTokenResult;
};



const authenticateTokenMW = async function(req, res, next) {

    let [result, tokensData] = await authenticateAndRefreshTokens(req.cookies['jwt'], req.cookies['jwtExpiration'], req.cookies['refreshToken'], res);

    if (!result) {

        await deleteRefreshToken(refreshToken);
        unsetCookies(res);

        if (req.path === '/cart' || req.path === '/wishlist') {
            return res.redirect('/');
        }
        if (req.path === '/removeFromCart' || req.path === '/removeFromWishlist') {
            return res.json({ authenticated: false });
        }
        return res.json({ message: 'Войдите или зарегестрируйтесь' })
    }
    tokensData ? setCookies(res, tokensData) : null;
    next();
};


const checkCookiesForUnguardedRoutes = async function(req, res, next) {

    if (!req.cookies['jwt'] && !req.cookies['jwtExpiration'] && !req.cookies['refreshToken']) {
        return next();
    }

    if (req.cookies['jwt'] && req.cookies['jwtExpiration'] && req.cookies['refreshToken']) {

        let [result, tokensData] = await authenticateAndRefreshTokens(req.cookies['jwt'], req.cookies['jwtExpiration'], req.cookies['refreshToken'], res);

        if (!result) {
            await deleteRefreshToken(req.cookies['refreshToken']);
            unsetCookies(res);
            return res.redirect('/');
        }
        tokensData ? setCookies(res, tokensData) : null;
        next();
    }
};


const checkCookies = async function(req, res, next) {

    if (req.cookies['jwt'] && req.cookies['jwtExpiration'] && req.cookies['refreshToken']) {
        return next();
    }

    if (req.path === '/cart' || req.path === '/wishlist' || req.path === '/logout') {
        return res.redirect('/');
    }
    if (req.path === '/removeFromCart' || req.path === '/removeFromWishlist') {
        return res.json({ authenticated: false });
    }
    return res.json({ message: 'Войдите или зарегестрируйтесь' })
};

const checkUsersExistense = async function(req, res, next) {

    let user = await checkIsUserExists(req.cookies['refreshToken']);
    if (!user) {
        unsetCookies(res);
        return res.redirect('/');
    }
    return next();

};

const checkReqBody = async function(req, res, next) {

        if(req.body.login && req.body.password){
            return next();
        }
        return res.json({message: 'Произошла ошибка'});
};

const multer = require("multer");
const textParser = multer();

module.exports = {
    checkCookies,
    checkCookiesForUnguardedRoutes,
    checkUsersExistense,
    checkReqBody,
    authenticateTokenMW,
    textParser
};