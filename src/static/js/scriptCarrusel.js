document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.querySelector(".carrusel")
    const items = document.querySelectorAll(".carrusel-item")
    const botonIzquierda = document.querySelector(".carrusel-boton-izquierda")
    const botonDerecha = document.querySelector(".carrusel-boton-derecha")
  
    let indiceActual = 0
    const totalItems = items.length
  
    function moverCarrusel(direccion) {
      indiceActual = (indiceActual + direccion + totalItems) % totalItems
      actualizarCarrusel()
    }
  
    function actualizarCarrusel() {
      const desplazamiento = indiceActual * -100
      carrusel.style.transform = `translateX(${desplazamiento}%)`
    }
  
    botonIzquierda.addEventListener("click", () => moverCarrusel(-1))
    botonDerecha.addEventListener("click", () => moverCarrusel(1))
  
    // Movimiento automático
    let intervalo = setInterval(() => moverCarrusel(1), 8000)
  
    // Detener el movimiento automático cuando el mouse está sobre el carrusel
    carrusel.addEventListener("mouseenter", () => clearInterval(intervalo))
    carrusel.addEventListener("mouseleave", () => {
      intervalo = setInterval(() => moverCarrusel(1), 8000)
    })
  
    // Ajustar el carrusel cuando se redimensiona la ventana
    window.addEventListener("resize", actualizarCarrusel)
  })
  
  