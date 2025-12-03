from flask import render_template, request, jsonify
from config.config import get_db_connection

#------------------INICIO LISTAR USUARIOS------------------
def listar_usuarios():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Usar diccionario para obtener resultados
    cursor.execute("SELECT * FROM usuarios")  # Obtener todos los usuarios
    usuarios = cursor.fetchall()
    cursor.close()
    conn.close()

    return usuarios  # Devuelve la lista de usuarios
#------------------FIN LISTAR USUARIOS------------------

#------------------INICIO CREAR USUARIOS------------------
def crear_usuario():
    data = request.form
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    numero_documento = data.get('numero_documento')
    fecha_nacimiento = data.get('fecha_nacimiento')
    telefono = data.get('telefono')
    correo = data.get('correo')
    contrasena = data.get('contrasena')
    rol = data.get('rol')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO usuarios (nombre, apellido, numero_documento, fecha_nacimiento, telefono, correo, contrasena, rol) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                       (nombre, apellido, numero_documento, fecha_nacimiento, telefono, correo, contrasena, rol))
        conn.commit()
        return jsonify({'message': 'Usuario creado con éxito'}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({' message': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
#------------------FIN CREAR USUARIOS------------------

#------------------INICIO ACTUALIZAR USUARIOS------------------
def actualizar_usuario(id):
    data = request.form
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    numero_documento = data.get('numero_documento')
    fecha_nacimiento = data.get('fecha_nacimiento')
    telefono = data.get('telefono')
    correo = data.get('correo')
    rol = data.get('rol')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            UPDATE usuarios
            SET nombre = %s, apellido = %s, numero_documento = %s, fecha_nacimiento = %s,
                telefono = %s, correo = %s, rol = %s
            WHERE id = %s
        """, (nombre, apellido, numero_documento, fecha_nacimiento, telefono, correo, rol, id))
        
        conn.commit()
        return jsonify({'message': 'Usuario actualizado con éxito'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'message': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
#------------------FIN ACTUALIZAR USUARIOS------------------

#------------------INICIO ELIMINAR USUARIO------------------
def eliminar_usuario(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM usuarios WHERE id = %s", (id,))
        conn.commit()
        return jsonify({'message': 'Usuario eliminado con éxito'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'message': str(e)}), 500
    finally:
        cursor.close()
        conn.close()
#------------------FIN ELIMINAR USUARIOS------------------

#------------------INICIO BUSCAR USUARIOS------------------
def buscar_usuarios():
    documento = request.args.get('documento')
    rol = request.args.get('rol')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM usuarios WHERE 1=1"
    params = []

    if documento:
        query += " AND numero_documento LIKE %s"
        params.append(f"%{documento}%")
    if rol:
        query += " AND rol = %s"
        params.append(rol)

    cursor.execute(query, params)
    usuarios = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(usuarios)
