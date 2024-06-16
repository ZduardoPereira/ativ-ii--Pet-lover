import React, { useState } from 'react';
import Produto from '../modelo/produto';

interface EditarProdutoFormProps {
  produto: Produto | null;
  onAtualizarProduto: (id: number, novoNome: string, novoPreco: number) => void;
  onCancel: () => void;
}

const EditarProdutoForm: React.FC<EditarProdutoFormProps> = ({ produto, onAtualizarProduto, onCancel }) => {
  const [novoNome, setNovoNome] = useState<string>(produto?.getNomeProduto() || '');
  const [novoPreco, setNovoPreco] = useState<number>(produto?.getPrecoProduto() || 0);

  const handleAtualizarProduto = () => {
    if (produto) {
      onAtualizarProduto(produto.getId(), novoNome, novoPreco);
      onCancel();
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="novoNome">Novo Nome:</label>
        <input type="text" id="novoNome" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
      </div>
      <div>
        <label htmlFor="novoPreco">Novo Preço:</label>
        <input type="number" id="novoPreco" value={novoPreco} onChange={(e) => setNovoPreco(Number(e.target.value))} />
      </div>
      <div>
        <button className="btn btn-success" onClick={handleAtualizarProduto}>Atualizar Produto</button>
        <button className="btn btn-danger ml-2" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditarProdutoForm;
