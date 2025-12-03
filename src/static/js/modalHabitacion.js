// Función para abrir el modal de agregar habitación
function openAddRoomModal() {
    document.getElementById('addRoomModal').style.display = 'block'; // Asegúrate de que el ID sea correcto
}

// Función para cerrar el modal de agregar habitación
function closeAddRoomModal() {
    document.getElementById('addRoomModal').style.display = 'none'; // Asegúrate de que el ID sea correcto
}

// Manejar el envío del formulario de modificación
// Función para agregar habitación
document.getElementById('addRoomForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const formData = new FormData(this); // Obtener los datos del formulario

    fetch('/api/habitaciones', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            alert('Habitación creada con éxito');
            closeAddRoomModal(); // Cerrar el modal después de crear la habitación
            actualizarTablaHabitaciones(); // Actualizar la tabla de habitaciones
            mostrarHabitaciones(); // Asegurarse de que la tabla de habitaciones esté visible
        } else {
            alert('Error al crear la habitación');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error en la conexión');
    });
});

///Llenar el Modal con la Información
function openEditRoomModal(id, numero, tipo, precio, estado, descripcion) {
    //console.log("Tipo:", tipo, "Estado:", estado); 
    document.getElementById('editRoomId').value = id; 
    document.getElementById('editNumero').value = numero; 
    document.getElementById('editPrecio').value = precio; 
    document.getElementById('editDescripcion').value = descripcion; 

    document.getElementById('editTipo').value = tipo; // Prueba con un valor estático
    document.getElementById('editEstado').value = estado;
    // Mostrar el modal
    document.getElementById('editRoomModal').style.display = 'block';
}

function closeEditRoomModal() {
    document.getElementById('editRoomModal').style.display = 'none';
}

//Manejar el Envío del Formulario
document.getElementById('editRoomForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const formData = new FormData(this); // Obtener los datos del formulario

    const roomId = document.getElementById('editRoomId').value; // Obtener el ID de la habitación
    fetch(`/api/habitaciones/${roomId}`, { // Cambiar 'rooms' por 'habitaciones'
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Información de la habitación actualizada con éxito');
            closeEditRoomModal(); // Cerrar el modal
            actualizarTablaHabitaciones(); //actualizar la tabla en tiempo real
            // Aquí puedes agregar código para actualizar la lista de habitaciones en la interfaz
        } else {
            alert('Error al actualizar la habitación');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar actualizar la habitación');
    });
});

///filtrar las habitaciones según los criterios seleccionados
function filterRooms(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const tipo = document.getElementById('searchTipo').value;
    const estado = document.getElementById('searchEstado').value;

    // Realizar una solicitud al servidor para obtener las habitaciones filtradas
    fetch(`/api/habitaciones?tipo=${tipo}&estado=${estado}`)
        .then(response => response.json())
        .then(data => {
            // Actualizar la tabla de habitaciones con los datos filtrados
            const habitacionesTablaCuerpo = document.getElementById('habitacionesTablaCuerpo');
            habitacionesTablaCuerpo.innerHTML = ''; // Limpiar la tabla

            // Agregar el código aquí
            data.forEach(habitacion => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${habitacion.id}</td>
                    <td>${habitacion.numero}</td>
                    <td>${habitacion.tipo}</td> <!-- Asegúrate de que este campo esté presente -->
                    <td>${habitacion.precio}</td> 
                    <td>${habitacion.estado}</td> <!-- Asegúrate de que este campo esté presente -->
                    <td>${habitacion.descripcion}</td>
                    <td><img src="static/${habitacion.imagen}" alt="Imagen de ${habitacion.tipo}" style="width: 100px; height: auto;"></td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditRoomModal(${habitacion.id}, '${habitacion.numero}', '${habitacion.tipo}', ${habitacion.precio}, '${ habitacion.estado}', '${habitacion.descripcion}')">Modificar</button>
                        <button class="btn btn-danger" onclick="confirmDeleteRoom(${habitacion.id})">Eliminar</button>
                    </td>
                `;
                habitacionesTablaCuerpo.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al buscar habitaciones');
        });
}

function confirmDeleteRoom(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta habitación?")) {
        deleteRoom(id);
    }
}

function deleteRoom(id) {
    fetch(`/api/habitaciones/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('Habitación eliminada con éxito');
            actualizarTablaHabitaciones(); // Actualizar la tabla después de eliminar
        } else {
            alert('Error al eliminar la habitación');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error en la conexión');
    });
}

function actualizarTablaHabitaciones() {
    fetch('/api/habitaciones')
        .then(response => response.json())
        .then(data => {
            const habitacionesTablaCuerpo = document.getElementById('habitacionesTablaCuerpo');
            habitacionesTablaCuerpo.innerHTML = ''; // Limpiar la tabla

            data.forEach(habitacion => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${habitacion.id}</td>
                    <td>${habitacion.numero}</td>
                    <td>${habitacion.tipo}</td>
                    <td>${habitacion.precio}</td>
                    <td>${habitacion.estado}</td>
                    <td>${habitacion.descripcion}</td>
                    <td><img src="../static/${habitacion.imagen}) }}" alt="{{ habitacion.tipo }}"  style="width: 100px; height: auto;"></td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditRoom Modal(${habitacion.id}, '${habitacion.numero}', '${habitacion.tipo}', ${habitacion.precio}, '${habitacion.estado}', '${habitacion.descripcion}')">Modificar</button>
                        <button class="btn btn-danger" onclick="confirmDeleteRoom(${habitacion.id})">Eliminar</button>
                    </td>
                `;
                habitacionesTablaCuerpo.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar las habitaciones');
        });
}


