/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo para criar ou editar  um recurso (JSON)
 */

/** Middleware:
 * 
 * Interceptador de requisições que pode interromper uma requisição
 * ou alterar dados de uma requisição 
*/

const express = require('express');
const { uuid, isUuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
/** 
  A linha abaixo aplica o midlleware para todas as rotas iniciadas
  por /projects/:id (Alteração e deleção).
  Com ela poderia ser retirado o nome da função dos métodos put e delete
*/
app.use('/clients/:id', validateClientId);

const clients = [];

// Função que mostra logs para exemplificar midlleware
function logRequests(request, response, next) {
  const {method, url} =request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();

}

app.use(logRequests); // Chama a função (midlleware) logRequests

function validateClientId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)) 
     return (response.status(400).json({ error: 'Invalid client ID. (Middleware)' }));

  return next();

}

// Listagem de usuários
app.get('/clients', (request, response) => {
  const { nome, cpf, email, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep } = request.query;

  // Filtro (Query inserida no insomnia) por nome
  results = nome ?
    clients.filter(client => client.nome.includes(nome)) :
    clients;

  // Filtro (Query inserida no insomnia) por cpf
  results = cpf ?
    clients.filter(client => client.cpf.includes(cpf)) :
    clients;

  // Filtro (Query inserida no insomnia) por email
  results = email ?
    clients.filter(client => client.email.includes(email)) :
    clients;

  // Filtro (Query inserida no insomnia) por telefone
  results = telefone ?
    clients.filter(client => client.telefone.includes(telefone)) :
    clients;

  // Filtro (Query inserida no insomnia) por logradouro
  results = logradouro ?
    clients.filter(client => client.logradouro.includes(logradouro)) :
    clients;

  // Filtro (Query inserida no insomnia) por numero
  results = numero ?
    clients.filter(client => client.numero.includes(numero)) :
    clients;

  // Filtro (Query inserida no insomnia) por complemento
  results = complemento ?
    clients.filter(client => client.complemento.includes(complemento)) :
    clients;

  // Filtro (Query inserida no insomnia) por bairro
  results = bairro ?
    clients.filter(client => client.bairro.includes(bairro)) :
    clients;

  // Filtro (Query inserida no insomnia) por cidade
  results = cidade ?
    clients.filter(client => client.cidade.includes(cidade)) :
    clients;

  // Filtro (Query inserida no insomnia) por estado
  results = estado ?
    clients.filter(client => client.estado.includes(estado)) :
    clients;

  // Filtro (Query inserida no insomnia) por cep
  results = cep ?
    clients.filter(client => client.cep.includes(cep)) :
    clients;

  return response.json(results);
});

// Inclusão de usuários
app.post('/clients', (request, response) => {
  const { nome, cpf, email, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep  } = request.body;
  const id = uuid();

  const client = { id, nome, cpf, email, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep };
  clients.push(client);

  return response.json(client);
});

// Alteração de usuários
app.put('/clients/:id', validateClientId, (request, response) => {
  const { id } = request.params;
  const { nome, cpf, email, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep  } = request.body;

  clientIndex = clients.findIndex(client => client.id === id);

  if (clientIndex < 0) {
    return response.status(400).json({ error: 'Client not Found'});
  }

  const client = { id, nome, cpf, email, telefone, logradouro, numero, complemento, bairro, cidade, estado, cep };

  clients[clientIndex] = client;

  return response.json(client);
});

// Deleção de usuários
app.delete('/clients/:id', validateClientId, (request, response) => {
  const { id } = request.params;

  clientIndex = clients.findIndex(client => client.id === id);

  if (clientIndex < 0) {
    return response.status(400).json({ error: 'Client not Found'});
  }

  clients.splice(clientIndex, 1);

  return response.json({ 'delete': 'Successfully' });

});

app.listen(3333, () => {
  console.log('Servidor iniciado.')
});