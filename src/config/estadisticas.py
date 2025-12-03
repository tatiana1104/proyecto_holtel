from flask import jsonify
from config.config import get_db_connection

def contar_usuarios_por_rol():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT rol, COUNT(*) as cantidad FROM usuarios GROUP BY rol")
    resultados = cursor.fetchall()
    cursor.close()
    conn.close()

    # Convertir resultados a un formato adecuado para el gráfico
    roles = {}
    for resultado in resultados:
        roles[resultado['rol']] = resultado['cantidad']

    return roles  # Asegúrate de que esto devuelva un diccionario

def contar_habitaciones_por_tipo():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT tipo, COUNT(*) as cantidad
        FROM habitaciones
        GROUP BY tipo
    """
    cursor.execute(query)
    habitaciones_por_tipo = cursor.fetchall()
    cursor.close()
    conn.close()

    # Convertir el resultado a un diccionario que pueda ser serializado a JSON
    resultado = []
    for habitacion in habitaciones_por_tipo:
        resultado.append({
            'tipo': habitacion['tipo'],
            'cantidad': habitacion['cantidad']
        })

    return resultado

def contar_habitaciones_por_piso():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT SUBSTR(numero, 1, 1) as piso, COUNT(*) as cantidad
        FROM habitaciones
        GROUP BY piso
    """
    cursor.execute(query)
    habitaciones_por_piso = cursor.fetchall()
    cursor.close()
    conn.close()

    return habitaciones_por_piso

def contar_habitaciones_por_metodo_pago():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT metodo_pago, COUNT(*) as cantidad
        FROM reservas
        GROUP BY metodo_pago
    """
    cursor.execute(query)
    habitaciones_por_metodo_pago = cursor.fetchall()
    cursor.close()
    conn.close()

    return habitaciones_por_metodo_pago

def contar_habitaciones_reservadas_al_mes():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT MONTH(fecha_inicio) as mes, COUNT(*) as cantidad
        FROM reservas
        GROUP BY mes
    """
    cursor.execute(query)
    habitaciones_reservadas_al_mes = cursor.fetchall()
    cursor.close()
    conn.close()

    return habitaciones_reservadas_al_mes

def contar_habitaciones_disponibles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT COUNT(*) as cantidad
        FROM habitaciones
        WHERE estado = 'Disponible'
    """
    cursor.execute(query)
    habitaciones_disponibles = cursor.fetchone()
    cursor.close()
    conn.close()

    return habitaciones_disponibles

def contar_habitaciones_ocupadas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT COUNT(*) as cantidad
        FROM habitaciones
        WHERE estado = 'Ocupada'
    """
    cursor.execute(query)
    habitaciones_ocupadas = cursor.fetchone()
    cursor.close()
    conn.close()

    return habitaciones_ocupadas

def contar_habitaciones_en_mantenimiento():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT COUNT(*) as cantidad
        FROM habitaciones
        WHERE estado = 'Mantenimiento'
    """
    cursor.execute(query)
    habitaciones_en_mantenimiento = cursor.fetchone()
    cursor.close()
    conn.close()

    return habitaciones_en_mantenimiento


