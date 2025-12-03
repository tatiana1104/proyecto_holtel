from flask import jsonify
from config.config import get_db_connection

def generar_factura(reserva_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT u.nombre, u.apellido, u.numero_documento, h.numero AS numero_habitacion, 
               r.fecha_inicio, r.fecha_fin, r.valor_dia, r.valor_total, r.metodo_pago, 
               CURDATE() AS fecha_factura
        FROM reservas r
        JOIN usuarios u ON r.cliente_id = u.id
        JOIN habitaciones h ON r.habitacion_id = h.id
        WHERE r.id = %s
    """
    cursor.execute(query, (reserva_id,))
    factura = cursor.fetchone()
    cursor.close()
    conn.close()

    return factura