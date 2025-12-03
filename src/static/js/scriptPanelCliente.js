function mostrarHabitaciones() {
    document.getElementById('listadoHabitaciones').style.display = 'block'; 
    document.getElementById('historial').style.display = 'none'; 
    document.getElementById('perfil').style.display = 'none'; 
}

function mostrarReservas() {
    document.getElementById('listadoHabitaciones').style.display = 'none'; 
    document.getElementById('historial').style.display = 'block'; 
    document.getElementById('perfil').style.display = 'none'; 
}

function mostrarPerfil() {
    document.getElementById('listadoHabitaciones').style.display = 'none'; 
    document.getElementById('historial').style.display = 'none'; 
    document.getElementById('perfil').style.display = 'block'; 
}