const express = require('express');                                     //Importando o express

const routes = express.Router();
const OngController = require('./controllers/OngController');           //Importando os métodos da Ong
const IncidentsController = require('./controllers/IncidentsController')//Importando os métodos dos Incidents -> cria, lista e deleta os casos
const ProfileController = require('./controllers/ProfileController')    //Importando os métodos do profile -> Lista os casos da ong logada
const SessionController = require('./controllers/SessionController')    //Importando os métodos da session -> cria uma secção
const { celebrate, Segments, Joi } = require('celebrate');

routes.post('/sessions', celebrate({                                     //Rota para criar um secção
    [Segments.BODY]:Joi.object().keys({
        id: Joi.string().required()
    })
}),SessionController.create)                      

routes.get('/ongs', OngController.index);                               //Rota para listar(get) as ongs

routes.post('/ongs', celebrate({                                        //Rota para criar(post) as ongs
    [Segments.BODY]:Joi.object().keys({                                 //Validar o corpo da minha requisição
        name: Joi.string().required(),                                  //Vai ser uma string obrigatoria --> min() serve para informa a quantidade de caracteres minima
        email: Joi.string().required().email(),                         //Vai ser um string obrigatoria no formato email
        whatsapp: Joi.number().required().min(10).max(11),              //Vai ser um numero obrigatorio com no min 10 caracter e no max 11
        uf: Joi.string().required().length(2)                           //Vai ser uma string obrigatória com tamanho de 2 caracter
    })
}),OngController.create);                                               

routes.get('/profile',celebrate({                                       //Rota para listar(get) os casos da ong logada
    [Segments.HEADERS]: Joi.object({                                    //Validar o cabeçalho da requisição
        authorization: Joi.string().required(),                         //Vai ser um string obrigatória
    }).unknown()
}),ProfileController.index)                          

routes.post('/incidents', celebrate({                                   //Rota para criar(post) os casos da ong logada 

    /* Validação do cabeçalho da requisição */
    [Segments.HEADERS]: Joi.object({                                    
        authorization: Joi.string().required(),                        //Vai ser uma string obrigatória    
    }).unknown(),
    
    /* Validações do corpo da requisição */
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),                                //Vai ser uma string obrigatória(title)
        description: Joi.string().required(),                          //Vai ser uma string obrigatória(description)
        value: Joi.number().required()                                 //Vai ser uma número obrigatório
    })
    
}),IncidentsController.create)                    

routes.get('/incidents',celebrate({                                     //Rota para listar(get) os casos com os dados da ong
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}),IncidentsController.index)                     


routes.delete('/incidents/:id', celebrate({                             //Rota para deletar os casos de uma ong
    [Segments.PARAMS]:Joi.object().keys({                               //Valida o params
        id: Joi.number().required()                                     //Vai ser um número obrigatório
    })
}) ,IncidentsController.delete)             
    
module.exports = routes;                                                //Exportando as rotas

