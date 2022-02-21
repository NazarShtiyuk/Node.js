const users = require("../db/users");

class LoginControllers {
    renderLogin(req, res) {
        res.render('login');
    }

    findUserWithSameEmail(req, res) {
        const findUserWithSameEmail = users.find(user => user.email === req.body.email);

        if (findUserWithSameEmail) {
            return res.send('This email already exists!')
        }

        users.push(req.body);
        return res.redirect('/users');
    }
}


module.exports = new LoginControllers();