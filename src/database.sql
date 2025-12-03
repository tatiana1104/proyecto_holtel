-- Crear la base de datos y usarla
CREATE DATABASE hotel;
USE hotel;

-- Crear la tabla usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    numero_documento VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    rol ENUM('cliente', 'empleado', 'administrador') NOT NULL
);

-- Insertar datos en la tabla usuarios
INSERT INTO usuarios (nombre, apellido, numero_documento, fecha_nacimiento, telefono, correo, contrasena, rol) VALUES
('Juan', 'Pérez', '12345678', '1990-01-15', '5551234567', 'juan.perez@example.com', 'contrasena123', 'cliente'),
('María', 'Gómez', '87654321', '1985-05-20', '5557654321', 'maria.gomez@example.com', 'contrasena123', 'empleado'),
('Carlos', 'López', '11223344', '1980-10-30', '5559876543', 'carlos.lopez@example.com', 'contrasena123', 'administrador'),
('Ana', 'Martínez', '44332211', '1995-03-25', '5556543210', 'ana.martinez@example.com', 'contrasena123', 'cliente'),
('Luis', 'Fernández', '55667788', '1992-07-12', '5553216549', 'luis.fernandez@example.com', 'contrasena123', 'empleado'),
('Sofía', 'Ramírez', '99887766', '1988-12-05', '5559871234', 'sofia.ramirez@example.com', 'contrasena123', 'administrador');

-- Crear la tabla habitaciones
CREATE TABLE habitaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255) 
);

-- Insertar datos en la tabla habitaciones
INSERT INTO habitaciones (numero, tipo, descripcion, precio, estado, imagen) VALUES
('101', 'Individual', 'Habitación espaciosa con vista al mar.', 150.00,'Disponible', 'img/habitaciones/imagen1.jpg'),
('102', 'Doble', 'Habitación cómoda y acogedora.', 100.00, 'Disponible', 'img/habitaciones/imagen2.jpg'),
('103', 'Suite', 'Suite de lujo con todas las comodidades.', 300.00, 'Disponible', 'img/habitaciones/imagen3.jpg'),
('104', 'Familiar', 'Capacidad máxima para 7 personas. Conformada de tres camas matrimoniales con una cama sencilla', 500.00, 'Disponible', 'img/habitaciones/image4.jpg');
('201', 'Individual', 'Habitación espaciosa con vista al mar.', 200.00,'Disponible', 'img/habitaciones/imagen1.jpg'),
('202', 'Doble', 'Habitación cómoda y acogedora.', 150.00, 'Disponible', 'img/habitaciones/imagen2.jpg'),
('203', 'Suite', 'Suite de lujo con todas las comodidades.', 350.00, 'Disponible', 'img/habitaciones/imagen3.jpg'),
('204', 'Familiar', 'Capacidad máxima para 7 personas. Conformada de tres camas matrimoniales con una cama sencilla', 550.00, 'Disponible', 'img/habitaciones/image4.jpg');


-- Crear la tabla reservas
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    habitacion_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    valor_dia DECIMAL(10, 2) NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES usuarios(id),
    FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id)
);

-- Crear la función calcular_valor_total
DELIMITER //

CREATE FUNCTION calcular_valor_total(fecha_inicio DATE, fecha_fin DATE, habitacion_id INT)
RETURNS DECIMAL(10, 2)
BEGIN
    DECLARE valor_total DECIMAL(10, 2);
    DECLARE precio_habitacion DECIMAL(10, 2);

    -- Obtener el precio de la habitación
    SELECT precio INTO precio_habitacion FROM habitaciones WHERE id = habitacion_id;

    -- Calcular el valor total
    SET valor_total = (DATEDIFF(fecha_fin, fecha_inicio) + 1) * precio_habitacion;

    RETURN valor_total;
END//

DELIMITER ;

-- Crear la función obtener_valor_dia
DELIMITER //

CREATE FUNCTION obtener_valor_dia(habitacion_id INT)
RETURNS DECIMAL(10, 2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE precio_habitacion DECIMAL(10, 2);

    -- Obtener el precio de la habitación
    SELECT precio INTO precio_habitacion
    FROM habitaciones
    WHERE id = habitacion_id;

    -- Devolver el precio de la habitación
    RETURN precio_habitacion;
END//

DELIMITER ;

-- Insertar datos en la tabla reservas
INSERT INTO reservas (cliente_id, habitacion_id, fecha_inicio, fecha_fin, valor_dia, valor_total, metodo_pago)
VALUES
    (1, 1, '2023-10-01', '2023-10-05', obtener_valor_dia(1), calcular_valor_total('2023-10-01', '2023-10-05', 1), 'Tarjeta de crédito'),
    (2, 2, '2023-10-10', '2023-10-15', obtener_valor_dia(2), calcular_valor_total('2023-10-10', '2023-10-15', 2), 'Efectivo'),
    (3, 3, '2023-10-20', '2023-10-25', obtener_valor_dia(3), calcular_valor_total('2023-10-20', '2023-10-25', 3), 'Transferencia bancaria'),
    (4, 1, '2023-11-01', '2023-11-03', obtener_valor_dia(1), calcular_valor_total('2023-11-01', '2023-11-03', 1), 'Efectivo'),
    (5, 2, '2023-11-05', '2023-11-10', obtener_valor_dia(2), calcular_valor_total('2023-11-05', '2023-11-10', 2), 'Tarjeta de crédito'),
    (6, 3, '2023-11-15', '2023-11-20', obtener_valor_dia(3), calcular_valor_total('2023-11-15', '2023-11-20', 3), 'Transferencia bancaria');

