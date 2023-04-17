# Proyecto final BackEnd

### Resumen

El presente es el codigo para un Ecommerce desarrollado en Node JS y express. Para la base de datos se utilizo MONGO DB. Al tratarse de una API RESTful, se utilizan los verbos get, put, post y delete para realizar las operaciones. 



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
    - Elimina un producto de un carrito.

- Order:
    - Crea una orden de compra de un carrito.
    - Muestra todas las ordenes generadas.

- Chat:
    - Envia un mensaje del usuario que ha iniciado sesión.
    - Muestra todos los mensajes.
    - Muestra los mensajes de un usuario específico.

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