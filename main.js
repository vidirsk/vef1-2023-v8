import { formatNumber } from './scripts/formatNumber.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

const addToCartForms = document.querySelectorAll('.add')

/** Bæta vöru í körfu */
function addProductToCart(product) {
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart')
    return
  }

  const emptyMessage = cartElement.querySelector('.empty-message')
  const cartContent = cartElement.querySelector('.cart-content')
  
  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element')
    return;
  }

  emptyMessage.classList.add('hidden')
  cartContent.classList.remove('hidden')

  const productElement = document.createElement('div');
  const productTitleElement = document.createElement('strong')
  const productPriceElement = document.createElement('span');
  productPriceElement.textContent = formatNumber(product.price);

  productTitleElement.textContent = product.title;

  productElement.appendChild(productTitleElement)
  productElement.appendChild(productPriceElement);
  cartContent.appendChild(productElement);

}

function submitHandler(event) {
  event.preventDefault();
  
  const parent = event.target.closest('tr')

  const productId = Number.parseInt(parent.dataset.productId);

  const product = products.find((i) => i.id === productId);

  addProductToCart(product);
}

function createAddToCartForm(form) {
  form.addEventListener('submit', submitHandler)
}

for (const form of Array.from(addToCartForms)) {
  createAddToCartForm(form);
}

