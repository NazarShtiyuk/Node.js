const users = require("../db/users");

function isExistEmail (req, res, next) {
    try {
        const findUserForSignIn = users.find(user => user.email === req.body.email && user.password === req.body.password);

        if (!findUserForSignIn) {
            throw new Error('No such email exists!')
        }

        next();

    } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}

module.exports = isExistEmail;