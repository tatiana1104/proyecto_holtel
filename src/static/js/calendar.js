document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const todayBtn = document.getElementById('todayBtn');
    const currentDateElement = document.getElementById('currentDate');
    const viewButtons = document.querySelectorAll('.view-btn');
    const calendarViews = document.querySelectorAll('.calendar-view');
    const reservationsList = document.getElementById('reservationsList');
    const loadingMessage = document.getElementById('loadingMessage');
    const noReservationsMessage = document.getElementById('noReservationsMessage');

    let currentDate = new Date();
    let currentView = 'month';

    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                       'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dayNames = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
    
    function updateCalendarHeader() {
        let headerText = '';
        switch(currentView) {
            case 'year':
                headerText = currentDate.getFullYear();
                break;
            case 'month':
                headerText = `${monthNames[currentDate.getMonth()]} de ${currentDate.getFullYear()}`;
                break;
            case 'week':
                const weekStart = getWeekStart(currentDate);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekEnd.getDate() + 6);
                headerText = `${weekStart.getDate()} – ${weekEnd.getDate()} ${monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
                break;
            case 'day':
                headerText = `${currentDate.getDate()} de ${monthNames[currentDate.getMonth()]} de ${currentDate.getFullYear()}`;
                break;
        }
        currentDateElement.textContent = headerText;
    }
    
    function renderYearView() {
        const yearView = document.getElementById('yearView');
        yearView.innerHTML = '';
        
        const year = currentDate.getFullYear();
        
        for (let month = 0; month < 12; month++) {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'month-container';
            
            const monthTitle = document.createElement('h3');
            monthTitle.textContent = monthNames[month];
            monthDiv.appendChild(monthTitle);
            
            const table = document.createElement('table');
            table.className = 'month-grid';
            
            // Add days header
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            dayNames.forEach(day => {
                const th = document.createElement('th');
                th.textContent = day;
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);
            
            // Add dates
            const tbody = document.createElement('tbody');
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            
            let date = 1;
            for (let i = 0; i < 6; i++) {
                const row = document.createElement('tr');
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
                    if (i === 0 && j < firstDay.getDay() - 1) {
                        cell.className = 'other-month';
                    } else if (date > lastDay.getDate()) {
                        cell.className = 'other-month';
                    } else {
                        cell.textContent = date;
                        if (date === currentDate.getDate() && 
                            month === currentDate.getMonth()) {
                            cell.className = 'selected';
                        }
                        date++;
                    }
                    row.appendChild(cell);
                }
                tbody.appendChild(row);
                if (date > lastDay.getDate()) break;
            }
            
            table.appendChild(tbody);
            monthDiv.appendChild(table);
            yearView.appendChild(monthDiv);
        }
    }
    
    function renderMonthView() {
        const monthView = document.getElementById('monthView');
        monthView.innerHTML = '';
        
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        // Add days header
        const headerRow = document.createElement('tr');
        dayNames.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        
        // Get current month's dates
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        let date = 1;
        let dayOfWeek = firstDay.getDay() || 7;
        
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                
                if (i === 0 && j < dayOfWeek - 1) {
                    const prevMonthLastDay = new Date(year, month, 0);
                    cell.textContent = prevMonthLastDay.getDate() - (dayOfWeek - 2 - j);
                    cell.className = 'other-month';
                } else if (date > lastDay.getDate()) {
                    cell.textContent = date - lastDay.getDate();
                    cell.className = 'other-month';
                    date++;
                } else {
                    cell.textContent = date;
                    if (date === currentDate.getDate()) {
                        cell.className = 'selected';
                    }
                    date++;
                }
                
                row.appendChild(cell);
            }
            
            tbody.appendChild(row);
            if (date > lastDay.getDate()) break;
        }
        
        table.appendChild(thead);
        table.appendChild(tbody);
        monthView.appendChild(table);
    }
    
    function renderWeekView() {
        const weekView = document.getElementById('weekView');
        const timeSlots = weekView.querySelector('.time-slots');
        const weekGrid = weekView.querySelector('.week-grid');
        
        timeSlots.innerHTML = '';
        weekGrid.innerHTML = '';
        
        // Generate time slots
        for (let hour = 6; hour <= 14; hour++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = `${hour.toString().padStart(2, '0')}:00`;
            timeSlots.appendChild(timeSlot);
        }
        
        // Generate week grid
        const weekStart = getWeekStart(currentDate);
        
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(day.getDate() + i);
            
            const column = document.createElement('div');
            column.className = 'week-column';
            
            const header = document.createElement('div');
            header.className = 'week-header';
            header.textContent = `${dayNames[i]} ${day.getDate()}/${day.getMonth() + 1}`;
            column.appendChild(header);
            
            for (let hour = 6; hour <= 14; hour++) {
                const cell = document.createElement('div');
                cell.className = 'week-cell';
                if (day.getDate() === currentDate.getDate()) {
                    cell.className += ' selected';
                }
                column.appendChild(cell);
            }
            
            weekGrid.appendChild(column);
        }
    }
    
    function renderDayView() {
        const dayView = document.getElementById('dayView');
        const dayHeader = dayView.querySelector('.day-header');
        const timeSlots = dayView.querySelector('.time-slots');
        
        dayHeader.textContent = dayNames[currentDate.getDay() - 1];
        
        timeSlots.innerHTML = '';
        
        // Generate time slots
        for (let hour = 6; hour <= 14; hour++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot selected';
            timeSlot.textContent = `${hour.toString().padStart(2, '0')}:00`;
            timeSlots.appendChild(timeSlot);
        }
    }
    
    function getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay() || 7;
        d.setDate(d.getDate() - day + 1);
        return d;
    }
    
    function updateView() {
        calendarViews.forEach(view => view.classList.remove('active'));
        document.getElementById(`${currentView}View`).classList.add('active');
        
        updateCalendarHeader();
        
        switch(currentView) {
            case 'year':
                renderYearView();
                break;
            case 'month':
                renderMonthView();
                break;
            case 'week':
                renderWeekView();
                break;
            case 'day':
                renderDayView();
                break;
        }
    }

    // Inicializar la vista
    updateView();

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        switch(currentView) {
            case 'year':
                currentDate.setFullYear(currentDate.getFullYear() - 1);
                break;
            case 'month':
                currentDate.setMonth(currentDate.getMonth() - 1);
                break;
            case 'week':
                currentDate.setDate(currentDate.getDate() - 7);
                break;
            case 'day':
                currentDate.setDate(currentDate.getDate() - 1);
                break;
        }
        updateView();
    });

    nextBtn.addEventListener('click', () => {
        switch(currentView) {
            case 'year':
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                break;
            case 'month':
                currentDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'week':
                currentDate.setDate(currentDate.getDate() + 7);
                break;
            case 'day':
                currentDate.setDate(currentDate.getDate() + 1);
                break;
        }
        updateView();
    });

    todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        updateView();
    });

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.dataset.view;
            updateView();
        });
    });

    async function updateCalendar() {
        // Actualizar año mostrado
        //currentYearElement.textContent = currentDate.getFullYear();
        
        // Mostrar loading
        loadingMessage.classList.remove('hidden');
        reservationsList.classList.add('hidden');
        noReservationsMessage.classList.add('hidden');

        try {
            // Formatear fecha para la API
            const formattedDate = currentDate.toISOString().split('T')[0];
            
            // Obtener reservas
            const response = await fetch(`http://localhost:5000/api/reservations/${formattedDate}`);
            const reservations = await response.json();

            // Ocultar loading
            loadingMessage.classList.add('hidden');

            if (reservations.length === 0) {
                noReservationsMessage.classList.remove('hidden');
                return;
            }

            // Mostrar reservas
            reservationsList.innerHTML = reservations.map(reservation => `
                <div class="reservation-item">
                    <div class="reservation-title">${reservation.title}</div>
                    <div class="reservation-date">${formatDate(reservation.date)}</div>
                </div>
            `).join('');
            
            reservationsList.classList.remove('hidden');

        } catch (error) {
            console.error('Error:', error);
            loadingMessage.classList.add('hidden');
            noReservationsMessage.textContent = 'Error al cargar las reservas';
            noReservationsMessage.classList.remove('hidden');
        }
    }

    function formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }
    // Initialize
    document.querySelector('[data-view="month"]').classList.add('active');
    updateView();
});