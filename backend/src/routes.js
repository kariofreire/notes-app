const express = require('express');
const routes = express.Router();

const taskController = require('./controllers/TaskController');

routes.get('/tasks', taskController.index);
routes.post('/tasks', taskController.create);
routes.patch('/tasks/:id', taskController.update);
routes.delete('/tasks/:id', taskController.remove);

module.exports = routes;