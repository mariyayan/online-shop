const { registerUserInDB, authenticateUserInSystem, deleteRefreshToken } = require('../services/reg-auth-logout.service.js');


const setCookies = function(res, tokensData) {

    const [jwt, jwtExpiration, refreshToken] = tokensData;
    res.cookie('jwt', jwt, { maxAge: 3600000 }
        //,secure: true, httpOnly:true, sameSite:true}
    );
    res.cookie('jwtExpiration', jwtExpiration, { maxAge: 3600000 }
        //,secure: true, httpOnly:true, sameSite:true}
    );
    res.cookie('refreshToken', refreshToken, { maxAge: 3600000 }
        //,secure: true, httpOnly:true, sameSite:true}
    );
};

const unsetCookies = function(res) {
    res.clearCookie('refreshToken');
    res.clearCookie('jwt');
    res.clearCookie('jwtExpiration');
};


const registerUser = async function(req, res) {
    let [result, data] = await registerUserInDB(req.body.login, req.body.password);
    if (!result) {
        return res.json(data);
    }
    setCookies(res, data);
    res.json({ authenticated: true });
};


const authenticateUser = async function(req, res) {
    let [result, data] = await authenticateUserInSystem(req.body.login, req.body.password);
    if (!result) {
        return res.json(data);
    }
    setCookies(res, data);
    res.json({ authenticated: true })
};


const logoutUser = async function(req, res) {
    await deleteRefreshToken(req.cookies['refreshToken']);
    unsetCookies(res);
    res.redirect('/');
};



module.exports = {
    unsetCookies,
    setCookies,
    registerUser,
    authenticateUser,
    logoutUser,
};