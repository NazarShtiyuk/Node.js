const { Router } = require('express');
const userController = require('../controllers/usersControllers')

const usersRouter = Router();

usersRouter.get('/', userController.renderUsers)
usersRouter.get('/:userId', userController.getUserById)
usersRouter.post('/:email', userController.deleteUser)


module.exports = usersRouter;

