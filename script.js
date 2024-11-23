let cart = [];
let currentIndex = 0;
let autoplayInterval = null;


document.querySelector('.prev-button').addEventListener('click', () => {
   navigate(-1);
});

document.querySelector('.next-button').addEventListener('click', () => {
   navigate(1);
});

function navigate(direction) {
   const galleryContainer = document.querySelector('.gallery-container');
   const totalImages = document.querySelectorAll('.gallery-item').length;

   currentIndex = (currentIndex + direction + totalImages) % totalImages;
   const offset = -currentIndex * 100;

   galleryContainer.style.transform = `translateX(${offset}%)`;
}

function startAutoplay(interval) {
    stopAutoplay(); // Detiene cualquier autoplay anterior para evitar múltiples intervalos.
    autoplayInterval = setInterval(() => {
       navigate(1); // Navega a la siguiente imagen cada intervalo de tiempo.
    }, interval);
 }
 
 function stopAutoplay() {
    clearInterval(autoplayInterval);
 }
 
 // Iniciar autoplay con un intervalo de 3 segundos.
 startAutoplay(3000);
 
 // Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
 document.querySelectorAll('.nav-button').forEach(button => {
     button.addEventListener('click', stopAutoplay);
 });

 function addToCart(product) {
    cart.push(product);
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.innerHTML += ` <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItems.appendChild(listItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
    } else {
        alert("Compra finalizada.");
        cart = [];
        displayCart();
    }
}
