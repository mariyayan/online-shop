const mongoose = require('mongoose');
const { User } = require('../models/User');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');


const setJWTAndRefreshTokens = async function(user) {
    let [jwt, jwtExpiration] = user.generateJWTToken();
    let refreshToken = user.generateRefreshToken();
    await user.save();
    return [jwt, jwtExpiration, refreshToken];
}

const generateNewRefreshToken = async function(refreshToken) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    let tokensData = await setJWTAndRefreshTokens(user);
    await mongoose.disconnect();
    return tokensData;
};


const deleteRefreshToken = async function(refreshToken) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    if (!user) return;
    user.refreshToken = null;
    await user.save();
};


const isRefreshTokenValid = async function(refreshToken) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    if (!user) return false;
    await mongoose.disconnect();
    let nowTime = new Date();
    if (user.expirationRefreshToken <= nowTime) {
        return false;
    }
    return true;
};

async function checkIsUserExists(refreshToken) {
    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.getUserByRefreshToken(refreshToken);
    if (!user) {
        await mongoose.disconnect();
        return false;
    }
    return true;
}

const registerUserInDB = async function(login, password) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let isUserExists = await User.checkIsLoginExists(login);
    if (isUserExists) {
        await mongoose.disconnect();
        return [false, { 'formError': 'Пользователь с таким логином уже существует', 'errorType': 'login' }];
    }

    let user = await User.create({ login: login });
    user.setPassword(password);
    let wishlist = await Wishlist.create({ user: user._id });
    let cart = await Cart.create({ user: user._id });
    let tokensData = await setJWTAndRefreshTokens(user);
    await mongoose.disconnect();
    return [true, tokensData];
};


const authenticateUserInSystem = async function(login, password) {

    await mongoose.connect("mongodb://0.0.0.0:27017/");
    let user = await User.checkIsLoginExists(login);
    if (!user) {
        await mongoose.disconnect();
        return [false, { 'formError': 'Пользователя с таким логином не существует', 'errorType': 'login' }];
    }

    let passwordValidationResult = user.validatePassword(password);
    if (!passwordValidationResult) {
        await mongoose.disconnect();
        return [false, { formError: 'Неверный пароль', 'errorType': 'password' }];
    }
    let tokensData = await setJWTAndRefreshTokens(user);
    await mongoose.disconnect();
    return [true, tokensData];
};


module.exports = {
    generateNewRefreshToken,
    checkIsUserExists,
    registerUserInDB,
    authenticateUserInSystem,
    deleteRefreshToken,
    isRefreshTokenValid,
};