import React, { useEffect, useState } from 'react';
import ClientesQueMaisConsumiramServicosValor from '../../negocio/listagens/clienteMaisValor';

const ListaClientesMaisConsumiramValor: React.FC = () => {
  const [listaClientes, setListaClientes] = useState<string[]>([]);
  const [hasConsumedClients, setHasConsumedClients] = useState<boolean>(false);

  useEffect(() => {
    // Implemente a lógica para obter os clientes do backend (se necessário)
    // const clientes = ...

    const clientesMaisConsumiramValor = new ClientesQueMaisConsumiramServicosValor([]);
    // Adicione os clientes ao construtor acima, se necessário

    // Captura a saída da listagem no console e define no estado
    const consoleLog = console.log;
    console.log = (message: string) => setListaClientes((prev) => [...prev, message]);

    if (!hasConsumedClients) {
      clientesMaisConsumiramValor.listar();
      setHasConsumedClients(true);
    }

    console.log = consoleLog;
  }, [hasConsumedClients]);

  return (
    <div>
      {listaClientes.length > 0 ? (
        <ul>
          {listaClientes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Não há clientes que mais consumiram em valor.</p>
      )}
    </div>
  );
};

export default ListaClientesMaisConsumiramValor;
