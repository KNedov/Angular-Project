const jwt = require('./jwt');
const { userModel, tokenBlacklistModel } = require('../models');
const { authCookieName } = require('../app-config');

function checkAuthMid() {
    return async (req, res, next) => {
        try {
            const token = req.cookies[authCookieName];

            if (!token) {
                return res.status(200).json({ loggedIn: false });
            }

       
            const blacklisted = await tokenBlacklistModel.findOne({ token });
            if (blacklisted) {
                return res.status(200).json({ loggedIn: false });
            }

            const decoded = await jwt.verifyToken(token);

       
            const user = await userModel.findById(decoded.id).select('-password -__v');

            if (!user) {
                return res.status(200).json({ loggedIn: false });
            }

            req.user = user;
            next();
        } catch (err) {
            console.error('Auth error:', err);
            return res.status(200).json({ loggedIn: false });
        }
    };
}

module.exports = checkAuthMid;
