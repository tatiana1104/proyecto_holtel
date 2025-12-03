import os
from flask import request, jsonify, url_for, session, redirect, flash
from config.config import get_db_connection


def listar_reservas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT r.id, u.nombre, u.apellido, u.numero_documento, h.numero AS numero_habitacion, 
                r.fecha_inicio, r.fecha_fin, r.valor_dia, r.valor_total, r.metodo_pago
        FROM reservas r
        JOIN usuarios u ON r.cliente_id = u.id
        JOIN habitaciones h ON r.habitacion_id = h.id
    """
    cursor.execute(query)
    print(query)
    reservas = cursor.fetchall()
    cursor.close()
    conn.close()

    return reservas

def crear_reserva():
    data = request.form
    habitacion_id = data.get('id_habitacion')
    cliente_id = session.get('usuario_id')
    fecha_inicio = data.get('fechaInicio')
    fecha_fin = data.get('fechaFin')
    metodo_pago = data.get('metodoPago')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT obtener_valor_dia(%s)", (habitacion_id,))
        valor_dia = cursor.fetchone()[0]
        cursor.execute("SELECT calcular_valor_total(%s, %s, %s)", (fecha_inicio, fecha_fin, habitacion_id))
        valor_total = cursor.fetchone()[0]

        cursor.execute("INSERT INTO reservas (cliente_id, habitacion_id, fecha_inicio, fecha_fin, valor_dia, valor_total, metodo_pago) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                                             (cliente_id, habitacion_id, fecha_inicio, fecha_fin, valor_dia, valor_total , metodo_pago))
        conn.commit()
        flash('Reserva creada exitosamente!', 'success')
        return redirect(url_for('cliente.html'))
        #return jsonify({'message': 'Reserva creada con éxito'}), 201
    except Exception as e:
        print("Error al crear la reserva: ", e)
        return jsonify({'message': str(e)}), 500
    finally:
        cursor.close()
        conn.close()