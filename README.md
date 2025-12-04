<div align="center">

# 🏨 PROYECTO_HOTEL  

Transforma la hostelería con una excelencia en la gestión sin interrupciones.

![Last Commit](https://img.shields.io/github/last-commit/tatiana1104/proyecto_hotel)
![Repo Size](https://img.shields.io/github/repo-size/tatiana1104/proyecto_hotel)
![License](https://img.shields.io/badge/License-MIT-green)
![Python](https://img.shields.io/badge/Python-97.5%25-blue)
![Framework](https://img.shields.io/badge/Framework-Flask-orange)
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)
![Languages](https://img.shields.io/github/languages/count/tatiana1104/proyecto_hotel)

Construido con las herramientas y tecnologías:

![Markdown](https://img.shields.io/badge/Markdown-000?logo=markdown&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000?logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?logo=sqlite&logoColor=white)

</div>

----
# 📚 Índice

1. [Descripción del Proyecto]  
2. [Estructura del Proyecto]
3. [Tecnologías Utilizadas]
4. [Comparación de Tecnologías]
5. [Instalación]
6. [Instalación Avanzada]
7. [Uso]
8. [Roadmap]
9. [Licencia]
-----
## 📝 Descripción del Proyecto

proyecto_hotel es un sistema integral de gestión hotelera basada en la web que permite la gestión eficiente de reservas, servicios al cliente y flujos de trabajo operativos dentro de una plataforma unificada. Construido con Flask y MySQL, ofrece una arquitectura escalable y modular adaptada tanto al personal administrativo como a los huéspedes.

*¿Por qué proyecto_hotel?*
Este proyecto pretende optimizar las operaciones hoteleras proporcionando una solución de gestión integrada. Las características principales incluyen:
- 🛎️ *Reservas y Facturación:*  Automatiza los procesos de reserva y genera facturas de forma fluida.
- 🧑💻 *Interfaces de usuario y personal:*  paneles dinámicos con calendarios, carruseles 3D para salas y paneles de gestión.
- 🛠️ *Arquitectura modular:*  Configuración sencilla de un entorno con gestión de dependencias para un despliegue consistente.
- 🗃️ *Esquema y administración de bases de datos:*  Estructuras de datos robustas y herramientas de línea de comandos para la gestión de bases de datos.
- 📊 *Analítica operativa:*  Estadísticas clave y visualización de datos para monitorizar el rendimiento hotelero.
----
## 📁 Estructura del Proyecto

```md
PROYECTO_HOTEL/
│
├── .venv/
│   ├── Include/
│   ├── Lib/
│   └── Scripts/
│
├── src/
│   ├── config/
│   ├── static/
│   ├── templates/
│   └── app.py ← punto de entrada
│
├── database.sql ← script o esquema de BD
├── requirements.txt ← dependencias
└── README.md ← este archivo
```

> Esta estructura corresponde a la que actualmente tiene tu repositorio en GitHub. :contentReference[oaicite:1]{index=1}

-----
## 🛠 Tecnologías Utilizadas

-    Python 3.x
-    (Opcional) Framework web — Flask
-    HTML / CSS / JavaScript (si usas frontend)
-    Base de datos SQL (p. ej. MySQL, SQLite…)
-    Markdown (para documentación)  

----
## ⚖️ Comparación de Tecnologías
| Tecnología | Ventajas | Limitaciones / Consideraciones |
|-----------|-----------|-------------------------------|
| **Python** | Lenguaje popular, fácil de leer y mantener | Rendimiento menor que otros lenguajes compilados |
| **Flask** | Ligero, flexible, fácil de aprender | Hay que modularizar bien para escalar |
| **SQL** | Estructura clara, estandarizada | Diseñar bien esquema y migraciones |
| **Markdown** | Documentación legible, simple y portable | Limitaciones de formato frente a HTML completo |


----
## ⚙ Instalación

1.  Clonar repositorio:
    ```md
    git clone https://github.com/tatiana1104/proyecto_hotel.git
    ```
2.  Entrar al directorio:
    ```md
    cd proyecto_hotel
    ```
3.  Crear entorno virtual:
    ```md
    python -m venv .venv
    source .venv/bin/activate   # macOS/Linux
    .venv\Scripts\activate      # Windows
    ```
4.  Instalar dependencias:
  ```md
  pip install -r requirements.txt
  ```
----
## 🧪 Instalación Avanzada
🔹 Configurar la base de datos

Si usas un motor SQL, crea la base de datos y ejecuta el script database.sql o aplica migraciones según tu configuración.

🔹 Variables de entorno
Ejemplo (en Linux/Mac):
```md
export FLASK_APP=src/app.py
export FLASK_ENV=development
```
Agrega las variables que uses (claves, configuración, etc.).
----
## ▶ Uso

Ejecutar la aplicación:
  ```md
  python src/app.py
  ```
Visitar en el navegador:
  ```md
  http://localhost:5000
  ```
----
## 🗺 Roadmap

- [x] Estructura del proyecto
- [x] Base de datos inicial
- [ ] Módulo de reservas
- [ ] Panel administrativo
- [x] Login de usuarios
- [ ] Reportes exportables
- [ ] Despliegue en la nube
----
## 📄 Licencia
Este proyecto está bajo la licencia MIT, lo que significa que puedes usarlo, modificarlo y distribuirlo libremente siempre que mantengas el aviso de copyright.
 
