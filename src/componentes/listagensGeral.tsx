import React from 'react';
import ListaProdutosServicos from './Listagens/listaProdServ';
import ListaClientesMaisConsumiramValor from './Listagens/listaClientesMaisConsumiramValor';
import ListaClientesMaisConsumiram from './Listagens/listaClientesMaisConsumiram';

const ListagemGeral: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Listagem Geral</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Lista de Produtos e Serviços</h2>
            </div>
            <div className="card-body">
              <ListaProdutosServicos />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Clientes que Mais Consumiram por Valor</h2>
            </div>
            <div className="card-body">
              <ListaClientesMaisConsumiramValor />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Clientes que Mais Consumiram</h2>
            </div>
            <div className="card-body">
              <ListaClientesMaisConsumiram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListagemGeral;
