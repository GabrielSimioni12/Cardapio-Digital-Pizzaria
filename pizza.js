const menuToggle = document.getElementById('menuToggle');
const menuLateral = document.getElementById('menuLateral');

menuToggle.addEventListener('click', () => {
  if (menuLateral.style.right === '0px') {
    menuLateral.style.right = '-200px';
  } else {
    menuLateral.style.right = '0px';
  }
});

const carrinho = [];
const itensCarrinho = document.getElementById('itens-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

// Função para adicionar item
function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  atualizarCarrinho();
}

// Função para remover item
function removerDoCarrinho(nome) {
  const index = carrinho.findIndex(item => item.nome === nome);
  if (index !== -1) {
    carrinho[index].quantidade--;
    if (carrinho[index].quantidade <= 0) {
      carrinho.splice(index, 1);
    }
  }

  atualizarCarrinho();
}

// Atualiza visual do carrinho
function atualizarCarrinho() {
  itensCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <button onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">+</button>
      <button onclick="removerDoCarrinho('${item.nome}')">-</button>
    `;
    itensCarrinho.appendChild(li);

    total += item.preco * item.quantidade;
  });

  totalCarrinho.textContent = total.toFixed(2);
}


// Toggle do carrinho
const btnCarrinho = document.getElementById('abrirCarrinhoBtn');
const carrinhoDiv = document.getElementById('carrinho');

btnCarrinho.addEventListener('click', () => {
  carrinhoDiv.classList.toggle('aberto');
});


// Espera o DOM carregar antes de rodar
document.addEventListener('DOMContentLoaded', function () {
  const botoes = document.querySelectorAll('.hotbar a');
  const secoes = document.querySelectorAll('.secao');

  botoes.forEach(botao => {
    botao.addEventListener('click', function (event) {
      event.preventDefault(); // Evita o scroll padrão

      const id = this.getAttribute('href').replace('#', '');

      // Esconde todas as seções
      secoes.forEach(secao => {
        secao.classList.remove('ativa');
      });

      // Mostra só a clicada
      const secaoAtiva = document.getElementById(id);
      if (secaoAtiva) {
        secaoAtiva.classList.add('ativa');
      }
    });
  });

  // Mostrar a primeira seção por padrão
  document.getElementById('pizzas').classList.add('ativa');
});