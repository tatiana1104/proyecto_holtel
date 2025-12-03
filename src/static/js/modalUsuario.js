//================================================
//--------------INICIO CREAR USUARIO--------------
function openModal() {
    document.getElementById('createUser Modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('createUser Modal').style.display = 'none'; // Asegúrate de que el ID sea correcto
}

// Manejar el envío del formulario de modificación
document.getElementById('createUser Form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    const formData = new FormData(this);

    fetch('/api/usuarios', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario creado con éxito');
            closeModal();
            location.reload(); // Recargar la página para ver los cambios
        } else {
            alert('Error al crear el usuario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error en la conexión');
    });
});
//--------------FIN CREAR USUARIO--------------
//=============================================

//====================================================
//--------------INICIO MODIFICAR USUARIO--------------
function openEditModal(id, nombre, apellido, numero_documento, fecha_nacimiento, telefono, correo, rol) {
    document.getElementById('editUser Id').value = id;
    document.getElementById('editNombre').value = nombre;
    document.getElementById('editApellido').value = apellido;
    document.getElementById('editNumeroDocumento').value = numero_documento;
    document.getElementById('editFechaNacimiento').value = fecha_nacimiento;
    document.getElementById('editTelefono').value = telefono;
    document.getElementById('editCorreo').value = correo;
    document.getElementById('editRol').value = rol;

    document.getElementById('editUser Modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('editUser Modal').style.display = 'none';
}

document.getElementById('editUser Form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    const formData = new FormData(this);
    const id = formData.get('id');

    fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                alert('Usuario actualizado con éxito');
                closeEditModal();
                // Aquí puedes agregar código para actualizar la lista de usuarios en la página
                location.reload(); // Recargar la página para ver los cambios
            } else {
                alert('Error al actualizar el usuario');
            }
        })
        .catch(error => console.error('Error:', error));
});
//--------------FIN MODIFICAR USUARIO--------------
//=================================================

//===================================================
//--------------INICIO ELIMINAR USUARIO--------------
function confirmDeleteUser (id) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        deleteUser (id);
    }
}

function deleteUser (id) {
    fetch(`/api/usuarios/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario eliminado con éxito');
            location.reload(); // Recargar la página para ver los cambios
        } else {
            alert('Error al eliminar el usuario');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error en la conexión');
    });
}
//--------------FIN ELIMINAR USUARIO--------------
//================================================

//===================================================
//--------------INICIO BUSCAR--------------
function filterUsers(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const documento = document.getElementById('searchDocumento').value;
    const rol = document.getElementById('searchRol').value;

    // Realizar una solicitud al servidor para obtener los usuarios filtrados
    fetch(`/api/usuarios?documento=${documento}&rol=${rol}`)
        .then(response => response.json())
        .then(data => {
            const usuariosTablaCuerpo = document.getElementById('usuariosTablaCuerpo');
            usuariosTablaCuerpo.innerHTML = ''; // Limpiar la tabla

            // Agregar los usuarios filtrados a la tabla
            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.numero_documento}</td>
                    <td>${usuario.fecha_nacimiento}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.contrasena}</td>
                    <td>${usuario.rol}</td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditModal(${usuario.id}, '${usuario.nombre}', '${usuario.apellido}', '${usuario.numero_documento}', '${usuario.fecha_nacimiento}', '${usuario.telefono}', '${usuario.correo}', '${usuario.rol}')">Modificar</button>
                        <button class="btn btn-danger" onclick="confirmDeleteUser (${usuario.id})">Eliminar</button>
                    </td>
                `;
                usuariosTablaCuerpo.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al buscar usuarios');
        });
}

function actualizarTablaUsuarios() {
    fetch('/api/usuarios')
        .then(response => response.json())
        .then(data => {
            const usuariosTablaCuerpo = document.getElementById('usuariosTablaCuerpo');
            usuariosTablaCuerpo.innerHTML = ''; // Limpiar la tabla

            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.numero_documento}</td>
                    <td>${usuario.fecha_nacimiento}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.contrasena}</td>
                    <td>${usuario.rol}</td>
                    <td>
                        <button class="btn btn-warning" onclick="openEditModal(${usuario.id}, '${usuario.nombre}', '${usuario.apellido}', '${usuario.numero_documento}', '${usuario.fecha_nacimiento}', '${usuario.telefono}', '${usuario.correo}', '${usuario.rol}')">Modificar</button>
                        <button class="btn btn-danger" onclick="confirmDeleteUser (${usuario.id})">Eliminar</button>
                    </td>
                `;
                usuariosTablaCuerpo.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cargar los usuarios');
        });
}