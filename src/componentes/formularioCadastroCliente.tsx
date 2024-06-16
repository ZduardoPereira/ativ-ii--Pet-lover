import React, { useState } from 'react';
import Cliente from '../modelo/cliente';
import CPF from '../modelo/cpf';
import RG from '../modelo/rg';
import Telefone from '../modelo/telefone';

interface FormularioCadastroClienteProps {
  tema: string;
  onCadastrarCliente: (novoCliente: Cliente) => void;
}

interface RgForm {
  valor: string;
  dataEmissao: string;
}

interface TelefoneForm {
  ddd: string;
  numero: string;
}

const FormularioCadastroCliente: React.FC<FormularioCadastroClienteProps> = ({ tema, onCadastrarCliente }) => {
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [cpfValor, setCpfValor] = useState('');
  const [dataCpf, setDataCpf] = useState('');
  const [rgForms, setRgForms] = useState<RgForm[]>([{ valor: '', dataEmissao: '' }]);
  const [telefoneForms, setTelefoneForms] = useState<TelefoneForm[]>([{ ddd: '', numero: '' }]);

  const handleCadastrarCliente = () => {
    const cpf = new CPF(cpfValor, new Date(dataCpf));
    const rgs = rgForms.map((rg) => new RG(rg.valor, new Date(rg.dataEmissao)));
    const telefones = telefoneForms.map((telefone) => new Telefone(telefone.ddd, telefone.numero));

    const novoCliente = new Cliente(nome, nomeSocial, cpf, rgs, telefones);
    onCadastrarCliente(novoCliente);

    setNome('');
    setNomeSocial('');
    setCpfValor('');
    setDataCpf('');
    setRgForms([{ valor: '', dataEmissao: '' }]);
    setTelefoneForms([{ ddd: '', numero: '' }]);
  };

  const handleAdicionarRg = () => {
    setRgForms([...rgForms, { valor: '', dataEmissao: '' }]);
  };

  const handleAdicionarTelefone = () => {
    setTelefoneForms([...telefoneForms, { ddd: '', numero: '' }]);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: tema, padding: '20px', width: '90%', margin: 'auto' }}>
      <h2 className="text-center mb-4">Formulário de Cadastro de Cliente</h2>

      <div className="mb-3">
        <label>Nome:</label>
        <input className="form-control" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Nome Social:</label>
        <input className="form-control" type="text" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>CPF:</label>
        <input className="form-control" type="number" value={cpfValor} onChange={(e) => setCpfValor(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Data de Emissão do CPF:</label>
        <input className="form-control" type="date" value={dataCpf} onChange={(e) => setDataCpf(e.target.value)} />
      </div>

      {rgForms.map((rg, index) => (
        <div key={index} className="mb-3">
          <label>RG:</label>
          <input
            className="form-control"
            type="text"
            value={rg.valor}
            onChange={(e) => {
              const newRgForms = [...rgForms];
              newRgForms[index].valor = e.target.value;
              setRgForms(newRgForms);
            }}
          />

          <label>Data de Emissão do RG:</label>
          <input
            className="form-control"
            type="date"
            value={rg.dataEmissao}
            onChange={(e) => {
              const newRgForms = [...rgForms];
              newRgForms[index].dataEmissao = e.target.value;
              setRgForms(newRgForms);
            }}
          />
        </div>
      ))}

      <button className="btn btn-primary mb-3" onClick={handleAdicionarRg}>Adicionar RG</button>

      {telefoneForms.map((telefone, index) => (
        <div key={index} className="mb-3">
          <label>DDD:</label>
          <input
            className="form-control"
            type="text"
            value={telefone.ddd}
            onChange={(e) => {
              const newTelefoneForms = [...telefoneForms];
              newTelefoneForms[index].ddd = e.target.value;
              setTelefoneForms(newTelefoneForms);
            }}
          />

          <label>Número de Telefone:</label>
          <input
            className="form-control"
            type="text"
            value={telefone.numero}
            onChange={(e) => {
              const newTelefoneForms = [...telefoneForms];
              newTelefoneForms[index].numero = e.target.value;
              setTelefoneForms(newTelefoneForms);
            }}
          />
          
        </div>
      ))}
      <div style={{ marginBottom: '20px' }}>
        <button className="btn btn-primary mb-3" onClick={handleAdicionarTelefone}>Adicionar Telefone</button>
      </div>
      <button className="btn btn-success" onClick={handleCadastrarCliente}>Cadastrar Cliente</button>
    </div>
  );
};

export default FormularioCadastroCliente;
