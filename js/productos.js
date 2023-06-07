import { elementosContacto } from "./contacto.js";
import { barraDeBusquedaAdmin } from "./barraBusqueda.js";
import { controladores } from "./controllers.js";
import { validarFormContacto } from "./contacto.js";

elementosContacto.section.innerHTML = elementosContacto.contenido;


function obtenerCookie(nombre) {
  // Obtener todas las cookies y separarlas por ';'
  const cookies = document.cookie.split(';');

  // Buscar la cookie específica por nombre
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(`${nombre}=`)) {
      // La cookie existe, retornar su valor
      return cookie.substring(nombre.length + 1, cookie.length);
    }
  }

  // La cookie no existe
  return null;
}

function validarCookie() {
  const token = obtenerCookie('token');
  const username = obtenerCookie('username');

  if (token !== null && username !== null) {
    return true;
  } else {
    // La cookie no existe, se debe cerrar la sesión
    return false;
  }
}

if (validarCookie()) {
window.addEventListener('DOMContentLoaded', async function(){

const agregarProductos = document.querySelector('[data-productos="boton-agregar"]')

agregarProductos.addEventListener("click" , ()=>{
    window.location.href = "./registrar.html";
})


const listaProductos = document.querySelector('[data-productos="lista"]');



await fetch('http://localhost:4000/productos')
.then(response => response.json())
.then(productos => {
    productos.forEach(producto => {
        const productoElemento = document.createElement('li');
        productoElemento.innerHTML = `
        <div class="productos__contenido__lista__informacion">
                        <div class="productos__contenido__lista__informacion__div">
                        <img src="${producto.imagen}" alt="" class="productos__contenido__lista__informacion__div__imagen">
                        <span class="productos__contenido__lista__informacion__div__eliminar"><img src="../assets/delete.png" alt="icon" data-producto="eliminar" data-id="${producto.id}"></span>
                        <span class="productos__contenido__lista__informacion__div__editar"><img src="../assets/edit.png" alt="icon" data-producto="editar" data-id="${producto.id}"></span>
                        </div>
                        <h4 class="productos__contenido__lista__informacion__titulo">${producto.nombre}</h4>
                        <p class="productos__contenido__lista__informacion__precio">${producto.precio} $</p>
                        <p class="productos__contenido__lista__informacion__code">#${producto.id}</p>
                    </div>
      `;
      listaProductos.appendChild(productoElemento)
    });

})

/*Eliminar PRODUCTO*/
controladores.eliminarProducto();
controladores.editarProducto();



/*BARRA DE BÚSQUEDA*/
barraDeBusquedaAdmin();


/*Form contacto*/ 
validarFormContacto();

})



} else{
  alert("No estás autenticado, por favor autentícate")
  window.location.href ="./login.html";
}

