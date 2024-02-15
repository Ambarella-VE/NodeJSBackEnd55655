<!-- README.md  -->
# Proyecto CoderHouse Backend 55655 <!-- omit in toc -->

- [Sprint 1 - Clases 1 y 2](#sprint-1---clases-1-y-2)
  - [Clase `ListManager`](#clase-listmanager)
  - [Clase `UserManager`](#clase-usermanager)
  - [Clase `ProductsManager`](#clase-productsmanager)
- [Sprint 2 - Clases 3 y 4](#sprint-2---clases-3-y-4)
  - [Clase `ListManager` (Actualización)](#clase-listmanager-actualización)
  - [Clase `ProductsManager` (Actualización)](#clase-productsmanager-actualización)
  - [Clase `UsersManager`](#clase-usersmanager)
- [Sprint 3 - Clases 5 y 6](#sprint-3---clases-5-y-6)
  - [Levantamiento del Servidor y API](#levantamiento-del-servidor-y-api)
    - [Servidor](#servidor)
    - [Rutas de Productos y Usuarios](#rutas-de-productos-y-usuarios)
    - [Manejo de Errores y Logs](#manejo-de-errores-y-logs)
    - [Funciones Utilitarias](#funciones-utilitarias)
- [Sprint 4 - Clases 7 y 8](#sprint-4---clases-7-y-8)
  - [Clase `ListManager` (Actualización 2)](#clase-listmanager-actualización-2)
  - [Clase `OrdersManager`](#clase-ordersmanager)
  - [Middlewares](#middlewares)
    - [Middleware `errorHandler`](#middleware-errorhandler)
    - [Middleware `pathHandler`](#middleware-pathhandler)
    - [Middleware Morgan para Registro de Solicitudes](#middleware-morgan-para-registro-de-solicitudes)
  - [Rutas y Endpoints](#rutas-y-endpoints)
    - [Cambios en la Estructura de Archivos](#cambios-en-la-estructura-de-archivos)
  - [Archivo `orders.js`](#archivo-ordersjs)
- [Sprint 5 - Clases 9 y 10](#sprint-5---clases-9-y-10)
  - [Nuevos Archivos y Funcionalidades](#nuevos-archivos-y-funcionalidades)
    - [`form.js` y `products.js` en `public/`](#formjs-y-productsjs-en-public)
  - [Nuevas Vistas en `src/views/`](#nuevas-vistas-en-srcviews)
  - [Nuevos Middlewares y Utilidades en `src/utils/`](#nuevos-middlewares-y-utilidades-en-srcutils)
  - [Handlebars y Socket.io](#handlebars-y-socketio)
- [Sprint 6 - Clases 11-17](#sprint-6---clases-11-17)

## Sprint 1 - Clases 1 y 2

Se implementa un sistema básico de gestión de productos y usuarios. A continuación se detallan las principales clases y funcionalidades desarrolladas:

### Clase `ListManager`

La clase `ListManager` proporciona funcionalidades comunes para gestionar listas de objetos identificables.

- **`generateId`**: Genera un identificador único basado en la longitud actual de la lista de objetos.

- **`add`**: Agrega un nuevo objeto identificable a la lista, asignándole un ID único.

- **`getAll`**: Recupera un array con todos los objetos identificables almacenados.

- **`get`**: Recupera un objeto identificable específico por su ID. Si no se encuentra el objeto, lanza un error indicando que no se encontró.

### Clase `UserManager`

La clase `UserManager` extiende la funcionalidad de la clase `ListManager` para gestionar datos de usuarios.

- **`constructor`**: Crea una instancia de `UserManager` sin realizar ninguna acción adicional.

- **`add`**: Agrega un nuevo usuario al sistema verificando la existencia de usuarios con el mismo correo electrónico. Si ya existe un usuario con el mismo correo electrónico, se lanza un error; de lo contrario, se asigna un ID único al usuario.

### Clase `ProductsManager`

La clase `ProductsManager` extiende la funcionalidad de la clase `ListManager` para gestionar datos de productos.

- **`constructor`**: Crea una instancia de `ProductsManager` sin realizar ninguna acción adicional.

- **`add`**: Agrega un nuevo producto al sistema verificando la existencia de productos con el mismo código. Si ya existe un producto con el mismo código, se lanza un error; de lo contrario, se asigna un ID único al producto.

## Sprint 2 - Clases 3 y 4

Se introducen mejoras en la gestión de archivos y se agregan funcionalidades específicas para manejar productos y usuarios.

### Clase `ListManager` (Actualización)

La clase `ListManager` ha sido actualizada para incorporar la gestión de archivos y mejorar la persistencia de los datos.

- **`init`**: Verifica la existencia de un archivo de datos en el sistema. Si existe, carga los datos desde el archivo; de lo contrario, inicializa la lista vacía y guarda los datos en el archivo utilizando el módulo `fs`.

- **`saveToFile`**: Guarda la lista de elementos en un archivo para persistencia de datos utilizando el módulo `fs`.

### Clase `ProductsManager` (Actualización)

La clase `ProductsManager` ahora verifica la existencia de productos con el mismo código antes de agregar un nuevo producto. Si existe un producto con el mismo código, se lanza un error; de lo contrario, se asigna un ID único al producto y se agrega a la lista.

### Clase `UsersManager`

La clase `UsersManager` también verifica la existencia de usuarios con el mismo correo electrónico antes de agregar un nuevo usuario. Si existe un usuario con el mismo correo electrónico, se lanza un error; de lo contrario, se asigna un ID único al usuario y se agrega a la lista.

## Sprint 3 - Clases 5 y 6

### Levantamiento del Servidor y API

#### Servidor

- Se creó el archivo `server.js` para configurar y levantar el servidor.
- Se utilizó Express, un framework de Node.js, para gestionar las rutas y HTTP.
- Se configuró el servidor para escuchar en el puerto 8080 (o el puerto proporcionado por el entorno).
- Se implementaron rutas para los endpoints principales ("/", "/api/products", "/api/users").

#### Rutas de Productos y Usuarios

- Se crearon archivos de rutas para productos (`products.router.js`) y usuarios (`users.router.js`) dentro de la carpeta `src/api/routes`.
- Se definieron las rutas base para productos ("/api/products") y usuarios ("/api/users").
- Se implementaron operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para ambos, utilizando métodos HTTP como GET, POST y DELETE.

#### Manejo de Errores y Logs

- Se implementó un sistema de logs en la consola para mensajes de éxito, advertencias y errores.
- Se añadieron mensajes de consola para registrar solicitudes recibidas y respuestas enviadas.

#### Funciones Utilitarias

- Se crearon funciones utilitarias, como el formateo de mensajes y la conversión de texto a formato de título (`toTitleCase`).
- Estas funciones se utilizaron en los logs y en otras partes del código para mejorar la legibilidad.

## Sprint 4 - Clases 7 y 8

### Clase `ListManager` (Actualización 2)

La clase `ListManager` fue actualizada para incluir la función `addBulk`. Esta función permite agregar múltiples elementos a la lista de una sola vez, mejorando la eficiencia y facilitando la inserción de datos masivos.

- **`addBulk`**: Agrega una lista de nuevos elementos a la lista existente, asignándoles ID único a cada elemento.
- **`add`** (Actualización): Con el objetivo de mejorar la experiencia del cliente, se ha modificado este método para proporcionar un comportamiento más consistente. Ahora, en lugar de devolver un error al intentar agregar un elemento que ya existe, el método retorna el elemento existente junto con su identificador único. Este cambio permite una integración más fluida con las listas que extienden ListManager y que han personalizado el método add para elementos que no pueden estar duplicados. En cualquier caso, el método garantiza que no se dupliquen elementos en la lista.

### Clase `OrdersManager`

Se añadió la clase `OrdersManager` que extiende la funcionalidad de `ListManager`. Esta clase gestiona los pedidos y ofrece operaciones específicas relacionadas con ellos.

- **`getByUser`**: Recupera los pedidos asociados a un usuario específico mediante su ID. Si no se encuentran pedidos para el usuario, se lanza un error indicando que no se encontraron.

### Middlewares

#### Middleware `errorHandler`

Se implementó un middleware llamado `errorHandler` para manejar errores en las solicitudes. Este middleware captura los errores, registra mensajes en la consola y responde al cliente con un código de estado y un mensaje correspondiente al error.

#### Middleware `pathHandler`

Se agregó el middleware `pathHandler` para manejar solicitudes a rutas no definidas. Si un usuario intenta acceder a una ruta no existente, este middleware captura la solicitud, registra un mensaje en la consola y responde al cliente con un código de estado 404.

#### Middleware Morgan para Registro de Solicitudes

- **`morgan` (Nueva Implementación):** Se ha incorporado el middleware `morgan` para el registro detallado de solicitudes HTTP. Esta herramienta proporciona información valiosa sobre las solicitudes recibidas, como la URL, el método HTTP, el código de estado y otros detalles. Facilita el seguimiento y la depuración de las solicitudes, mejorando la visibilidad del flujo de trabajo del servidor.

Este middleware se utiliza para registrar las solicitudes entrantes, lo que resulta útil para el análisis y la monitorización del rendimiento del servidor. Los registros detallados se muestran en la consola, proporcionando una herramienta adicional para el mantenimiento y la optimización continuos del sistema.

### Rutas y Endpoints

Se creó un nuevo archivo `orders.router.js` en la carpeta `src/api/routes` para gestionar las rutas y endpoints relacionados con los pedidos. Este archivo define las operaciones CRUD para los pedidos, incluyendo la recuperación de todos los pedidos, la adición de nuevos pedidos, la actualización de pedidos existentes y la recuperación de pedidos por ID de usuario.

#### Cambios en la Estructura de Archivos

- Se realizaron cambios significativos en la estructura de archivos para mejorar la organización del proyecto.
- Ahora, las rutas se encuentran en el directorio `src/routers/api` en lugar de `src/api/routes`.
- Además, se introdujo un nuevo directorio `src/middlewares` para alojar los archivos relacionados con middlewares.

### Archivo `orders.js`

Se creó un nuevo archivo `orders.js` en la carpeta `src/data/memory` para almacenar la instancia de `OrdersManager` y gestionar los datos de los pedidos.

## Sprint 5 - Clases 9 y 10

### Nuevos Archivos y Funcionalidades

#### `form.js` y `products.js` en `public/`

Se crearon dos nuevos archivos, `form.js` y `products.js`, en el directorio `public/`. Estos archivos contienen scripts JavaScript relacionados con la gestión de formularios y productos en el lado del cliente.

### Nuevas Vistas en `src/views/`

Se crearon varias nuevas vistas en el directorio `src/views/`:

- `form.handlebars`: Esta vista representa un formulario para agregar nuevos productos al sistema. Contiene campos para ingresar información detallada sobre el producto.

- `index.handlebars`: La página de inicio del sitio web fue actualizada con una nueva imagen y contenido. Se agregó un enlace para dirigirse a la sección de productos.

- `layouts/main.handlebars`: Se introdujo un nuevo archivo de diseño principal que define la estructura HTML básica para todas las páginas del sitio.

- `products.handlebars`: Esta vista representa la sección de productos del sitio web. Muestra los productos disponibles de manera atractiva.

- `register.handlebars`: La vista de registro ahora presenta un formulario para que los usuarios ingresen sus datos y se registren en el sistema.

### Nuevos Middlewares y Utilidades en `src/utils/`

Se incorporaron los siguientes elementos en el directorio `src/utils/`:

- `socket.utils.js`: Este archivo define un script JavaScript que utiliza el módulo `socket.io` para gestionar la comunicación en tiempo real con el servidor. Se encarga de la emisión y recepción de eventos relacionados con los productos.

### Handlebars y Socket.io

Se introdujo el motor de plantillas Handlebars para facilitar el rendering de las vistas en el lado del servidor, proporcionando una separación más clara entre la lógica del servidor y las vistas del cliente.

Adicionalmente, se implementó Socket.io para permitir la comunicación en tiempo real entre el servidor y el cliente. Esto se utiliza en `socket.utils.js` para gestionar eventos relacionados con los productos y mantener a los usuarios actualizados en tiempo real sobre cambios en el sistema.

## Sprint 6 - Clases 11-17
