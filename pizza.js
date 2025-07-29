const menuToggle = document.getElementById('menuToggle');
const menuLateral = document.getElementById('menuLateral');

menuToggle.addEventListener('click', () => {
  if (menuLateral.style.right === '0px') {
    menuLateral.style.right = '-200px';
  } else {
    menuLateral.style.right = '0px';
  }
});