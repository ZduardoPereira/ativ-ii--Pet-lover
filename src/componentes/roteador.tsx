import React, { Component } from 'react';
import BarraNavegacao from './barraNavegacao';
import ListaCliente from './listaClientes';
import FormularioCadastroCliente from './formularioCadastroCliente';
import Cliente from '../modelo/cliente';
import DetalhesCliente from './detalhesCliente';
import listagemClientes from '../insert/insertCliente';
import CadastroPet from './cadastroPet';
import Pet from '../modelo/pet';
import ServicoForm from './cadastroServ';
import ProdutoForm from './cadastroProd';
import Produto from '../modelo/produto';
import Servico from '../modelo/servico';

import ListaProdutosServicos from './listaServ';
import ListagemGeral from './listagensGeral';

type State = {
  tela: string;
  clienteSelecionado: Cliente;
  listagemClientes: Cliente[];
  produtos: Produto[];
  servicos: Servico[];
};

export default class Roteador extends Component<{}, State> {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      tela: 'Clientes',
      clienteSelecionado: listagemClientes[0],
      listagemClientes: [...listagemClientes],
      produtos: [],
      servicos: [],
    };

    this.selecionarView = this.selecionarView.bind(this);
    this.excluirCliente = this.excluirCliente.bind(this);
    this.atualizarCliente = this.atualizarCliente.bind(this);
    this.verCliente = this.verCliente.bind(this);
    this.cadastrarCliente = this.cadastrarCliente.bind(this);
    this.cadastrarProduto = this.cadastrarProduto.bind(this);
    this.cadastrarServico = this.cadastrarServico.bind(this);
  }

  selecionarView(novaTela: string, evento: React.MouseEvent) {
    evento.preventDefault();

    const clienteSelecionadoAntesDaMudanca = this.state.clienteSelecionado;

    this.setState({
      tela: novaTela,
      clienteSelecionado: clienteSelecionadoAntesDaMudanca,
    });
  }

  cadastrarProduto(novoProduto: Produto) {
    this.setState((prevState) => ({
      produtos: [...prevState.produtos, novoProduto],
    }));
  }

  cadastrarServico(novoServico: Servico) {
    this.setState((prevState) => ({
      servicos: [...prevState.servicos, novoServico],
    }));
  }

  cadastrarProdutoConsumido(idCliente: number, produto: Produto) {
    this.setState((prevState) => {
      const listaClientesAtualizada = prevState.listagemClientes.map((cliente) => {
        if (cliente.id === idCliente) {
          const clienteAtualizado = {
            ...cliente,
            produtosConsumidos: [...cliente.produtosConsumidos, produto],
          };
          return clienteAtualizado as Cliente; 
        }
        return cliente;
      });
  
      return { ...prevState, listagemClientes: listaClientesAtualizada };
    });
  }
  

  cadastrarServicoConsumido(idCliente: number, servico: Servico) {
    this.setState((prevState) => {
      const listaClientesAtualizada = prevState.listagemClientes.map((cliente) => {
        if (cliente.id === idCliente) {
          const clienteAtualizado = {
            ...cliente,
            servicosConsumidos: [...cliente.servicosConsumidos, servico],
          };
          return clienteAtualizado as Cliente; 
        return cliente;
      }});
  
      return { ...prevState, listagemClientes: listaClientesAtualizada };
    });
  }  

  excluirCliente(id: number) {
    const novaListaClientes = this.state.listagemClientes.filter((cliente) => cliente.id !== id);
    this.setState({
      listagemClientes: novaListaClientes,
    });
  }

  atualizarCliente(id: number) {
    console.log(`Atualizar cliente com ID: ${id}`);
  }

  verCliente(id: number) {
    const clienteSelecionado = this.state.listagemClientes.find((cliente) => cliente.id === id);

    if (clienteSelecionado) {
      this.setState({
        tela: 'DetalhesCliente',
        clienteSelecionado: clienteSelecionado,
      });
    } else {
      console.error('Cliente não encontrado com ID:', id);
    }
  }

  cadastrarCliente(novoCliente: Cliente) {
    this.setState((prevState) => ({
      listagemClientes: [...prevState.listagemClientes, novoCliente],
    }));
  }

  cadastrarPet(novoPet: Pet) {
    this.setState((state) => {
      const listaClientesAtualizada = state.listagemClientes.map((cliente) => {
        if (cliente.getId === cliente.id) {
          const clienteAtualizado = { ...cliente, pets: [...cliente.getPets, novoPet] } as Cliente;
          return clienteAtualizado;
        }
        return cliente;
      });

      const clienteSelecionadoAtualizado = listaClientesAtualizada.find(
        (cliente) => cliente.getId === state.clienteSelecionado.getId
      ) || state.clienteSelecionado;

      return { ...state, listagemClientes: listaClientesAtualizada, clienteSelecionado: clienteSelecionadoAtualizado };
    });
  }
  
  render() {
    let barraNavegacao = (
      <BarraNavegacao
        seletorView={this.selecionarView}
        tema="#e3f2fd"
        botoes={['Clientes', 'Cadastro Cliente', 'Cadastro Pet', 'Cadastro Produto e Serviço', 'Lista produto e serviço', 'Listagem Geral']}
      />
    );

    if (this.state.tela === 'Clientes') {
      return (
        <>
          {barraNavegacao}
          <ListaCliente
            tema="#e3f2fd"
            clientes={this.state.listagemClientes}
            onExcluir={this.excluirCliente}
            onAtualizar={this.atualizarCliente}
            onVerCliente={this.verCliente}
          />
        </>
      );
    } else if (this.state.tela === 'DetalhesCliente' && this.state.clienteSelecionado) {
      return (
        <>
          {barraNavegacao}
          <DetalhesCliente cliente={this.state.clienteSelecionado} />
        </>
      );
    } else if (this.state.tela === 'Cadastro Pet') {
      return (
        <>
          {barraNavegacao}
          <CadastroPet clientes={this.state.listagemClientes} onCadastrarPet={this.cadastrarPet.bind(this)} />
        </>
      );
    } else if (this.state.tela === 'Cadastro Produto e Serviço') {
      return (
        <>
          {barraNavegacao}
          <ProdutoForm onCadastrarProduto={this.cadastrarProduto.bind(this)} />
          <ServicoForm onCadastrarServico={this.cadastrarServico.bind(this)} />
        </>
      );
    } else if (this.state.tela === 'Lista produto e serviço') {
      return (
        <>
          {barraNavegacao}
          <ListaProdutosServicos />
        </>
      );
    }else if (this.state.tela === 'Listagem Geral') {
      return (
        <>
          {barraNavegacao}
          <ListagemGeral></ListagemGeral>
        </>
      );
    }else {
      return (
        <>
          {barraNavegacao}
          <FormularioCadastroCliente
            tema="#e3f2fd"
            onCadastrarCliente={this.cadastrarCliente}
          />
        </>
      );
    }
  }
}
