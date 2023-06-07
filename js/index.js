import { elementosContacto } from "./contacto.js";
import { barraDeBusquedaUsuario } from "./barraBusqueda.js";
import { validarFormContacto } from "./contacto.js";

elementosContacto.section.innerHTML = elementosContacto.contenido;

const btnLogin = document.querySelector('[data-login="entrar"]');

btnLogin.addEventListener("click", ()=>{
  window.location.href = "./login.html";
})

/*Contacto form*/
validarFormContacto();
const verConsolas = document.querySelector(".destacado__visual__boton");
verConsolas.addEventListener("click", ()=>{
  window.location.href = "./vertodo.html?categoria=Consolas"
})

/*CATEGORIAS*/

const listaCategorias = document.querySelector(".productos");


async function obtenerProductosPorCategoria() {
  const urlProductos = 'http://localhost:4000/productos';
  const response = await fetch(urlProductos);
  const productos = await response.json();

  const productosPorCategoria = {};
  productos.forEach((producto) => {
    if (producto.categoria in productosPorCategoria) {
      productosPorCategoria[producto.categoria].push(producto);
    } else {
      productosPorCategoria[producto.categoria] = [producto];
    }
  });

  

  for(let categoria in productosPorCategoria){
    const productosDeCadaCategoria = productosPorCategoria[categoria];
    let contadorProductos = 0;
    const divCategoria = document.createElement("div");
    divCategoria.classList.add("productos__contenido");
    const subDiv = document.createElement("div");
    subDiv.classList.add("productos__contenido__principal");
    const subDivTitulo = document.createElement("h3");
    subDivTitulo.classList.add("productos__contenido__principal__titulo");
    subDivTitulo.innerText = categoria;

    const subDivEnlace = document.createElement("a");
    subDivEnlace.classList.add("productos__principal__ver");
    subDivEnlace.innerText ="Ver todo->";

    subDivEnlace.addEventListener("click", (evento)=>{
      evento.preventDefault
      window.location.href = `./vertodo.html?categoria=${categoria}`;
    })


    const ulLista = document.createElement("ul");
    ulLista.classList.add("productos__contenido__lista");

    subDiv.appendChild(subDivTitulo);
    subDiv.appendChild(subDivEnlace);


    
    divCategoria.appendChild(subDiv);
    divCategoria.append(ulLista)

    listaCategorias.append(divCategoria);
    for(let producto of productosDeCadaCategoria){
      let tamañoDeScreen = window.innerWidth;
      let condicion;
      if(tamañoDeScreen <768){
        condicion = 4;
      } else if(tamañoDeScreen>=1280){
        condicion = 6;
      }

      if(contadorProductos >= condicion ){
        break;
      } else{
      const elemento = document.createElement("li");
      elemento.innerHTML =`
      <div class="productos__contenido__lista__informacion">
          <img src="${producto.imagen}" alt="" class="productos__contenido__lista__informacion__imagen">
          <h4 class="productos__contenido__lista__informacion__titulo">${producto.nombre}</h4>
          <p class="productos__contenido__lista__informacion__precio">${producto.precio}$</p>
          <a class="productos__contenido__lista__informacion__boton" href="./verproducto.html?id=${producto.id}">Ver producto</a>
      </div>`
      ulLista.appendChild(elemento);
      contadorProductos++;
    }
    }
  }
}
obtenerProductosPorCategoria();


  

/*BARRA DE BÚSQUEDA*/
barraDeBusquedaUsuario();




const lupaPantallaMayor = document.querySelector(".header__navegacion__busqueda_lupa");

lupaPantallaMayor.addEventListener("click", ()=>{
  const search = barraBusqueda.value;
  if(barraBusqueda.value.length<1 ){
    return false;
  }else{
    window.location.href = `./docs/resultadouser.html?search=${search}`;
  }
  
 })


