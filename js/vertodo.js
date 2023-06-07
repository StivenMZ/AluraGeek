import { elementosContacto } from "./contacto.js";
import { barraDeBusquedaUsuario } from "./barraBusqueda.js";
import { validarFormContacto } from "./contacto.js";


elementosContacto.section.innerHTML = elementosContacto.contenido;


window.addEventListener('DOMContentLoaded', async function(){


    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');

    const paginaTitulo = document.querySelector(".productos__contenido__principal__titulo");
    paginaTitulo.textContent = `Todos los productos de la categoría ${categoria}`;

    
    const listaProductos = document.querySelector('[data-productos="lista"]');
    async function obtenerProductosPorCategoria() {
        const urlProductos = 'http://localhost:4000/productos';
        const response = await fetch(urlProductos);
        const productos = await response.json();
      
        const productosDeCategoria = productos.filter(producto=> producto.categoria === categoria);
        productosDeCategoria.forEach(producto => {
            const productoElemento = document.createElement('li');
            productoElemento.innerHTML = `
            <div class="productos__contenido__lista__informacion">
                            <div class="productos__contenido__lista__informacion__div">
                            <img src="${producto.imagen}" alt="" class="productos__contenido__lista__informacion__div__imagen">
                            </div>
                            <h4 class="productos__contenido__lista__informacion__titulo">${producto.nombre}</h4>
                            <p class="productos__contenido__lista__informacion__precio">${producto.precio} $</p>
                            <a class="productos__contenido__lista__informacion__boton" href="./verproducto.html?id=${producto.id}">Ver producto</a>
                         </div>
          `;
          listaProductos.appendChild(productoElemento)
        });
      
      }
      obtenerProductosPorCategoria();
    
   
/*BARRA DE BÚSQUEDA*/
barraDeBusquedaUsuario();

    
    })
    
/*FORM Contacto*/
validarFormContacto();
    