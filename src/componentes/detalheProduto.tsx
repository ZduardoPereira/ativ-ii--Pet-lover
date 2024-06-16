import React, { useState } from "react";
import Produto from "../modelo/produto";

type Props = {
  produto: Produto;
  onAtualizarProduto: (id: number, novoNome: string, novoPreco: number) => void;
  onCancel: () => void;
};

const DetalhesProduto: React.FC<Props> = ({ produto, onAtualizarProduto, onCancel }) => {
  const [novoNome, setNovoNome] = useState(produto.getNomeProduto());
  const [novoPreco, setNovoPreco] = useState(produto.getPrecoProduto());

  const handleSalvar = () => {
    onAtualizarProduto(produto.getId(), novoNome, novoPreco);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Atualizar Produto</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Nome do Produto:</label>
          <input
            type="text"
            className="form-control"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Preço do Produto:</label>
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

export default DetalhesProduto;
