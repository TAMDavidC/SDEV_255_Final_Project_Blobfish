const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    
    const token = req.cookies.jwt

    // cehck josn web tokken is her
    if (token){
        jwt.verify(token, 'blobfish secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

const requireAuthTeacher = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'blobfish secret', async  (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);

                if (user.accountType === "teacher"){
                    next();
                }
                else {
                    console.log(user.accountType);
                    res.redirect('/');
                }
            }
        })
    }
    else {
        res.redirect('/');
    }
}

// check user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'blobfish secret', async  (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser, requireAuthTeacher};