import React, { useState } from 'react';
import Cliente from '../modelo/cliente';
import Pet from '../modelo/pet';

type Props = {
  clientes: Cliente[];
  onCadastrarPet: (pet: Pet) => void;
};

const FormularioCadastroPet: React.FC<Props> = ({ clientes, onCadastrarPet }) => {
  const [clientId, setClientId] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [raca, setRaca] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');

  const cadastrarPet = () => {
    const cliente = clientes.find(c => c.getId.toString() === clientId);

    if (cliente) {
      const novoPet = new Pet(nome, raca, genero, tipo);
      cliente.adicionarPet(novoPet);

      setClientId('');
      setNome('');
      setRaca('');
      setGenero('');
      setTipo('');

      onCadastrarPet(novoPet);
    } else {
      alert('Cliente não encontrado com o ID fornecido.');
    }
  };

  return (
    <div style={{ margin: '5%' }}>
      <h2>Cadastro de Pet</h2>
      <div className="mb-3">
        <label className="form-label">ID do Cliente:</label>
        <input type="text" className="form-control" value={clientId} onChange={e => setClientId(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Nome:</label>
        <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Raça:</label>
        <input type="text" className="form-control" value={raca} onChange={e => setRaca(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Gênero:</label>
        <input type="text" className="form-control" value={genero} onChange={e => setGenero(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Tipo:</label>
        <input type="text" className="form-control" value={tipo} onChange={e => setTipo(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={cadastrarPet}>Cadastrar Pet</button>
    </div>
  );
};

export default FormularioCadastroPet;
