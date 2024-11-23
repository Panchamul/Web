// Example of a simple cart implementation in JavaScript

let cart = [];

// Function to add an item to the cart
function addToCart(productName, price) {
    const product = cart.find(p => p.name === productName);
    if (product) {
        product.quantity++;
    } else {
        cart.push({name: productName, price: price, quantity: 1});
    }
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    const productIndex = cart.findIndex(p => p.name === productName);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
    }
    updateCartDisplay();
}

// Function to update the cart display on the page
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear current cart items
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.name);
        itemElement.appendChild(removeButton);
        cartItems.appendChild(itemElement);
    });
}

// Function to handle checkout
function checkout() {
    if (cart.length > 0) {
        alert('Checkout complete!');
        cart = []; // Empty the cart
        updateCartDisplay();
    } else {
        alert('Your cart is empty.');
    }
}

// Event listeners for form submissions or page interactions
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseFloat(button.getAttribute('data-product-price'));
            addToCart(productName, productPrice);
        });
    });
});



// Ejemplo: Cambiar la imagen de fondo cada pocos segundos (opcional)
const heroSection = document.querySelector('.hero');
const images = ['img/img8.webp', 'img/cl1.jpg', 'img/cl2.jpg']; // Añade tus imágenes aquí
let currentIndex = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  heroSection.style.backgroundImage = `url(${images[currentIndex]})`;
}, 5000); // Cambia cada 5 segundos

//programación del video
const playButton = document.querySelector('.play-button');
const video = document.querySelector('.video-wrapper video');

playButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playButton.style.display = 'none'; // Oculta el botón cuando el video se está reproduciendo
  } else {
    video.pause();
    playButton.style.display = 'flex';
  }
});