// servProd.ts

import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Cliente from "../../modelo/cliente";

export default class ProdutosEServicosMaisConsumidos {
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private clientes: Array<Cliente>;

    constructor(produtos: Array<Produto>, servicos: Array<Servico>, clientes: Array<Cliente>) {
        this.produtos = produtos;
        this.servicos = servicos;
        this.clientes = clientes;
    }

    public listar(): string[] {
        const result: string[] = [];
        const contagemProdutos = new Map<Produto, number>();
        const contagemServicos = new Map<Servico, number>();
        
        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                contagemProdutos.set(produto, (contagemProdutos.get(produto) || 0) + 1);
            });
            cliente.getServicosConsumidos.forEach(servico => {
                contagemServicos.set(servico, (contagemServicos.get(servico) || 0) + 1);
            });
        });

        const arrayContagemProdutos = Array.from(contagemProdutos.entries());
        const arrayContagemServicos = Array.from(contagemServicos.entries());
        arrayContagemProdutos.sort((a, b) => b[1] - a[1]);
        arrayContagemServicos.sort((a, b) => b[1] - a[1]);

        result.push(`\nProdutos mais consumidos:`);
        arrayContagemProdutos.forEach(([produto, contagem]) => {
            result.push(`Produto: ${produto.getNomeProduto()}, Quantidade Consumida: ${contagem}`);
        });

        result.push(`\nServiços mais consumidos:`);
        arrayContagemServicos.forEach(([servico, contagem]) => {
            result.push(`Serviço: ${servico.getNome()}, Quantidade Consumida: ${contagem}`);
        });

        result.push(`--------------------------------------`);

        return result;
    }
}
