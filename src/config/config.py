# config.py
import mysql.connector

# Configuración de la base de datos
db_config = {
    'user': 'root',
    'password': '',
    'host': '127.0.0.1',
    'database': 'hotel'
}

# Función para obtener la conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(**db_config)

