const { Router } = require('express');
const loginControllers = require('../controllers/loginControllers')
const loginMiddleware = require('../middleware/isUserValid')

const loginRouter = Router();

loginRouter.get('/', loginControllers.renderLogin);

loginRouter.post('/', loginMiddleware, loginControllers.findUserWithSameEmail);


module.exports = loginRouter;