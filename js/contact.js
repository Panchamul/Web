// Función para manejar el envío del formulario
function sendMessage(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById('contact_nom').value.trim();
    const email = document.getElementById('contact_email').value.trim();
    const asunto = document.getElementById('contact_sujet').value.trim();
    const mensaje = document.getElementById('contact_message').value.trim();

    // Verificar que todos los campos estén completos
    if (nombre && email && asunto && mensaje) {
        alert('Mensaje enviado con éxito. ¡Nos pondremos en contacto contigo pronto!');
        document.getElementById('contact-form').reset(); // Limpia el formulario
    } else {
        alert('Por favor, completa todos los campos antes de enviar.');
    }
}

/*Section added by davidorellanap 11/Nov/2024*/
// Botón de menú hamburguesa
document.getElementById("menu-toggle").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("visible");
  });