const { Router } = require('express');
const signInControllers = require('../controllers/signInControllers')
const signInMiddleware = require('../middleware/isExistEmail')

const signInRouter = Router();

signInRouter.get('/', signInControllers.renderSignIn);
signInRouter.post('/', signInMiddleware, signInControllers.findUserForSignIn);


module.exports = signInRouter;