import React, { useState } from 'react';
import Produto from '../modelo/produto';

type Props = {
  onCadastrarProduto: (produto: Produto) => void;
};

const ProdutoForm: React.FC<Props> = ({ onCadastrarProduto }) => {
  const [nome, setNome] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [precoProduto, setPrecoProduto] = useState<number>(0);

  const cadastrarProduto = () => {
    if (nome && precoProduto > 0) {
      const novoProduto = new Produto(nome, descricao, precoProduto, 0);
      onCadastrarProduto(novoProduto);

      setNome('');
      setDescricao('');
      setPrecoProduto(0);
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cadastro de Produto</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome do Produto
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição do Produto
          </label>
          <textarea
            className="form-control"
            id="descricao"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precoProduto" className="form-label">
            Preço do Produto
          </label>
          <input
            type="number"
            className="form-control"
            id="precoProduto"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(Number(e.target.value))}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={cadastrarProduto}>
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default ProdutoForm;
