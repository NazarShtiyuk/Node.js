const users = require("../db/users");

class SignInControllers {
    renderSignIn(req, res) {
        res.render('signIn')
    }

    findUserForSignIn(req, res) {
        const findUserForSignIn = users.find(user => user.email === req.body.email && user.password === req.body.password);
        const indexOfFindedUser = users.indexOf(findUserForSignIn) + 1;

        if (findUserForSignIn) {
            res.redirect(`/users/${indexOfFindedUser}`);
        }

    }
}

module.exports = new SignInControllers();