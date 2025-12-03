let currentIndex = 0;
const items = document.querySelectorAll('.carousel-3d-item');
const totalItems = items.length;
let autoPlayInterval;

function updateCarousel() {
  const angle = 360 / totalItems; // Ángulo entre cada elemento
  items.forEach((item, index) => {
      const rotation = (index - currentIndex) * angle; // Rotación en el eje Y
      item.style.transform = `rotateY(${rotation}deg) translateZ(200px)`; // Rotación y traslación
      item.style.transition = 'transform 0.5s ease'; // Añadir transición suave
  });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3000); // Cambia cada 3 segundos
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Eventos para los botones de navegación
document.querySelector('.carousel-3d-next').addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
});

document.querySelector('.carousel-3d-prev').addEventListener('click', () => {
    stopAutoPlay();
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
    startAutoPlay();
});

// Pausar el carrusel cuando el mouse está sobre él
const carouselContainer = document.querySelector('.carousel-3d');
carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

// Inicializar el carrusel
updateCarousel();
startAutoPlay(); // Iniciar el movimiento automático

