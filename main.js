// Productos
let products = [];

// Obtener el carrito desde el storage o crear uno vacío
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Evento al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Cargar los productos en las cards
    fetchProducts();

    // Mostrar los productos en el carrito al cargar la página
    updateCartItems();

    // Evento click en los botones "Agregar al carrito"
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            addToCart(event.target.getAttribute("data-id"));
        }
    });
});

// Cargar los productos desde el archivo JSON
async function fetchProducts() {
    try {
        const response = await fetch("products.json");
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
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

// Actualizar la lista de productos en el carrito
function updateCartItems() {
    const cartItemsList = document.getElementById("cart-items");
    const html = cart
        .map((product) => `<li>${product.name} - Precio: $${product.price}</li>`)
        .join("");

    cartItemsList.innerHTML = html;
}