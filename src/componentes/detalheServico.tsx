import React, { useState } from 'react';
import Servico from '../modelo/servico'; 

interface DetalhesServicoProps {
  servico: Servico;
  onAtualizarServico: (id: number, novoNome: string, novoPreco: number) => void;
  onCancel: () => void;
}

const DetalhesServico: React.FC<DetalhesServicoProps> = ({ servico, onAtualizarServico, onCancel }) => {
  const [novoNome, setNovoNome] = useState(servico.getNome());
  const [novoPreco, setNovoPreco] = useState(servico.getPreco());

  const handleSalvar = () => {
    onAtualizarServico(servico.getId, novoNome, novoPreco);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Atualizar Serviço</h2>
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
          <label className="form-label">Preço:</label>
          <input
            type="number"
            className="form-control"
            value={novoPreco}
            onChange={(e) => setNovoPreco(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={handleSalvar}>
            Confirmar Atualização
          </button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetalhesServico;
