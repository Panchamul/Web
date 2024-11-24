document.addEventListener('DOMContentLoaded', () => {
    // Base de datos de productos (extraídos de la página)
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

    // Variables globales
    let carrito = [];
    const divisa = '€';
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonPagar = document.querySelector('#boton-pagar');
    const DOMtoggleCart = document.querySelector('#toggle-cart');
    const DOMcartContainer = document.querySelector('#cart-container');
    const botonesAgregar = document.querySelectorAll('#agregar');

    // Mostrar/ocultar carrito
    DOMtoggleCart.addEventListener('click', () => {
        if (DOMcartContainer.style.display === 'none') {
            DOMcartContainer.style.display = 'block';
            DOMtoggleCart.textContent = 'Ocultar Carrito';
        } else {
            DOMcartContainer.style.display = 'none';
            DOMtoggleCart.textContent = 'Mostrar Carrito';
        }
    });

    // Función para agregar producto al carrito
    function anyadirProductoAlCarrito(idProducto) {
        const producto = baseDeDatos.find((item) => item.id === idProducto);
        if (producto) {
            carrito.push(producto);
            renderizarCarrito();
        }
    }

    // Función para renderizar el carrito
    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const numeroUnidades = carrito.filter((producto) => producto.id === item.id).length;

            // Crear nodo del carrito
            const nodo = document.createElement('li');
            nodo.textContent = `${numeroUnidades} x ${item.nombre} - ${item.precio}${divisa}`;
            nodo.classList.add('list-group-item');

            // Botón para eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'X';
            botonEliminar.classList.add('btn', 'btn-danger');
            botonEliminar.style.marginLeft = '10px';
            botonEliminar.addEventListener('click', () => borrarItemCarrito(item.id));

            // Añadir nodo al carrito
            nodo.appendChild(botonEliminar);
            DOMcarrito.appendChild(nodo);
        });

        // Actualizar total
        DOMtotal.textContent = calcularTotal();
    }

    // Función para calcular el total
    function calcularTotal() {
        return carrito.reduce((total, item) => total + item.precio, 0).toFixed(2);
    }

    // Función para borrar un elemento del carrito
    function borrarItemCarrito(idProducto) {
        carrito = carrito.filter((producto) => producto.id !== idProducto);
        renderizarCarrito();
    }

    // Función para vaciar el carrito
    DOMbotonVaciar.addEventListener('click', () => {
        carrito = [];
        renderizarCarrito();
    });

    // Función para redirigir a PayPal
    DOMbotonPagar.addEventListener('click', () => {
        const total = calcularTotal();
        if (total > 0) {
            const paypalURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=TU_CORREO@EJEMPLO.COM&currency_code=EUR&amount=${total}&item_name=Carrito%20de%20compras`;
            window.location.href = paypalURL;
        } else {
            alert('Tu carrito está vacío.');
        }
    });

    // Asignar eventos a los botones de agregar
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            anyadirProductoAlCarrito(index + 1);
        });
    });
});
