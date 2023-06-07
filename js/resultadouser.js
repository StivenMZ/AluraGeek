import { elementosContacto } from "./contacto.js";
import { barraDeBusquedaUsuario } from "./barraBusqueda.js";
import { validarFormContacto } from "./contacto.js";

elementosContacto.section.innerHTML = elementosContacto.contenido;


window.addEventListener('DOMContentLoaded', async function(){
  
      
   const listaProductos = document.querySelector('[data-productos="lista"]');
      
      /*BUSQUEDA*/
      
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const busqueda = urlParams.get('search');
  
  const urlBusqueda = `http://localhost:4000/productos?nombre_like=${busqueda}`;
  
  const textoBusqueda = document.querySelector(".productos__contenido__principal__titulo");
  textoBusqueda.innerHTML = `Resultados de búsqueda para ${busqueda}`;   
  async function buscarProductos() {
      try {
        const response = await fetch(urlBusqueda);
        const productos = await response.json();
        if(Object.keys(productos).length === 0){
          return textoBusqueda.innerHTML = `No se encontraron resultados para la búsqueda de ${busqueda}`;
        }
        productos.forEach(producto => {
  
          
          const productoElemento = document.createElement('li');
          productoElemento.innerHTML = `
          <div class="productos__contenido__lista__informacion">
          <img src="${producto.imagen}" alt="" class="productos__contenido__lista__informacion__imagen">
          <h4 class="productos__contenido__lista__informacion__titulo">${producto.nombre}</h4>
          <p class="productos__contenido__lista__informacion__precio">${producto.precio}$</p>
          <a class="productos__contenido__lista__informacion__boton" href="#">Ver producto</a>
      </div>
        `;
        listaProductos.appendChild(productoElemento)
      });  
      } catch (error) {
        console.error('Error al realizar la petición:', error);
      }
    }
  
    await buscarProductos();
       
    
/*BARRA DE BÚSQUEDA*/
barraDeBusquedaUsuario();
/*FORM CONTACTO*/
validarFormContacto();

      })
      
     
  const botonparaVolver = document.querySelector('[data-productos="boton-volver"]');
  botonparaVolver.addEventListener("click", ()=>{
      window.location.href ="./index.html";
  })  
  
