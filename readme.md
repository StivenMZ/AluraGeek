Proyecto AluraGeek

Este proyecto está hecho con HTML, CSS, Javascript y el uso de Json server.
Es un "E-Commerce" simple donde principalmente la funcionalidad es para el administrador 

Requisitos:
Este proyecto usa Json server, por ende hará falta tener node y npm para poder usarlo.

Instrucciones
-Una vez instalado NODE y NPM, usar 
npm install -g json-server
en la carpeta raiz del proyecto (Esto instalará JSON Server globalmente en tu sistema, lo que te permitirá utilizarlo en cualquier proyecto.)
-Luego hay que ejecutar los siguientes comandos:
json-server --watch productos.json --port 4000
json-server --watch users.json --port 3000
Ya que los fetchs en el proyecto se hacen en estos puertos

Uso:
Este proyecto es un "E-Commerce" simple,  en la pagina principal en el encabezado, está el logo de la pagina, una barra de búsqueda y un boton para loguearse, en la siguiente seccion,  hay un banner 
y más abajo, si JSON server está iniciado correctamente, apareceran las categorias de los productos, y sus respectivos productos,  con la informacion y un boton para ver cada producto.
En la parte inferior está la sección de contacto y por ultimo el footer.
La barra de busqueda puede usarse para realizar búsquedas, valga la redundancia, pero es un sistema muy simple de busqueda, ya que es una peticion a json tipo nombre_like=${busqueda}

En el login el correo es ejemplo@alura.com y la contraseña ejemplo123 (cosa que puede verse en users.json), mediante validacion de form se verifica que tanto el correo como la clave coincidan. Al momento de loguearse se usa un cookie temporal, hasta que se cierre el navegador, para cada pagina del administrador, por ende, si se intenta acceder sin previo logueo, el sistema te enviará a loguearte.

Una vez logueado se pueden ver todos los productos, agregar nuevos y eliminarlos, así mismo como las categorias, que serán los que se muestren en la pagina principal a los usuarios no logueados.
Para subir imagenes, se imnplementó la API de cloudinary. 


Muchas gracias, de seguro pueden encontrar varias oportunidades de mejora en el proyecto, pero fue de mis primeros proyectos, y el primero usando  CRUD. Este proyecto se puede usar con la extensión "Live Server" de visual studio code. 

