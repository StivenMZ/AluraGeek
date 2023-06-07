import { elementosContacto } from "./contacto.js";
import { validarFormContacto } from "./contacto.js";
import { barraDeBusquedaUsuario } from "./barraBusqueda.js";

elementosContacto.section.innerHTML = elementosContacto.contenido;

window.addEventListener('DOMContentLoaded', async function(){
  
    
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const  divPadre = document.querySelector(".productos__contenido");


let idGeneral = "";
let categoriaGeneral ="";
  await fetch(`http://localhost:4000/productos/${id}`)
  .then(response => response.json())
  .then(producto => {
        const divMenor = document.createElement("div");
        divMenor.classList.add("productos__contenido__principal");
        divMenor.innerHTML = `
        <img src="${producto.imagen}" alt="" class="productos__contenido__principal__imagen">
        <div class="productos__contenido__divm">
        <h3 class="productos__contenido__principal__titulo">${producto.nombre}</h3>
        <p class="productos__contenido__principal__precio">${producto.precio} $</p>
        <p class="productos__contenido__principal__descripcion">${producto.descripcion} </p>
        </div>
        `
        categoriaGeneral = producto.categoria;
        idGeneral = producto.id;
        divPadre.appendChild(divMenor);

  })




  const listaSimilares = document.querySelector('[data-productos="lista"]');
    async function obtenerProductosPorCategoria() {
        const urlProductos = 'http://localhost:4000/productos';
        const response = await fetch(urlProductos);
        const productos = await response.json();
      
        const productosDeCategoria = productos.filter(producto=> producto.categoria === categoriaGeneral && producto.id !== idGeneral);
        productosDeCategoria.forEach(producto => {
            const productoElemento = document.createElement('li');
            productoElemento.innerHTML = `
            <div class="productos__contenido__lista__informacion">
                            <div class="productos__contenido__lista__informacion__div">
                            <img src="${producto.imagen}" alt="" class="productos__contenido__lista__informacion__div__imagen">
                            <div class="productos__contenido__lista__texto">
                            <h4 class="productos__contenido__lista__informacion__titulo">${producto.nombre}</h4>
                            <p class="productos__contenido__lista__informacion__precio">${producto.precio} $</p>
                            <a class="productos__contenido__lista__informacion__boton" href="./verproducto.html?id=${producto.id}">Ver producto</a>                           
                           </div>
          `;
          listaSimilares.appendChild(productoElemento)
        });
      
        productosDeCategoria.forEach(producto=>{
            
        })
      }
      await obtenerProductosPorCategoria();
  


  
  
  
/*BARRA DE BÚSQUEDA*/
barraDeBusquedaUsuario();
  })
  
  
  
  /*Form contacto*/ 
  validarFormContacto();
  
  
  
  