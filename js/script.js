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