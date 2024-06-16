import React, { Component } from "react";

type Cliente = {
  id: number;
  nome: string;
};

type Props = {
  tema: string;
  clientes: Cliente[];
  onExcluir: (id: number) => void;
  onAtualizar: (id: number) => void;
  onVerCliente: (id: number) => void;
};

type State = {
  clienteAtualizando: number | null;
};

export default class ListaCliente extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clienteAtualizando: null,
    };
  }

  render() {
    const { tema, clientes, onExcluir, onAtualizar, onVerCliente } = this.props;
    const { clienteAtualizando } = this.state;

    return (
      <div className="container-fluid">
        <div className="list-group">
          {clientes.map((cliente) => (
            <div key={cliente.id} className="list-group-item d-flex">
              {clienteAtualizando === cliente.id ? (
                <div>
                  <input
                    type="text"
                    value={cliente.nome}
                    onChange={(e) => console.log("Atualizando nome:", e.target.value)}
                  />
                  <button onClick={() => console.log("Atualizar cliente:", cliente.id)}>
                    Confirmar Atualização
                  </button>
                  <button onClick={() => this.setState({ clienteAtualizando: null })}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-grow-1" style={{ backgroundColor: tema }}>
                    {cliente.nome}
                  </span>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => onExcluir(cliente.id)}
                  >
                    Excluir
                  </button>
                  
                  <button
                    className="btn btn-secondary"
                    onClick={() => onVerCliente(cliente.id)}
                  >
                    Ver Cliente
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
