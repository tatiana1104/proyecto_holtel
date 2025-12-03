function openReserva(id, tipo, precio, descripcion) {
    console.log("id:", id, "Tipo:", tipo, "precio:", precio, "descripcion:", descripcion); 
    document.getElementById('id_habitacion').value = id;
    document.getElementById('tipo-habitacion').innerHTML = tipo;
    document.getElementById('precio-habitacion').innerHTML = precio;
    document.getElementById('descripcion-habitacion').innerHTML = descripcion;

    // Mostrar el modal
    document.getElementById('reservaModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('reservaModal').style.display = 'none';
}

document.getElementById('reservaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const formData = new FormData(this); // Obtener los datos del formulario

    console.log(formData)

    fetch('/api/reservas', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            alert('Habitación creada con éxito');
            closeModal(); 
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error al crear reserva:', error);
    });
});