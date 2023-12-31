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
