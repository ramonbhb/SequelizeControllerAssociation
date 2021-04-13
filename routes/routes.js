const { Router } = require('express');
const TimeController = require('../controllers/TimeController');
const routes = Router();

routes.get('/', (req,res) => {
    res.status(200).json({mensagem: "Hello World"})
});

routes.get('/times', TimeController.getAll);
routes.get('/time/:id', TimeController.getOne);
routes.post('/time', TimeController.create);
routes.put('/time/:id', TimeController.update);
routes.delete('/time/:id', TimeController.delete);
routes.get('/timesNome', TimeController.getAllByNome);


/* get, put, delete, update FIND */

module.exports = routes;