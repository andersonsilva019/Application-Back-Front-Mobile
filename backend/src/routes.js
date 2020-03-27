const express = require('express');

const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.post('/sessions',SessionController.create)                       //Rota para criar um secção

routes.get('/ongs', OngController.index);                               //Rota para listar(get) as ongs
routes.post('/ongs',OngController.create);                              //Rota para criar(post) as ongs

routes.get('/profile',ProfileController.index)                          //Rota para listar(get) os casos da ong logada

routes.post('/incidents',IncidentsController.create)                    //Rota para criar(post) os casos da ong logada 
routes.get('/incidents',IncidentsController.index)                      //Rota para listar(get) os casos com os dados da ong
routes.delete('/incidents/:id', IncidentsController.delete)             //Rota para deletar os casos de uma ong
    
module.exports = routes;                                                //Exportando as rotas

