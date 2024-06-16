import React, { useState } from 'react';
import Cliente from '../modelo/cliente';
import CPF from '../modelo/cpf';
import RG from '../modelo/rg';
import Telefone from '../modelo/telefone';

interface AtualizarClienteProps {
  tema: string;
  cliente: Cliente;
  onAtualizarCliente: (clienteAtualizado: Cliente) => void;
}

interface RgForm {
  valor: string;
  dataEmissao: string;
}

interface TelefoneForm {
  ddd: string;
  numero: string;
}

const AtualizarCliente: React.FC<AtualizarClienteProps> = ({ tema, cliente, onAtualizarCliente }) => {
  const [edicao, setEdicao] = useState(false);

  const [nome, setNome] = useState(cliente.nome);
  const [nomeSocial, setNomeSocial] = useState(cliente.nomeSocial);
  const [cpfValor, setCpfValor] = useState(cliente.getCpf.getValor);
  const [dataCpf, setDataCpf] = useState(cliente.getCpf.getDataEmissao.toISOString().split('T')[0]);
  const [rgForms, setRgForms] = useState<RgForm[]>(
    cliente.getRgs.map((rg) => ({ valor: rg.getValor, dataEmissao: rg.getDataEmissao.toISOString().split('T')[0] }))
  );
  const [telefoneForms, setTelefoneForms] = useState<TelefoneForm[]>(
    cliente.getTelefones.map((telefone) => ({ ddd: telefone.getDdd, numero: telefone.getNumero }))
  );

  const handleAtualizarCliente = () => {
    const cpf = new CPF(cpfValor, new Date(dataCpf));
    const rgs = rgForms.map((rg) => new RG(rg.valor, new Date(rg.dataEmissao)));
    const telefones = telefoneForms.map((telefone) => new Telefone(telefone.ddd, telefone.numero));

    const clienteAtualizado = new Cliente(nome, nomeSocial, cpf, rgs, telefones);
    onAtualizarCliente(clienteAtualizado);
    setEdicao(false); 
  };

  const handleAdicionarRg = () => {
    setRgForms([...rgForms, { valor: '', dataEmissao: '' }]);
  };

  const handleAdicionarTelefone = () => {
    setTelefoneForms([...telefoneForms, { ddd: '', numero: '' }]);
  };

  const renderInput = (label: string, value: string, onChange: (value: string) => void, type: string) => (
    <div className="mb-3">
      <label>{label}:</label>
      <input
        className="form-control"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!edicao}
      />
    </div>
  );

  const renderRgInput = (label: string, value: string, onChange: (value: string) => void, type: string) => (
    <div className="mb-3">
      <label>{label}:</label>
      <input
        className="form-control"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!edicao}
      />
    </div>
  );

  return (
    <div className="container-fluid" style={{ backgroundColor: tema, padding: '20px', width: '90%', margin: 'auto' }}>
      <h2 className="text-center mb-4">Atualizar Cliente</h2>

      {renderInput('Nome', nome, setNome, 'text')}
      {renderInput('Nome Social', nomeSocial, setNomeSocial, 'text')}
      {renderInput('CPF', cpfValor, setCpfValor, 'number')}
      {renderInput('Data de Emissão do CPF', dataCpf, setDataCpf, 'date')}

      {rgForms.map((rg, index) => (
        <div key={index} className="mb-3">
          {renderRgInput('RG', rg.valor, (value) => {
            const newRgForms = [...rgForms];
            newRgForms[index].valor = value;
            setRgForms(newRgForms);
          }, 'text')}

          {renderRgInput('Data de Emissão do RG', rg.dataEmissao, (value) => {
            const newRgForms = [...rgForms];
            newRgForms[index].dataEmissao = value;
            setRgForms(newRgForms);
          }, 'date')}
        </div>
      ))}

      <button className="btn btn-primary mb-3" onClick={handleAdicionarRg} disabled={!edicao}>
        Adicionar RG
      </button>

      {telefoneForms.map((telefone, index) => (
        <div key={index} className="mb-3">
          {renderInput('DDD', telefone.ddd, (value) => {
            const newTelefoneForms = [...telefoneForms];
            newTelefoneForms[index].ddd = value;
            setTelefoneForms(newTelefoneForms);
          }, 'text')}

          {renderInput('Número de Telefone', telefone.numero, (value) => {
            const newTelefoneForms = [...telefoneForms];
            newTelefoneForms[index].numero = value;
            setTelefoneForms(newTelefoneForms);
          }, 'text')}
        </div>
      ))}

      <button className="btn btn-primary mb-3" onClick={() => setTelefoneForms([...telefoneForms, { ddd: '', numero: '' }])} disabled={!edicao}>
        Adicionar Telefone
      </button>

      <button className="btn btn-success" onClick={handleAtualizarCliente} disabled={!edicao}>
        Atualizar Cliente
      </button>

      <button className="btn btn-primary mb-3" onClick={() => setEdicao(!edicao)}>
        {edicao ? 'Cancelar Edição' : 'Editar Todos os Campos'}
      </button>
    </div>
  );
};

export default AtualizarCliente;
