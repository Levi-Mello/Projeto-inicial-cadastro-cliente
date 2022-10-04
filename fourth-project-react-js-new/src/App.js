import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import api from './services/api';


import img from './assets/Fidelização-de-clientes.png';
import { Form } from './styles';

export default function App(){
  const [clients, setClients] = useState([]);
  const [newNome, setNewNome] = useState('');
  const [newCpf, setNewCpf] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTelefone, setNewTelefone] = useState('');
  const [newLogradouro, setNewLogradouro] = useState('');
  const [newNumero, setNewNumero] = useState('');
  const [newComplemento, setNewComplemento] = useState('');
  const [newBairro, setNewBairro] = useState('');
  const [newCidade, setNewCidade] = useState('');
  const [newEstado, setNewEstado] = useState('');
  const [newCep, setNewCep] = useState('');

  // useState retorna um array com 2 posicoes
  // 
  // 1. variavel com seu valor inicial 
  // 2. função para atualizacao deste valor 

  useEffect(() => {
    api.get('clients').then(response => {
      setClients(response.data);
    });
  }, []);

  function handleInputChangeNewNome(e) {
    setNewNome(e.target.value);
  }

  function handleInputChangeNewCpf(e) {
    setNewCpf(e.target.value);
  }

  function handleInputChangeNewEmail(e) {
    setNewEmail(e.target.value);
  }
  function handleInputChangeNewTelefone(e) {
    setNewTelefone(e.target.value);
  }

  function handleInputChangeNewLogradouro(e) {
    setNewLogradouro(e.target.value);
  }

  function handleInputChangeNewNumero(e) {
    setNewNumero(e.target.value);
  }

  function handleInputChangeNewComplemento(e) {
    setNewComplemento(e.target.value);
  }

  function handleInputChangeNewBairro(e) {
    setNewBairro(e.target.value);
  }

  function handleInputChangeNewCidade(e) {
    setNewCidade(e.target.value);
  }

  function handleInputChangeNewEstado(e) {
    setNewEstado(e.target.value);
  }
  function handleInputChangeNewCep(e) {
    setNewCep(e.target.value);
  }

  async function addNewClient(e) {
    e.preventDefault(); /* Evita o refresh na página */
    setNewNome(newNome);
    setNewCpf(newCpf);
    setNewEmail(newEmail);
    setNewTelefone(newTelefone);
    setNewLogradouro(newLogradouro);
    setNewNumero(newNumero);
    setNewComplemento(newComplemento);
    setNewCidade(newCidade);
    setNewBairro(newBairro);
    setNewEstado(newEstado);
    setNewCep(newCep);
    const response = await api.post('clients', {
      nome: `${newNome}`,
      cpf: `${newCpf}`,
      email: `${newEmail}`,
      telefone: `${newTelefone}`,
      logradouro: `${newLogradouro}`,
      numero: `${newNumero}`,
      complemento: `${newComplemento}`,
      cidade: `${newCidade}`,
      bairro: `${newBairro}`,
      estado: `${newEstado}`,
      cep: `${newCep}`
    });

    const client = response.data;

    console.log(client);

    setClients([...clients, client]); // spread operator
    setNewNome('');
    setNewCpf('');
    setNewEmail('');
    setNewTelefone('');
    setNewLogradouro('');
    setNewNumero('');
    setNewComplemento('');
    setNewCidade('');
    setNewBairro('');
    setNewEstado('');
    setNewCep('');	
  }

  return (
    <Form>
      <img width={300} src={img} />
      <h1>Cadastro de Cliente</h1>
      <br/>
      <input
            type="text"
            placeholder="Nome do cliente"
            value={newNome}
            onChange={handleInputChangeNewNome}
            /> 
      <br/>
      <input
            type="text"
            placeholder="Cpf do cliente"
            value={newCpf}
            onChange={handleInputChangeNewCpf}
            />     
      <br/>
      <input
            type="text"
            placeholder="Email do cliente"
            value={newEmail}
            onChange={handleInputChangeNewEmail}
            /> 
      <br/>
      <input
            type="text"
            placeholder="Telefone do cliente"
            value={newTelefone}
            onChange={handleInputChangeNewTelefone}
            />
      <br/>
      <input
            type="text"
            placeholder="Logradouro"
            value={newLogradouro}
            onChange={handleInputChangeNewLogradouro}
            />
      <br/> 
      <input
            type="text"
            placeholder="Número"
            value={newNumero}
            onChange={handleInputChangeNewNumero}
            />
      <br/> 
      <input
            type="text"
            placeholder="Complemento"
            value={newComplemento}
            onChange={handleInputChangeNewComplemento}
            />
      <br/> 
      <input
            type="text"
            placeholder="Bairro"
            value={newBairro}
            onChange={handleInputChangeNewBairro}
            />
      <br/> 
      <input
            type="text"
            placeholder="Cidade"
            value={newCidade}
            onChange={handleInputChangeNewCidade}
            />
      <br/> 
      <input
            type="text"
            placeholder="Estado"
            value={newEstado}
            onChange={handleInputChangeNewEstado}
            />
      <br/> 
      <input
            type="text"
            placeholder="Cep"
            value={newCep}
            onChange={handleInputChangeNewCep}
            />
      <br/>
      
      <button type="button" 
              onClick={addNewClient}>Adicionar cliente</button>
      <br/>
      <br/>

      <Header title="Clientes">
        <ul>
          {clients.map(client => 
          <li key={client.id}>
            <span>{`Nome: `+client.nome}</span>
            <span>{` - Cpf: `+client.cpf}</span>
            <span>{` - E-mail: `+client.email}</span>
            <span>{` - Telefone: `+client.telefone}</span>
            <span>{` - Logradouro: `+client.logradouro}</span>
            <span>{` - Número: `+client.numero}</span>
            <span>{` - Complemento: `+client.complemento}</span>
            <span>{` - Bairro: `+client.bairro}</span>
            <span>{` - Cidade: `+client.cidade}</span>
            <span>{` - Estado: `+client.estado}</span>
            <span>{` - Cep: `+client.cep}</span>
          </li>)}
        </ul>
      </Header>
      
    </Form>
  );
}