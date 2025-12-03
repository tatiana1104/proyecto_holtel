function generarFactura(reservaId) {
    fetch(`/api/factura/${reservaId}`)
        .then(response => response.json())
        .then(factura => {
            // Aquí puedes mostrar la factura en un modal o en una nueva sección
            console.log('Factura generada:', factura);
            // Ejemplo de cómo mostrar la factura
            alert(`Factura generada:\nNombre: ${factura.nombre} ${factura.apellido}\nNúmero de Habitación: ${factura.numero_habitacion}\nValor Total: $${factura.valor_total}\nMétodo de Pago: ${factura.metodo_pago}\nFecha de Factura: ${factura.fecha_factura}`);
        })
        .catch(error => console.error('Error al generar factura:', error));
}