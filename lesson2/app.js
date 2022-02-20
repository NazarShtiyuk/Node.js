const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const {engine} = require("express-handlebars");
const {use} = require("express/lib/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


const users = [
    {
        firstName: 'Vasya',
        lastName: 'Pupkin',
        email: 'vasyapupkin@gmail.com',
        password: '12345',
        age: '18',
        city: 'Kyiv'
    },
    {
        firstName: 'Nastya',
        lastName: 'Boyaryn',
        email: 'nastyaboyaryn@gmail.com',
        password: '45612',
        age: '25',
        city: 'Lviv'
    },
    {
        firstName: 'Petya',
        lastName: 'Shevchenko',
        email: 'petyashevchenko@gmail.com',
        password: '78945',
        age: '22',
        city: 'Lviv'
    },
    {
        firstName: 'Masha',
        lastName: 'Shevchenko',
        email: 'mashashevchenko@gmail.com',
        password: '78945',
        age: '22',
        city: 'Ternopil'
    }
]

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/users', ({query}, res) => {
    const {age, city} = query;
    // console.log(req.query);
    if (Object.keys(query) !== 0) {
        let filteredUsers = [...users];
        if (city) {
            filteredUsers = filteredUsers.filter(user => user.city === city);
        }
        if (age) {
            filteredUsers = filteredUsers.filter(user => user.age === age);
        }
        return res.render('users', {users: filteredUsers});
    }


    res.render('users', {users});
})

app.get('/users/:userId', (req, res) => {
    // console.log(req.params)
    for (let i = 0; i < users.length; i++) {
        if ((i + 1) === +req.params.userId) {
            res.render('user', {user: users[i + 1]});
        }
    }
})

app.get('/signIn', (req, res) => {
    res.render('signIn')
})

app.post('/login', (req, res) => {
    // console.log(req.body);
    const findUserWithSameEmail = users.find(user => user.email === req.body.email);
    if (findUserWithSameEmail) {
        res.send('This email already exists!')
    } else {
        users.push(req.body);
        res.redirect('/users');
    }
})

app.post('/signIn', (req, res) => {
    const findUserForSignIn = users.find(user => user.email === req.body.email && user.password === req.body.password);
    const indexOfFindedUser = users.indexOf(findUserForSignIn);
    if (findUserForSignIn) {
        res.redirect(`/users/${indexOfFindedUser}`);

    } else {
        res.send('No such user exists!')
    }

})

app.post('/users/:email', (req, res) => {
    const {email} = req.params;
    const deleteUser = users.find(user => user.email === email);
    const indexOfDeleteUser = users.indexOf(deleteUser);
    if (indexOfDeleteUser) {
        users.splice(indexOfDeleteUser, 1);
        res.redirect('/users')
    }
})

app.use((req, res) => {
    res.send('Not Found')
})

app.listen(5200, () => {
    console.log('Server has started on PORT 5200');
})

