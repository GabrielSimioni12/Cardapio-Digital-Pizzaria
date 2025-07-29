let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total');
  lista.innerHTML = '';

  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nome} - ${item.quantidade}x - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <button onclick="aumentar(${index})">+</button>
      <button onclick="diminuir(${index})">-</button>
      <button onclick="remover(${index})">🗑</button>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function aumentar(index) {
  carrinho[index].quantidade++;
  atualizarCarrinho();
}

function diminuir(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade--;
  } else {
    carrinho.splice(index, 1);
  }
  atualizarCarrinho();
}

function remover(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  document.getElementById('modal').classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('modal').classList.add('hidden');
  carrinho = [];
  atualizarCarrinho();
}