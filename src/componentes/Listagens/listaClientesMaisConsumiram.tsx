import React, { useEffect, useState } from 'react';
import ClientesQueMaisConsumiramProdutosQuant from '../../negocio/listagens/clienteMaisConsumiram';

const ListaClientesMaisConsumiram: React.FC = () => {
  const [listaClientes, setListaClientes] = useState<string[]>([]);
  const [hasConsumedClients, setHasConsumedClients] = useState<boolean>(false);

  useEffect(() => {

    const clientesMaisConsumiram = new ClientesQueMaisConsumiramProdutosQuant([]);
    const consoleLog = console.log;
    console.log = (message: string) => setListaClientes((prev) => [...prev, message]);

    if (!hasConsumedClients) {
      clientesMaisConsumiram.listar();
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
        <p>Não há clientes que mais consumiram no geral.</p>
      )}
    </div>
  );
};

export default ListaClientesMaisConsumiram;
