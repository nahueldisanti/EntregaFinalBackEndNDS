# Proyecto final para el curso de Backend de CoderHouse

### Resumen

Se realizó el backend de una aplicación de ecommerce integrando administración de usuarios y notificaciones a los mismos.

Secciones:
- Auth:
    - Register: Registra un usuario nuevo, encriptando la contraseña.
    - Login: Da acceso al usuario, generando el token de autenticación.

- Products:
    - Crea un producto nuevo.
    - Muestra todos los productos guardados en la base de datos.
    - Muestra un producto por id.
    - Muestra productos en base a su categoria.
    - Actualiza un producto.
    - Elimina un producto.

- Cart:
    - Crea un carrito.
    - Muestra todos los carritos generados en la base de datos.
    - Elimina un carrito por id.
    - Agrega un producto en el carrito.
    - Muestra los productos de un carrito.
    - Modifica la cantidad de un producto de un carrito.
    - Elimina un producto de un carrito.

- Order:
    - Crea una orden de compra de un carrito.
    - Muestra todas las ordenes generadas.

- Chat:
    - Envia un mensaje del usuario que ha iniciado sesión.
    - Muestra todos los mensajes.
    - Muestra los mensajes de un usuario específico.

## Instalación

1. Intalar node.js [https://nodejs.org/es/](https://nodejs.org/es/)

2. Clonar repositorio:
```bash
git clone https://github.com/Nahirmm/proyectoFinalBackend.git
```

3. Abrir la terminal y en la carpeta base del proyecto ejecutar:
```bash
npm install
```

4. Antes de poder ejecutar, se deberá crear el archivo .env y configurarle las variables de entorno, se deja un archivo .env.example con el nombre de las variables necesarias en el proyecto, las cuales son:

- `MONGODB=` (Url de mongo)
- `TIEMPO_EXPIRACION=` (Tiempo de expiración de la sesión)
- `ADMIN_MAIL=` (Mail donde se enviaran los mails de orden generada y registro de usuario)
- `PASS=` (password utilizada para nodemailer)
- `COOKIE_TIME=` (Tiempo de expiración de la sesión)
- `JWT_TIME=` (Tiempo de expiración de la sesión)
- `JWT_SECRET=` (Codigo de codificación)

5. Una vez que se hayan descargado las dependencias, ejecutar: 
```bash
npm start
```

## Dependencias

* **express** - version 4.18.1
* **express-session** - version 1.17.3
* **nodemon** - version 2.0.19
* **mongoose** - version 6.5.3, utilizada como base de datos.
* **log4js** - version 3.8.1, utilizada para los logs.
* **bcrypt** - version 5.0.1, utilizada para encriptar la contraseña del usuario cuando se registra.
* **dotenv** - version 16.0.1, utilizada configurar las variables de entorno
* **jsonwebtoken** - version 8.5.1, utilizada como token de seguridad del usuario.
* **moment** - version 2.29.4, utilizada para administrar fecha y hora.
* **nodemailer** - version 6.7.8, utilizada para el envio de mails al registrarse un nuevo usuario y al generarse una orden.
* **ejs** - version 3.1.8, utilizada como motor de plantillas.
* **socket.io** - version 4.5.1, utilizada comunicación de websockets.

## Autor

Nahuel Di Santi