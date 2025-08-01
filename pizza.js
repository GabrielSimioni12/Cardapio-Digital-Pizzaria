const menuToggle = document.getElementById('menuToggle');
const menuLateral = document.getElementById('menuLateral');

menuToggle.addEventListener('click', () => {
  menuLateral.style.right = menuLateral.style.right === '0px' ? '-200px' : '0px';
});

let carrinho = [];
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

// Adiciona item ao carrinho
function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  atualizarCarrinho();
}

// Remove item do carrinho
function removerDoCarrinho(nome) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1) {
    carrinho[index].quantidade--;
    if (carrinho[index].quantidade <= 0) {
      carrinho.splice(index, 1);
    }
    atualizarCarrinho();
  }
}

// Atualiza o carrinho visualmente
function atualizarCarrinho() {
  itensCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('item-carrinho');
    li.innerHTML = `
      <span>${item.nome} x${item.quantidade} – R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
      <div class="quantidade-container">
        <button class="quantidade-btn remover" data-nome="${item.nome}">-</button>
        <button class="quantidade-btn adicionar" data-nome="${item.nome}" data-preco="${item.preco}">+</button>
      </div>
    `;

    // Eventos dos botões dentro do carrinho
    li.querySelector('.remover').addEventListener('click', (e) => {
      const nome = e.target.dataset.nome;
      removerDoCarrinho(nome);
    });

    li.querySelector('.adicionar').addEventListener('click', (e) => {
      const nome = e.target.dataset.nome;
      const preco = parseFloat(e.target.dataset.preco);
      adicionarAoCarrinho(nome, preco);
    });

    itensCarrinho.appendChild(li);
    total += item.preco * item.quantidade;
  });

  totalCarrinho.textContent = total.toFixed(2);
}

// Abre/fecha o carrinho
const btnCarrinho = document.getElementById('abrirCarrinhoBtn');
const carrinhoDiv = document.getElementById('carrinho');

btnCarrinho.addEventListener('click', () => {
  carrinhoDiv.classList.toggle('aberto');
});

// Hotbar de navegação
document.addEventListener('DOMContentLoaded', function () {
  const botoes = document.querySelectorAll('.hotbar a');
  const secoes = document.querySelectorAll('.secao');

  botoes.forEach(botao => {
    botao.addEventListener('click', function (event) {
      event.preventDefault();
      const id = this.getAttribute('href').replace('#', '');

      secoes.forEach(secao => secao.classList.remove('ativa'));
      const secaoAtiva = document.getElementById(id);
      if (secaoAtiva) secaoAtiva.classList.add('ativa');
    });
  });

  document.getElementById('pizzas').classList.add('ativa'); // Mostra a seção inicial
});

// Finalizar pedido
document.getElementById("finalizarPedido").addEventListener("click", function () {
  const mensagem = document.getElementById("mensagemConfirmacao");
  mensagem.style.display = "block";

  carrinho = [];
  atualizarCarrinho();

  setTimeout(() => {
    mensagem.style.display = "none";
  }, 5000);
});