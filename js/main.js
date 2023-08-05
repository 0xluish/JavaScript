// Productos
let products = [];

// Obtener el carrito desde el storage o crear uno vacío
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Cargar los productos en las cards
  fetchProducts();

  // Evento click en los botones "Agregar al carrito"
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
      addToCart(event.target.getAttribute("data-id"));
    }
  });

  // Evento click en el botón "Vaciar carrito"
  const emptyCartButton = document.getElementById("empty-cart");
  emptyCartButton.addEventListener("click", () => {
    emptyCart();
  });

  // Mostrar los productos en el carrito al cargar la página
  updateCartItems();
});

// Cargar los productos desde el archivo JSON
async function fetchProducts() {
  try {
    const response = await fetch('../js/products.json'); // Ruta relativa al archivo products.json
    if (!response.ok) {
      throw new Error('Error al cargar los productos. Código de respuesta: ' + response.status);
    }
    const data = await response.json(); // Parsear la respuesta JSON
    products = data; // Asignar los productos obtenidos a la variable global 'products'
    displayProducts(products); // Mostrar los productos en las cards
    updateCartItems(); // Actualizar el carrito después de cargar los productos
  } catch (error) {
    console.error('Error al cargar los productos: ', error.message);
  }
}

// Mostrar los productos en las cards
function displayProducts(products) {
  const cardsContainer = document.querySelector(".cards");
  const html = products
    .map((product) => `
      <div class="card" id="card${product.id}">
        <img src="../img/productos/${product.imagePath}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
      </div>
    `)
    .join("");

  cardsContainer.innerHTML = html;
}

// Agregar producto al carrito
function addToCart(productId) {
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

// Vaciar el carrito
function emptyCart() {
  cart = []; // Vaciar el carrito (creando un nuevo array vacío)
  localStorage.removeItem("cart"); // Eliminar el carrito del storage
  updateCartItems(); // Actualizar la lista de productos en el carrito (se mostrará vacío)
}

// Actualizar la lista de productos en el carrito
function updateCartItems() {
  const cartItemsList = document.getElementById("cart-items");
  const html = cart
    .map((product) => `<li>${product.name} - $${product.price}</li>`)
    .join("");

  cartItemsList.innerHTML = html;

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  const totalElement = document.getElementById("total-price");
  totalElement.textContent = `$${totalPrice}`;
}