// Datos de productos
const productsData = [
    { "id": 1, "name": "Producto 1", "price": 10 },
    { "id": 2, "name": "Producto 2", "price": 20 },
    { "id": 3, "name": "Producto 3", "price": 30 }
];

// Obtener el contenedor de productos
const productsContainer = document.getElementById('products');

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', loadProducts);

// Función para cargar los productos
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || productsData;

    // Limpiar contenedor de productos
    productsContainer.innerHTML = '';

    // Mostrar los productos en el contenedor
    products.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
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

fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const productsData = data;
        // Resto del código que utiliza productsData
    })
    .catch(error => {
        console.log('Error al cargar los datos del archivo JSON:', error);
    });