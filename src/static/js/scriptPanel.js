function mostrarUsuarios() {
    document.getElementById('usuarios').style.display = 'block'; // Mostrar sección de usuarios
    document.getElementById('habitaciones').style.display = 'none'; // Oculta la tabla de habitaciones
    document.getElementById('reservas').style.display = 'none'; // Oculta la tabla de habitaciones
    document.getElementById('grafico').style.display = 'none'; // Oculta el gráfico
}

function mostrarHabitaciones() {
    document.getElementById('usuarios').style.display = 'none'; // Asegúrate de que este ID exista
    document.getElementById('habitaciones').style.display = 'block'; // Asegúrate de que este ID exista
    document.getElementById('reservas').style.display = 'none'; // Oculta la tabla de habitaciones
    document.getElementById('grafico').style.display = 'none'; // Asegúrate de que este ID exista
}

function mostrarGrafico() {
    document.getElementById('usuarios').style.display = 'none'; // Oculta la tabla de usuarios
    document.getElementById('habitaciones').style.display = 'none'; // Oculta la tabla de habitaciones
    document.getElementById('reservas').style.display = 'none'; // Oculta la tabla de habitaciones
    document.getElementById('grafico').style.display = 'block'; // Muestra el gráfico
}

function mostrarReservas() {
    document.getElementById('usuarios').style.display = 'none'; // Oculta la tabla de usuarios
    document.getElementById('habitaciones').style.display = 'none'; // Oculta la tabla de habitaciones
    document.getElementById('reservas').style.display = 'block'; // Oculta la tabla de habitaciones
    document.getElementById('grafico').style.display = 'none'; // Muestra el gráfico
}