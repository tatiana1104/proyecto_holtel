// scriptGrafica.js
function initializeChart(usuariosPorRol, habitacionesPorTipo, habitacionesPorPiso, habitacionesPorMetodoPago, habitacionesReservadasAlMes, habitacionesDisponibles, habitacionesOcupadas, habitacionesEnMantenimiento) {

    //-----------INICIO GRAFICO 1-----------
    const ctx1 = document.getElementById('usuariosPorRol').getContext('2d');

    const data1 = {
        labels: Object.keys(usuariosPorRol), // Obtener los roles como etiquetas
        datasets: [{
            label: 'Cantidad de Usuarios',
            data: Object.values(usuariosPorRol), // Obtener las cantidades como datos
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };

    const myChart1 = new Chart(ctx1, {
        type: 'bar', // Tipo de gráfica (puede ser 'bar', 'line', etc.)
        data: data1,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //-----------FIN GRAFICO 1-----------

    //-----------INICIO GRAFICO 2-----------
    const ctx2 = document.getElementById('habitacionesPorTipo').getContext('2d');

    const data2 = {
        labels: habitacionesPorTipo.map(h => h.tipo), // Obtener los tipos como etiquetas
        datasets: [{
            label: 'Cantidad de Habitaciones por Tipo',
            data: habitacionesPorTipo.map(h => h.cantidad), // Obtener las cantidades como datos
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const myChart2 = new Chart(ctx2, {
        type: 'bar', // Tipo de gráfica (puede ser 'bar', 'line', etc.)
        data: data2,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //-----------FIN GRAFICO 2-----------

    //-----------INICIO GRAFICO 3-----------
    const ctx3 = document.getElementById('habitacionesPorPiso').getContext('2d');

    const data3 = {
        labels: habitacionesPorPiso.map(h => h.piso), // Obtener los pisos como etiquetas
        datasets: [{
            label: 'Cantidad de Habitaciones por Piso',
            data: habitacionesPorPiso.map(h => h.cantidad), // Obtener las cantidades como datos
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const myChart3 = new Chart(ctx3, {
        type: 'bar', // Tipo de gráfica (puede ser 'bar', 'line', etc.)
        data: data3,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //-----------FIN GRAFICO 3-----------

    //-----------INICIO GRAFICO 4-----------
    const ctx4 = document.getElementById('habitacionesPorMetodoPago').getContext('2d');

    const data4 = {
        labels: habitacionesPorMetodoPago.map(h => h.metodo_pago), // Obtener los métodos de pago como etiquetas
        datasets: [{
            label: 'Cantidad de Habitaciones por Método de Pago',
            data: habitacionesPorMetodoPago.map(h => h.cantidad), // Obtener las cantidades como datos
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const myChart4 = new Chart(ctx4, {
        type: 'bar', // Tipo de gráfica (puede ser 'bar', 'line', etc.)
        data: data4,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //-----------FIN GRAFICO 4-----------

    //-----------INICIO GRAFICO 5-----------
    const ctx5 = document.getElementById('habitacionesReservadasAlMes').getContext('2d');

    const data5 = {
        labels: habitacionesReservadasAlMes.map(h => h.mes), // Obtener los meses como etiquetas
        datasets: [{
            label: 'Habitaciones Reservadas al Mes',
            data: habitacionesReservadasAlMes.map(h => h.cantidad), // Obtener las cantidades como datos
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const myChart5 = new Chart(ctx5, {
        type: 'bar', // Tipo de gráfica (puede ser 'bar', 'line', etc.)
        data: data5,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //-----------FIN GRAFICO 5-----------

    //-----------INICIO GRAFICO 6-----------
    const ctxHabitaciones = document.getElementById('habitacionesEstado').getContext('2d');
    const habitacionesEstadoChart = new Chart(ctxHabitaciones, {
        type: 'doughnut', // Puedes cambiar a 'pie' si prefieres
        data: {
            labels: ['Disponibles', 'Ocupadas', 'En Mantenimiento'],
            datasets: [{
                label: 'Estado de las Habitaciones',
                data: [
                    habitacionesDisponibles.cantidad,
                    habitacionesOcupadas.cantidad,
                    habitacionesEnMantenimiento.cantidad
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Verde para disponibles
                    'rgba(255, 99, 132, 0.2)', // Rojo para ocupadas
                    'rgba(255, 206, 86, 0.2)'  // Amarillo para mantenimiento
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Estado de las Habitaciones'
                }
            }
        }
    });
    //-----------FIN GRAFICO 6-----------

}