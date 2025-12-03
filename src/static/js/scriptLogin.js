function showRegisterForm() {
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.register').style.display = 'flex';
    document.querySelector('.box').classList.add('register-visible'); // Agrega la clase para aumentar el tamaño
}

function showLoginForm() {
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.login').style.display = 'flex';
    document.querySelector('.box').classList.remove('register-visible'); // Quita la clase para volver al tamaño original
}
