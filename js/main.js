// Obtener el carrito desde el storage o crear uno vacío
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Cargar los productos en las cards
  fetchProducts();

  // Evento click en los botones "Agregar al carrito"
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Mostrar los productos en el carrito al cargar la página
  updateCartItems();
});

// Cargar los productos desde el archivo JSON
function fetchProducts() {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      displayProducts();
    })
    .catch((error) => console.error("Error fetching products:", error));
}

// Mostrar los productos en las cards
function displayProducts() {
  const cardsContainer = document.querySelector(".cards");
  const html = products
    .map((product) => `
      <div class="card" id="card${product.id}">
        <img src="${product.imagePath}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
      </div>
    `)
    .join("");

  cardsContainer.innerHTML = html;
}

// Agregar producto al carrito
function addToCart(event) {
    const productId = event.target.getAttribute("data-id");
    const product = products.find((p) => p.id.toString() === productId);
    if (product) {
        // Utilizar el operador spread para clonar el carrito y agregar el nuevo producto
        cart = [...cart, product];
        // Guardar el carrito en el storage
        localStorage.setItem("cart", JSON.stringify(cart));
        // Actualizar la lista de productos en el carrito
        updateCartItems();
    }
}

// Actualizar la lista de productos en el carrito
function updateCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    const html = cart
        .map((product) => `<li>${product.name} - Precio: $${product.price}</li>`)
        .join("");

    cartItemsList.innerHTML = html;
}

// Función para crear un elemento de producto
function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product';

    const nameElement = document.createElement('h3');
    nameElement.textContent = product.name;

    const priceElement = document.createElement('p');
    priceElement.textContent = `$${product.price}`;

    productElement.appendChild(nameElement);
    productElement.appendChild(priceElement);

    return productElement;
}

// Almacenar productos en el Storage
localStorage.setItem('products', JSON.stringify(productsData));

// Función para ordenar los productos por precio ascendente
function sortProductsByPriceAsc() {
    const sortedProducts = productsData.slice().sort((a, b) => a.price - b.price);
    renderProducts(sortedProducts);
}

// Función para ordenar los productos por precio descendente
function sortProductsByPriceDesc() {
    const sortedProducts = productsData.slice().sort((a, b) => b.price - a.price);
    renderProducts(sortedProducts);
}

// Función para renderizar los productos en el contenedor
function renderProducts(products) {
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

// Ejemplo de uso: ordenar los productos por precio ascendente al cargar la página
document.addEventListener('DOMContentLoaded', sortProductsByPriceAsc);