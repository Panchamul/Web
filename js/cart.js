document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos
    const baseDeDatos = [
        { id: 1, nombre: 'Collar de corazón', precio: 2.5 },
        { id: 2, nombre: 'Alimento para perro', precio: 5.0 },
        { id: 3, nombre: 'Muñeca', precio: 3.0 },
        { id: 4, nombre: 'Microondas', precio: 50.0 },
        { id: 5, nombre: 'Shorts', precio: 2.0 },
        { id: 6, nombre: 'Tinte para cabello', precio: 8.0 },
        { id: 7, nombre: 'Zapatos', precio: 15.0 },
        { id: 8, nombre: 'Camisa', precio: 6.0 }
    ];

    // Recuperar carrito desde LocalStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const divisa = '€';

    // Elementos comunes entre ambas páginas
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonPagar = document.querySelector('#boton-pagar');
    const DOMcarrito = document.querySelector('#carrito'); // Para products.html
    const DOMcartItems = document.querySelector('#cart-items'); // Para cart.html

    // Elementos exclusivos de products.html
    const DOMtoggleCart = document.querySelector('#toggle-cart');
    const DOMcartContainer = document.querySelector('#cart-container');
    const botonesAgregar = document.querySelectorAll('#agregar');

    // Mostrar/ocultar carrito (solo en products.html)
    if (DOMtoggleCart && DOMcartContainer) {
        DOMtoggleCart.addEventListener('click', () => {
            if (DOMcartContainer.style.display === 'none') {
                DOMcartContainer.style.display = 'block';
                DOMtoggleCart.textContent = 'Ocultar Carrito';
            } else {
                DOMcartContainer.style.display = 'none';
                DOMtoggleCart.textContent = 'Mostrar Carrito';
            }
        });
    }

    // Función para agregar producto al carrito
    function anyadirProductoAlCarrito(idProducto) {
        const producto = baseDeDatos.find((item) => item.id === idProducto);
        if (producto) {
            carrito.push({ ...producto, cantidad: 1 });
            guardarCarritoEnLocalStorage();
            renderizarCarrito();
        }
    }

    // Función para renderizar el carrito (diferente para cada página)
    function renderizarCarrito() {
        if (DOMcarrito) {
            // products.html: Lista simple
            DOMcarrito.textContent = '';
            const carritoSinDuplicados = [...new Set(carrito.map((p) => p.id))];
            carritoSinDuplicados.forEach((id) => {
                const producto = carrito.find((p) => p.id === id);
                const numeroUnidades = carrito.filter((p) => p.id === id).length;

                const nodo = document.createElement('li');
                nodo.textContent = `${numeroUnidades} x ${producto.nombre} - ${producto.precio}${divisa}`;
                nodo.classList.add('list-group-item');

                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'X';
                botonEliminar.classList.add('btn', 'btn-danger');
                botonEliminar.addEventListener('click', () => borrarItemCarrito(producto.id));

                nodo.appendChild(botonEliminar);
                DOMcarrito.appendChild(nodo);
            });
        }

        if (DOMcartItems) {
            // cart.html: Tabla
            DOMcartItems.innerHTML = '';
            carrito.forEach((item, index) => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = item.nombre;
                row.appendChild(nameCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = `$${item.precio.toFixed(2)}`;
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.value = item.cantidad;
                quantityInput.min = 1;
                quantityInput.addEventListener('change', () => updateQuantity(index, quantityInput.value));
                quantityCell.appendChild(quantityInput);
                row.appendChild(quantityCell);

                const totalCell = document.createElement('td');
                totalCell.textContent = `$${(item.precio * item.cantidad).toFixed(2)}`;
                row.appendChild(totalCell);

                const removeCell = document.createElement('td');
                const removeButton = document.createElement('button');
                removeButton.textContent = 'X';
                removeButton.classList.add('btn', 'btn-danger');
                removeButton.addEventListener('click', () => borrarItemCarrito(item.id));
                removeCell.appendChild(removeButton);
                row.appendChild(removeCell);

                DOMcartItems.appendChild(row);
            });
        }

        updateTotal();
    }

    // Función para actualizar cantidad
    function updateQuantity(index, quantity) {
        carrito[index].cantidad = parseInt(quantity, 10);
        guardarCarritoEnLocalStorage();
        renderizarCarrito();
    }

    // Función para borrar un elemento del carrito
    function borrarItemCarrito(idProducto) {
        carrito = carrito.filter((producto) => producto.id !== idProducto);
        guardarCarritoEnLocalStorage();
        renderizarCarrito();
    }

    // Función para calcular el total
    function updateTotal() {
        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        if (DOMtotal) {
            DOMtotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Guardar carrito en LocalStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Vaciar carrito
    if (DOMbotonVaciar) {
        DOMbotonVaciar.addEventListener('click', () => {
            alert('Los productos se han eliminado');
            carrito = [];
            guardarCarritoEnLocalStorage();
            renderizarCarrito();
        });
    }

    // Pagar con PayPal
    if (DOMbotonPagar) {
        DOMbotonPagar.addEventListener('click', () => {
            const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
            if (total > 0) {
                const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=TU_CORREO@EJEMPLO.COM&currency_code=EUR&amount=${total}&item_name=Carrito%20de%20compras`;
                window.location.href = paypalURL;
            } else {
                alert('El carrito está vacío.');
            }
        });
    }

    // Asignar eventos a los botones de agregar (solo en products.html)
    if (botonesAgregar) {
        botonesAgregar.forEach((boton, index) => {
            boton.addEventListener('click', () => {
                anyadirProductoAlCarrito(index + 1);
            });
        });
    }

    // Inicializar
    renderizarCarrito();
});

/*Section added by davidorellanap 11/Nov/2024*/
// Botón de menú hamburguesa
document.getElementById("menu-toggle").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("visible");
  });