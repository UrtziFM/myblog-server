const jwt = require('jsonwebtoken');
const crudUsers = require('../config/user');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
let user;

const authUser = async (req, res, next) => {
    try {
        console.log(req.body.data)
        user = await crudUsers.findOneUserByEmail(req.body.data.email);
        const result = await bcrypt.compare(req.body.data.password, user.password);
        result ? next() : res.sendStatus(401);
    } catch (err) {
        console.log(err);
    }
};

const getToken = (req, res) => {
    try {
        jwt.sign({
            email: req.body.email,
            password: req.body.password
        }, SECRET, {expiresIn: '100000s'}, function (err, token) {
            if (err) throw err;
            res.json({
                user: user ? user : null,
                token: token
            });
            // next();
        });
    } catch (err) {
        console.log(err);
    }
};

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split("\"")[1];

        if (token) {
            console.log(req.headers);
            jwt.verify(token, SECRET, (err, authData) => {
                if (err) {
                    console.log('err:' + err.name + '\nmessage:' + err.message);
                    res.sendStatus(401);
                } else {
                    res.sendStatus(200);
                    // res.send(authData);
                    // next();
                }
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    authUser,
    getToken,
    verifyToken
};

