import React, { useState } from "react";
import Cliente from "../modelo/cliente";
import Rg from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Pet from "../modelo/pet";

type Props = {
  cliente: Cliente;
};

const DetalhesCliente: React.FC<Props> = ({ cliente }) => {
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(cliente.nome);
  const [novoNomeSocial, setNovoNomeSocial] = useState(cliente.nomeSocial);
  const [novoCpf, setNovoCpf] = useState(cliente.getCpf.getValor);
  const [novoRgs, setNovoRgs] = useState<Rg[]>(cliente.getRgs);
  const [novoTelefones, setNovoTelefones] = useState<Telefone[]>(cliente.getTelefones);
  const [novoPets, setNovoPets] = useState<Pet[]>(cliente.getPets);

  const handleEditar = () => {
    setEditando(true);
  };

  const handleCancelar = () => {
    setEditando(false);
    setNovoNome(cliente.nome);
    setNovoNomeSocial(cliente.nomeSocial);
    setNovoCpf(cliente.getCpf.getValor);
    setNovoRgs(cliente.getRgs);
    setNovoTelefones(cliente.getTelefones);
    setNovoPets(cliente.getPets);
  };

  const handleSalvar = () => {
    cliente.setNome(novoNome);
    cliente.setNomeSocial(novoNomeSocial);
    cliente.getCpf.setValor(novoCpf);
    cliente.setRGs(novoRgs);
    cliente.setTelefones(novoTelefones);
    cliente.setPets(novoPets);

    console.log("Cliente atualizado:", cliente);
    setEditando(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Detalhes do Cliente</h2>
      {editando ? (
        <form>
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nome Social:</label>
            <input
              type="text"
              className="form-control"
              value={novoNomeSocial}
              onChange={(e) => setNovoNomeSocial(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <input
              type="text"
              className="form-control"
              value={novoCpf}
              onChange={(e) => setNovoCpf(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <h3>RGs:</h3>
            {novoRgs.map((rg, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Número RG:</label>
                <input
                  type="text"
                  className="form-control"
                  value={rg.getValor}
                  onChange={(e) => {
                    const newRgs = [...novoRgs];
                    newRgs[index] = new Rg(e.target.value, rg.getDataEmissao);
                    setNovoRgs(newRgs);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <h3>Telefones:</h3>
            {novoTelefones.map((telefone, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Número Telefone:</label>
                <input
                  type="text"
                  className="form-control"
                  value={telefone.getNumero}
                  onChange={(e) => {
                    const newTelefones = [...novoTelefones];
                    newTelefones[index] = new Telefone(telefone.getDdd, e.target.value);
                    setNovoTelefones(newTelefones);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <h3>Pets:</h3>
            {novoPets.map((pet, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Nome Pet:</label>
                <input
                  type="text"
                  className="form-control"
                  value={pet.getNome()}
                  onChange={(e) => {
                    const newPets = [...novoPets];
                    newPets[index] = new Pet(
                      e.target.value,
                      pet.getRaca(),
                      pet.getGenero(),
                      pet.getTipo()
                    );
                    setNovoPets(newPets);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-primary" onClick={handleSalvar}>
              Confirmar Atualização
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>ID: {cliente.id}</p>
          <p>Nome: {cliente.nome}</p>
          <p>Nome Social: {cliente.nomeSocial}</p>
          <p>CPF: {cliente.getCpf.getValor}</p>
          <h3>RGs:</h3>
          <ul className="list-group">
            {cliente.getRgs.map((rg, index) => (
              <li key={index} className="list-group-item">
                Número: {rg.getValor}, Data de Emissão: {rg.getDataEmissao.toLocaleDateString()}
              </li>
            ))}
          </ul>
          <h3>Telefones:</h3>
          <ul className="list-group">
            {cliente.getTelefones.map((telefone, index) => (
              <li key={index} className="list-group-item">
                Número: ({telefone.getDdd}) {telefone.getNumero}
              </li>
            ))}
          </ul>
          <h3>Pets:</h3>
          <ul className="list-group">
            {cliente.getPets &&
              cliente.getPets.map((pet, index) => (
                <li key={index} className="list-group-item">
                  Nome: {pet.getNome()}, Raça: {pet.getRaca()}, Gênero: {pet.getGenero()}, Tipo: {pet.getTipo()}
                </li>
              ))}
          </ul>
          <button className="btn btn-primary mt-3" onClick={handleEditar}>
            Editar
          </button>
        </>
      )}
    </div>
  );
};

export default DetalhesCliente;
