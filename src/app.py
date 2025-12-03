# app.py
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import os
import sys
import time


from config.config import get_db_connection
from config.administracion_usuarios import listar_usuarios, crear_usuario, actualizar_usuario, eliminar_usuario, buscar_usuarios
from config.administracion_habitaciones import listar_habitaciones, crear_habitacion, actualizar_habitacion, buscar_habitaciones, eliminar_habitacion, obtener_habitacion
from config.administracion_reservas import listar_reservas, crear_reserva
from config.factura import generar_factura
from config.estadisticas import contar_usuarios_por_rol, contar_habitaciones_por_tipo, contar_habitaciones_por_piso, contar_habitaciones_por_metodo_pago, contar_habitaciones_reservadas_al_mes, contar_habitaciones_disponibles, contar_habitaciones_ocupadas, contar_habitaciones_en_mantenimiento

# Crear la instancia de Flask
app = Flask(__name__)
app.secret_key = 'tu_clave_secreta'

# Función para reiniciar la aplicación
def restart_application():
    """Reinicia la aplicación Flask."""
    python = sys.executable
    os.execl(python, python, *sys.argv)

# Ruta para reiniciar la aplicación
@app.route('/restart')
def restart():
    """Ruta para reiniciar la aplicación."""
    restart_application()
    return "Reiniciando la aplicación..."

#-----------INICIO PAGINA PRINCIPAL-----------
@app.route('/')
def index():
    return render_template('index.html')
#-----------FIN PAGINA PRINCIPAL------------


@app.route('/login', methods=['GET', 'POST'])
def login():
    # Código para la página de inicio de sesión
    return render_template('login.html')

#-----------INICIO CERRAR SECCION-----------
@app.route('/logout')
def logout():
    session.clear()  # Limpia la sesión
    return redirect(url_for('iniciar_sesion'))  # Redirige a la página de inicio de sesión
#-----------FIN CERRAR SECCION------------

#-----------INICIO DE LOGIN-----------
@app.route('/iniciar_sesion', methods=['GET', 'POST'])
def iniciar_sesion():
    if request.method == 'POST':
        correo_usuario = request.form['correo']
        contrasena_usuario = request.form['contrasena']
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE correo = %s AND contrasena = %s", (correo_usuario, contrasena_usuario))
        datos_usuario = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if datos_usuario:
            session['usuario_id'] = datos_usuario['id']
            #print(datos_usuario['id'])
            rol_usuario = datos_usuario['rol']
            #print(datos_usuario['rol'])
            if rol_usuario == 'administrador':
                return redirect(url_for('administrador'))  # Redirigir a la vista de administrador
            elif rol_usuario == 'empleado':
                return redirect(url_for('empleado'))  # Redirigir a la vista de empleado
            elif rol_usuario == 'cliente':
                return redirect(url_for('cliente'))  # Redirigir a la vista de cliente
            else:
                return "Rol no reconocido", 403
        else:
            return "Credenciales incorrectas", 401
        
    return render_template('login.html')

#-----------FIN DE LOGIN-----------

#-----------INICIO DE RESGISTRAR-----------
@app.route('/register', methods=['GET', 'POST'])
def register():
    nombre_usuario = request.form['nombre']
    apellido_usuario = request.form['apellido']
    numero_documento = request.form['numero_documento']
    fecha_nacimiento = request.form['fecha_nacimiento']
    telefono_usuario = request.form['telefono']
    correo_usuario = request.form['correo']
    contrasena_usuario = request.form['contrasena']
    
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO usuarios (nombre, apellido, numero_documento, fecha_nacimiento, telefono, correo, contrasena, rol) VALUES (%s, %s, %s, %s, %s, %s, %s, 'cliente')", 
                   (nombre_usuario, apellido_usuario, numero_documento, fecha_nacimiento, telefono_usuario, correo_usuario, contrasena_usuario))
    conexion.commit()
    cursor.close()
    conexion.close()
    return redirect(url_for('iniciar_sesion'))  # Redirige al inicio de sesión después del registro
#-----------FIN DE REGISTAR-----------

#-----------INICIO DE CLIENTE-----------
@app.route('/cliente')
def cliente():
    habitaciones = listar_habitaciones()
    return render_template('cliente.html', habitaciones=habitaciones)
#-----------FIN DE CLIENTE-----------

#-----------INICIO DE EMPLEADO-----------
@app.route('/empleado')
def empleado():
    # Obtener usuarios
    usuarios = listar_usuarios()

    # Obtener habitaciones
    habitaciones = listar_habitaciones()

    # Obtener reservas
    reservas = listar_reservas()

    return render_template('empleado.html', usuarios=usuarios, habitaciones=habitaciones,
                           reservas=reservas)
#-----------FIN DE EMPLEADO-----------

#-----------INICIO DE ADMINISTRADOR-----------
@app.route('/administrador', methods=['GET'])
def administrador():
    # Obtener usuarios
    usuarios = listar_usuarios()  # Asegúrate de que esta función devuelva la lista de usuarios

    # Obtener habitaciones
    habitaciones = listar_habitaciones()  # Asegúrate de que esta función devuelva la lista de habitaciones

    # Obtener reservas
    reservas = listar_reservas()
        
    # Pasar datos a la plantilla
    return render_template('administrador.html', usuarios=usuarios, habitaciones=habitaciones,
                           reservas=reservas, graficas=url_for('graficas'))  # Asegúrate de que roles_count no sea None
#-----------FIN DE ADMINISTRADOR-----------


#-----------INICIO DE ADMINISTRAR USUARIOS-----------
@app.route('/api/usuarios', methods=['POST'])
def api_crear_usuario():
    return crear_usuario()  # Llama a la función de crear usuario en administracion.py

# Ruta para actualizar un usuario
@app.route('/api/usuarios/<int:id>', methods=['PUT'])
def api_actualizar_usuario(id):
    return actualizar_usuario(id)  # Llama a la función de actualizar usuario en administracion.py

# Ruta para eliminar un usuario
@app.route('/api/usuarios/<int:id>', methods=['DELETE'])
def api_eliminar_usuario(id):
    return eliminar_usuario(id)  # Llama a la función de eliminar usuario en administracion.py

# Ruta para buscar usuarios
@app.route('/api/usuarios', methods=['GET'])
def api_buscar_usuarios():
    return buscar_usuarios()

#-----------FIN DE ADMINISTRAR USUARIOS-----------

#-----------INICIO DE HABITACIONES-----------
@app.route('/api/habitaciones', methods=['POST'])
def api_crear_habitacion():
    return crear_habitacion()  

# Ruta para actualizar una habitación
@app.route('/api/habitaciones/<int:id>', methods=['PUT'])
def api_actualizar_habitacion(id):
    return actualizar_habitacion(id) 

# Ruta para eliminar una habitaciones
@app.route('/api/habitaciones/<int:id>', methods=['DELETE'])
def api_eliminar_habitacion(id):
    return eliminar_habitacion(id)

# Ruta para buscar habitaciones
@app.route('/api/habitaciones', methods=['GET'])
def api_buscar_habitaciones():
    return buscar_habitaciones()

@app.route('/api/habitaciones/<int:habitacion_id>', methods=['GET'])
def obtener_habitacion_api(habitacion_id):
    habitacion = obtener_habitacion(habitacion_id)
    return jsonify(habitacion)
#-----------FIN DE HABITACIONES-----------


#-----------INICIO DE RESERVAS-----------
# Ruta para crear una reserva
@app.route('/api/reservas', methods=['POST'])
def api_reservar():
    return crear_reserva()

# Ruta para actualizar una reserva


# Ruta para eliminar una reserva


# Ruta para buscar reservas


#-----------FIN DE HABITACIONES-----------

#-----------INICIO DE FACTURAS-----------
# Ruta para generar una factura
@app.route('/api/factura/<int:reserva_id>', methods=['GET'])
def api_generar_factura(reserva_id):
    factura = generar_factura(reserva_id)
    return jsonify(factura)
#-----------FIN DE FACTURAS-----------

#-----------INICIO DE GRAFICOS-----------
@app.route('/graficas')
def graficas():
    try:
        # Obtener los datos para las gráficas
        usuarios_por_rol = contar_usuarios_por_rol()
        habitaciones_por_tipo = contar_habitaciones_por_tipo()
        habitaciones_por_piso = contar_habitaciones_por_piso()
        habitaciones_por_metodo_pago = contar_habitaciones_por_metodo_pago()
        habitaciones_reservadas_al_mes = contar_habitaciones_reservadas_al_mes()
        habitaciones_disponibles = contar_habitaciones_disponibles()
        habitaciones_ocupadas = contar_habitaciones_ocupadas()
        habitaciones_en_mantenimiento = contar_habitaciones_en_mantenimiento()

        # Crear un objeto JSON con los datos
        datos = {
            'usuarios_por_rol': usuarios_por_rol,
            'habitaciones_por_tipo': habitaciones_por_tipo,
            'habitaciones_por_piso': habitaciones_por_piso,
            'habitaciones_por_metodo_pago': habitaciones_por_metodo_pago,
            'habitaciones_reservadas_al_mes': habitaciones_reservadas_al_mes,
            'habitaciones_disponibles': habitaciones_disponibles,
            'habitaciones_ocupadas': habitaciones_ocupadas,
            'habitaciones_en_mantenimiento': habitaciones_en_mantenimiento
        }

        # Enviar el objeto JSON como respuesta
        return jsonify(datos)
    except Exception as e:
        return jsonify({'error': str(e)})
#-----------FIN DE GRAFICOS-----------

if __name__ == '__main__':
    try:
        app.run(debug=True)
    except Exception as e:
        print(f"Error detectado: {e}. Reiniciando la aplicación...")
        time.sleep(5)  # Esperar 5 segundos antes de reiniciar
        restart_application()