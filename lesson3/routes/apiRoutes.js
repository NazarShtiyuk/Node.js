const { Router } = require('express');
const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const signInRouter = require('./signInRouter');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', loginRouter);
routes.use('/signIn', signInRouter);
routes.use((req, res) => {
    res.send('Not Found')
})


module.exports = routes;