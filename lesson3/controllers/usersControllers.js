const users = require("../db/users");

class UsersControllers {
    renderUsers({query}, res) {
        const {age, city} = query;
        // console.log(req.query);
        if (Object.keys(query) !== 0) {
            let filteredUsers = users;

            if (city) {
                filteredUsers = filteredUsers.filter(user => user.city === city);
            }

            if (age) {
                filteredUsers = filteredUsers.filter(user => user.age === age);
            }

            return res.render('users', {users: filteredUsers});
        }

        res.render('users', {users});
    }

    getUserById(req, res) {
        for (let i = 1; i <= users.length; i++) {

            if ((i) === +req.params.userId) {
                res.render('user', {user: users[i - 1]});
            }

        }
    }

    deleteUser(req, res) {
        const {email} = req.params;
        const deleteUser = users.find(user => user.email === email);
        const indexOfDeleteUser = users.indexOf(deleteUser);

        if (indexOfDeleteUser || indexOfDeleteUser === 0) {
            users.splice(indexOfDeleteUser, 1);
            res.redirect('/users')
        }
    }

}

module.exports = new UsersControllers();