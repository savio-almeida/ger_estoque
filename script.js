function validarProduto(idNomeProduto, idQtidadeProduto, idPreco) {
    let nome = document.getElementById(idNomeProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;
    let preco = document.getElementById(idPreco).value;

    if (nome === "") {
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    } else if (qtidade === "" || isNaN(qtidade)) {
        alert("Quantidade inválida. Favor preencher com um valor numérico.");
    } else if (preco === "" || isNaN(preco)) {
        alert("Preço inválido. Favor preencher com um valor numérico.");
    } else {
        cadastrarProduto(nome, parseInt(qtidade), parseFloat(preco));
    }
}

function cadastrarProduto(produto, qtidade, preco) {
    let novoProduto = { nome: produto, quantidade: qtidade, preco: preco };

    if (typeof Storage !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = [];
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        alert("Foram cadastradas com sucesso " + qtidade + " unidades do produto " + produto + "!");
        atualizarTotalEstoque("totalEstoque");
        carregarProdutos();
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}

function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque", parseInt(document.getElementById(idCampo).innerHTML) + 1);
}

function carregarProdutos() {
    const estoqueListaDiv = document.getElementById('estoque-lista');
    if (typeof Storage !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null || produtos === "undefined") {
            estoqueListaDiv.innerHTML = "<h3>Ainda não há nenhum item no estoque</h3>";
        } else {
            produtos = JSON.parse(produtos);
            estoqueListaDiv.innerHTML = ''; // Limpa a lista antes de atualizar
            produtos.forEach((produto, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'estoque-item';

                const produtoDetails = document.createElement('div');
                produtoDetails.className = 'produto-details';
                produtoDetails.innerHTML = `
                    <p><strong>Nome do produto:</strong> ${produto.nome}</p>
                    <p><strong>Quantidade do produto:</strong> ${produto.quantidade}</p>
                    <p><strong>Preço:</strong> ${produto.preco}</p>
                `;

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                deleteButton.innerHTML = '<i class="fas fa-times"></i>';
                deleteButton.addEventListener('click', () => {
                    produtos.splice(index, 1);
                    localStorage.setItem('produtos', JSON.stringify(produtos));
                    carregarProdutos(); // Recarrega a lista de produtos após remoção
                });

                itemDiv.appendChild(produtoDetails);
                itemDiv.appendChild(deleteButton);
                estoqueListaDiv.appendChild(itemDiv);
            });
        }
    } else {
        estoqueListaDiv.innerHTML = "<p>A versão do seu navegador é muito antiga. Não é possível visualizar o estoque.</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
});

// ... (código anterior) ...

function redirectToListaEstoque() {
    window.location.href = "verEstoque/estoque.html";
}

function retornarParaIndex() {
    window.location.href = "../index.html"; // Substitua com o caminho correto para a página index
}
