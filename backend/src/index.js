const express = require('express')                  //importando o modulo express para a variavel express
const routes = require('./routes')                  //importando minhas routes
const cors = require('cors')
const { errors } = require('celebrate')

const app = express()                               //Criando minha aplicação

app.use(cors());
app.use(express.json());
app.use(routes);                                     //Importante para as rotas funcionarem
app.use(errors());
                               
app.listen(3333)                                    //Minha aplicação escute a porta 3333