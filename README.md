<!-- README.md  -->
# Proyecto CoderHouse Backend 55655 <!-- omit in toc -->

- [Sprint 1 - Clases 1 y 2](#sprint-1---clases-1-y-2)
  - [Clase `ListManager`](#clase-listmanager)
  - [Clase `UserManager`](#clase-usermanager)
  - [Clase `ProductsManager`](#clase-productsmanager)

## Sprint 1 - Clases 1 y 2

En este sprint, se implementa un sistema básico de gestión de productos y usuarios. A continuación se detallan las principales clases y funcionalidades desarrolladas:

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
