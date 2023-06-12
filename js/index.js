import { validarFormContacto } from "./contacto.js";


/*BUSQUEDA*/ 
const btnLogin = document.querySelector('[data-login="entrar"]');
const busquedaIcono = document.querySelector(".header__navegacion__busqueda_lupa");
const barraBusqueda = document.querySelector(".header__navegacion__busqueda__input");

function ayudaBusqueda(pantalla) {
  let divMayor = "";
  let buscarDiv = "";
  let x = "";
  let span = "";
  let buscar = "";
  function busquedaInconoF() {
    busquedaIcono.style.display = "none";
    barraBusqueda.style.display = "flex";
    barraBusqueda.parentNode.appendChild(divMayor);
    divMayor.appendChild(x);
    x.appendChild(span);
    btnLogin.style.display = "none"
    x.parentNode.appendChild(buscarDiv);
  }
  window.addEventListener("load", () => {
  /**/ let tamañoPantalla = window.innerWidth;
    if (tamañoPantalla <= 767) {
      barraBusqueda.style.display = "none";
      busquedaIcono.style.left = "132.9%";
      divMayor = document.createElement("div");
      divMayor.classList.add("divmayor__busqueda")
      x = document.createElement("div");
      x.classList.add("quitar__busqueda");
      span = document.createElement("span");
      span.textContent = "X";
      span.classList.add("quitar__x");
      buscarDiv = document.createElement("div");
      buscarDiv.classList.add("buscar__div");
      buscar = document.createElement("span");
      buscar.classList.add("buscar__icono");
      buscarDiv.appendChild(buscar)
      busquedaIcono.addEventListener("click", () => {
        busquedaIcono.style.display = "none";
        barraBusqueda.style.display = "flex";
        barraBusqueda.parentNode.appendChild(divMayor);
        divMayor.appendChild(x);
        x.appendChild(span);
        btnLogin.style.display = "none"
        x.parentNode.appendChild(buscarDiv);
      })
      x.addEventListener("click", () => {
        barraBusqueda.style.display = "none";
        buscarDiv.remove()
        x.remove()
        btnLogin.style.display = "flex"
        busquedaIcono.style.display = "inline";
        busquedaIcono.style.left = "7rem";
      })
      buscar.addEventListener("click", () => {
        const search = barraBusqueda.value;
        if (barraBusqueda.value.length < 1) {
          return false;
        } else {
          window.location.href = `./docs/${pantalla}.html?search=${search}`;
        }
      })
    }
  })
  window.addEventListener("resize", () => {
    let pantalla = window.innerWidth;
    if (pantalla <= 767) {
      if (x === "" && buscarDiv === "" && divMayor === "" && span === "" && buscar === "") {
        barraBusqueda.style.display = "none";
        busquedaIcono.style.left = "132.9%";
        divMayor = document.createElement("div");
        divMayor.classList.add("divmayor__busqueda")
        x = document.createElement("div");
        x.classList.add("quitar__busqueda");
        span = document.createElement("span");
        span.textContent = "X";
        span.classList.add("quitar__x");
        buscarDiv = document.createElement("div");
        buscarDiv.classList.add("buscar__div");
        buscar = document.createElement("span");
        buscar.classList.add("buscar__icono");
        buscarDiv.appendChild(buscar)
        busquedaIcono.addEventListener("click", busquedaInconoF)
        x.addEventListener("click", () => {
          barraBusqueda.style.display = "none";
          buscarDiv.remove()
          x.remove()
          btnLogin.style.display = "flex"
          busquedaIcono.style.display = "inline";
          busquedaIcono.style.left = "7rem";
        })
        buscar.addEventListener("click", () => {
          const search = barraBusqueda.value;
          if (barraBusqueda.value.length < 1) {
            return false;
          } else {
            window.location.href = `./docs/${pantalla}.html?search=${search}`;
          }
        })
      }
    } else if (pantalla >= 768) {
      if (x !== "" && buscarDiv !== "" && divMayor !== "" && span !== "" && buscar !== "") {
        x.remove();
        buscarDiv.remove();
        divMayor.remove();
        span.remove();
        buscar.remove();
        barraBusqueda.style.display = "flex";
        busquedaIcono.style.display = "flex";
        busquedaIcono.removeEventListener("click", busquedaInconoF);
        busquedaIcono.style.left = "-13%";
        btnLogin.style.display = "flex";
        x = "";
        buscarDiv = "";
        divMayor = "";
        span = "";
        buscar = "";
      }
    } 
  });
  const lupaPantallaMayor = document.querySelector(".header__navegacion__busqueda_lupa");
  function irBusqueda() {
    const search = barraBusqueda.value;
    if (barraBusqueda.value.length < 1) {
      return false;
    } else {
      window.location.href = `./docs/${pantalla}.html?search=${search}`;
    }
  }
  barraBusqueda.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      irBusqueda();
    }
  })
  lupaPantallaMayor.addEventListener("click", irBusqueda)
}
 function barraDeBusquedaUsuario() {
  ayudaBusqueda("resultadouser");
}


/**/



btnLogin.addEventListener("click", ()=>{
  window.location.href = "./docs/login.html";
})

/*Contacto form*/
validarFormContacto();
const verConsolas = document.querySelector(".destacado__visual__boton");
verConsolas.addEventListener("click", ()=>{
  window.location.href = "./docs/vertodo.html?categoria=Consolas"
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
      window.location.href = `./docs/vertodo.html?categoria=${categoria}`;
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
          <a class="productos__contenido__lista__informacion__boton" href="./docs/verproducto.html?id=${producto.id}">Ver producto</a>
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


