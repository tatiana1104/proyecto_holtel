function updateClock() {
    // Obtener los elementos del DOM
    const hh = document.getElementById('hh');
    const mm = document.getElementById('mm');
    const ss = document.getElementById('ss');
    const sec_dot = document.querySelector('.sec_dot');
    const min_dot = document.querySelector('.min_dot');
    const hr_dot = document.querySelector('.hr_dot');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    const ampm = document.getElementById('ampm');
  
    // Obtener la hora actual
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
  
    // Determinar AM o PM
    const am = h >= 12 ? 'PM' : 'AM';
  
    // Convertir a formato de 12 horas
    h = h % 12 || 12; // Si es 0, mostrar 12
  
    // Agregar cero antes de números de un solo dígito
    h = h.toString().padStart(2, '0');
    m = m.toString().padStart(2, '0');
    s = s.toString().padStart(2, '0');
  
    // Actualizar el contenido de los elementos
    hours.textContent = h;
    minutes.textContent = m;
    seconds.textContent = s;
    ampm.textContent = am;
  
    // Calcular los ángulos de rotación
    const secondsAngle = s * 6; // 360 / 60 = 6 grados por segundo
    const minutesAngle = m * 6 + s * 0.1; // 6 grados por minuto + ajuste por segundos
    const hoursAngle = (parseInt(h) % 12) * 30 + m * 0.5; // 30 grados por hora + ajuste por minutos
  
    // Actualizar las manecillas del reloj
    ss.style.strokeDashoffset = 760 - (760 * s) / 60; // 60 segundos
    mm.style.strokeDashoffset = 630 - (630 * m) / 60; // 60 minutos
    hh.style.strokeDashoffset = 510 - (510 * (parseInt(h) % 12)) / 12; // 12 horas
  
    // Rotar los puntos
    sec_dot.style.transform = `rotateZ(${secondsAngle}deg)`;
    min_dot.style.transform = `rotateZ(${minutesAngle}deg)`;
    hr_dot.style.transform = `rotateZ(${hoursAngle}deg)`;
  }
  
  // Llamada inicial para establecer el reloj inmediatamente
  updateClock();
  
  // Actualizar el reloj cada segundo
  setInterval(updateClock, 1000);
  