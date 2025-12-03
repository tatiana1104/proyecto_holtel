import os
from flask import request, jsonify
from config.config import get_db_connection

# Configuración de la carpeta de subida
UPLOAD_FOLDER = 'img/habitaciones'  # Ruta donde se guardarán las imágenes
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


# Función para listar habitaciones
def listar_habitaciones():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM habitaciones")
    habitaciones = cursor.fetchall()
    cursor.close()
    conn.close()
    return habitaciones 

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#CREAR HABITACION
def crear_habitacion():
    data = request.form
    numero = data.get('numero')
    tipo = data.get('tipo')
    precio = data.get('precio')
    estado = data.get('estado')
    descripcion = data.get('descripcion')

    # Manejar la carga de la imagen
    if 'imagen' not in request.files:
        return jsonify({'message': 'No se ha subido ninguna imagen'}), 400

    file = request.files['imagen']

    if file.filename == '':
        return jsonify({'message': 'No se ha seleccionado ninguna imagen'}), 400

    if file and allowed_file(file.filename):
        # Guardar la imagen en el servidor
        filename = file.filename  # Puedes usar un nombre seguro aquí si lo deseas
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)

        # Guardar la URL parcial en la base de datos
        image_url = f"/{UPLOAD_FOLDER}/{filename}"  # URL parcial para la imagen

        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                INSERT INTO habitaciones (numero, tipo, precio, estado, descripcion, imagen)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (numero, tipo, precio, estado, descripcion, image_url))
            conn.commit()
            return jsonify({'message': 'Habitación creada con éxito'}), 201
        except Exception as e:
            conn.rollback()
            print(f"Error al insertar habitación: {e}")  # Imprimir el error en la consola
            return jsonify({'message': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'message': 'Tipo de archivo no permitido'}), 400
    
def actualizar_habitacion(id):
    data = request.form
    numero = data.get('numero')
    tipo = data.get('tipo')
    precio = data.get('precio')
    estado = data.get('estado')
    descripcion = data.get('descripcion')

    # Conexión a la base de datos
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Manejar la carga de la imagen
        image_url = None
        if 'imagen' in request.files:
            file = request.files['imagen']
            if file and allowed_file(file.filename):
                filename = file.filename
                file_path = os.path.join(UPLOAD_FOLDER, filename)
                file.save(file_path)
                image_url = f"/{UPLOAD_FOLDER}/{filename}"  # URL parcial para la imagen

        # Actualizar la información de la habitación
        cursor.execute("""
            UPDATE habitaciones
            SET numero = %s, tipo = %s, precio = %s, estado = %s, descripcion = %s
            """ + (", imagen = %s" if image_url else "") + """
            WHERE id = %s
        """, (numero, tipo, precio, estado, descripcion, image_url, id) if image_url else (numero, tipo, precio, estado, descripcion, id))

        conn.commit()
        return jsonify({'message': 'Habitación actualizada con éxito'}), 200
    except Exception as e:
        conn.rollback()
        print(f"Error al actualizar habitación: {e}")  # Imprimir el error en la consola
        return jsonify({'message': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

#buscar habitaciones
def buscar_habitaciones():
    tipo = request.args.get('tipo')
    estado = request.args.get('estado')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM habitaciones WHERE 1=1"
    params = []

    if tipo:
        query += " AND tipo = %s"
        params.append(tipo)
    if estado:
        query += " AND estado = %s"
        params.append(estado)

    cursor.execute(query, params)
    habitaciones = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(habitaciones)

#ELIMINAR
def eliminar_habitacion(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM habitaciones WHERE id = %s", (id,))
        conn.commit()
        return jsonify({'message': 'Habitación eliminada con éxito'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'message': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
        
#============================================================
#============================================================
#============================================================

def obtener_habitacion(habitacion_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM habitaciones WHERE id = %s", (habitacion_id,))
    habitacion = cursor.fetchone()
    cursor.close()
    conn.close()
    return habitacion
