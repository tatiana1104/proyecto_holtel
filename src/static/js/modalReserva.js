function cargarReservas() {
    fetch('/api/reservas')
        .then(response => response.json())
        .then(data => {
            const reservasTablaCuerpo = document.getElementById('reservasTablaCuerpo');
            reservasTablaCuerpo.innerHTML = ''; // Limpiar la tabla

            data.forEach(reserva => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${reserva.id}</td>
                    <td>${reserva.nombre} ${reserva.apellido}</td>
                    <td>${reserva.numero_habitacion}</td>
                    <td>${reserva.fecha_inicio}</td>
                    <td>${reserva.fecha_fin}</td>
                    <td>$${reserva.valor_día}</td>
                    <td>$${reserva.valor_total}</td>
                    <td>${reserva.metodo_pago}</td>
                    <td><button onclick="generarFactura(${reserva.id})">Generar Factura</button></td>
                `;
                reservasTablaCuerpo.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar reservas:', error));
}
