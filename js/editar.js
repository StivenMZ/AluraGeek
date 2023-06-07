
import { elementosContacto } from "./contacto.js";
import { barraDeBusquedaAdmin } from "./barraBusqueda.js";
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
const botonImagen = document.querySelector('[data-form="imagen-boton"]');
const imagenCampo = document.querySelector('[data-form="imagen-input"]');
const eliminar = document.createElement('span');
eliminar.classList.add('eliminar');
eliminar.textContent = ' x';
eliminar.addEventListener('click', function() {
    imagenCampo.value = '';
    eliminar.parentNode.removeChild(eliminar);
    imagenUrl = "";
    imagenNombre = "";
  });
  

const cloudName = 'dyxkzbd1n';
const uploadPreset = 'preset_stiven';



let imagenUrl= "";
let imagenNombre = "";
let widget_cloudinary = cloudinary.createUploadWidget({
  cloudName:  cloudName,
  uploadPreset: uploadPreset,

}, (err, result)=>{
  if(!err && result && result.event === 'success'){
    console.log("Imagen subida con éxito: ");
    imagenUrl = result.info.secure_url;
    imagenNombre = result.info.original_filename;
    ejecutarCodigoDespuesDeCargarImagen();
  }
}) ;

function ejecutarCodigoDespuesDeCargarImagen() {
    if (imagenCampo.value) {
      imagenCampo.value = "";
    }
    imagenCampo.value = imagenNombre;
    imagenCampo.parentNode.appendChild(eliminar);
  }
  
  botonImagen.addEventListener("click",  function(){
    widget_cloudinary.open();
 });



const idProducto = new URLSearchParams(window.location.search).get("id");
const categoriaCampo = document.querySelector('[data-form="categoria"]');
const nombreCampo = document.querySelector('[data-form="nombre"]');
const precioCampo = document.querySelector('[data-form="precio"]');
const descripcionCampo = document.querySelector('[data-form="descripcion"]');

const imagenError = document.querySelector('[data-form="imagen-error"]')
const categoriaError = document.querySelector('[data-form="categoria-error"]')
const nombreError = document.querySelector('[data-form="nombre-error"]');
const precioError = document.querySelector('[data-form="precio-error"]');
const descripcionError = document.querySelector('[data-form="descripcion-error"]');



fetch(`http://localhost:4000/productos/${idProducto}`)
  .then(response => response.json())
  .then(producto => {
    console.log(producto);

    imagenCampo.value = producto.imagenOriginal;
    categoriaCampo.value = producto.categoria;
    nombreCampo.value = producto.nombre;
    precioCampo.value = producto.precio;
    descripcionCampo.value = producto.descripcion;

  });

  function validarCampoVacio(input, inputError, nombreCampo){
    if(input.value.length>0){
      inputError.innerHTML = "";
      return true;
    }else{
      inputError.innerHTML = `El campo ${nombreCampo} no puede estar vacío`;
      return false;
    }
  }
  

  function validarCamposVacios(){
  
    validarCampoVacio(imagenCampo, imagenError, "Imagen" );
     validarCampoVacio(categoriaCampo, categoriaError, "Categoría") ;
     validarCampoVacio(nombreCampo, nombreError, "Nombre del producto");
     validarCampoVacio(precioCampo, precioError, "Precio del producto") ;
      validarCampoVacio(descripcionCampo, descripcionError, "Descripción del producto");
    
    return ( validarCampoVacio(imagenCampo, imagenError, "Imagen" )
    && validarCampoVacio(categoriaCampo, categoriaError, "Categoría") 
    && validarCampoVacio(nombreCampo, nombreError, "Nombre del producto")
    && validarCampoVacio(precioCampo, precioError, "Precio del producto") 
    &&  validarCampoVacio(descripcionCampo, descripcionError, "Descripción del producto"))
    
  }

  let validarForm = true;

function validarNombre(inputNombre){
    if(inputNombre.value.length >20 ){
        nombreError.innerHTML = `Error, el campo nombre del producto solo puede tener 20 carácteres, estás usando ${inputNombre.value.length} `;
        return validarForm = false;
    } else{
      nombreError.innerHTML = "";
      return validarForm = true;
    }
}

nombreCampo.addEventListener("blur", function() {
    validarNombre(nombreCampo);
  });
  

  function validarPrecio(inputPrecio){
    if(isNaN(inputPrecio.value)){
      precioError.innerHTML = "Error, solo puedes ingresar números";
      return validarForm = false;
    }else{
      precioError.innerHTML = "";
      return validarForm = true;
    }
  }
  
  precioCampo.addEventListener("blur", function(){
    validarPrecio(precioCampo);
  });



  function validarDescripcion(inputDescripcion){
    if(inputDescripcion.value.length >150 ){
        descripcionError.innerHTML = `Error, el campo descripción del producto solo puede tener 150 carácteres, estás usando ${inputDescripcion.value.length} `;
        return validarForm = false;
    } else{
      descripcionError.innerHTML = "";
      return validarForm = true;
    }
  }
  
  descripcionCampo.addEventListener("blur", function() {
    validarDescripcion(descripcionCampo);
  });


const form = document.querySelector('[data-form="form"]');
form.addEventListener("submit", async(evento)=>{
    evento.preventDefault();
    console.log(evento);

    if(validarForm){
        if(validarCamposVacios()){
            console.log("prueba");

    await  fetch(`http://localhost:4000/productos/${idProducto}`)
    .then(response => response.json())
    .then(producto => {
    
    // Modificar el valor de la propiedad precio
    if(imagenUrl === ""){
      producto.imagen = producto.imagen
      producto.imagenOriginal = producto.imagenOriginal;
    }else{
      producto.imagen = imagenUrl;
      producto.imagenOriginal = imagenNombre;
    }
    producto.categoria  = categoriaCampo.value;
    producto.nombre = nombreCampo.value;
    producto.precio = precioCampo.value;
    producto.descripcion = descripcionCampo.value;

    fetch(`http://localhost:4000/productos/${idProducto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      })
      .then(response => response.json())
      .then(data => {
        alert("Producto actualizado con éxtio");
        window.location.href ="./productos.html"
    })
      .catch(error => {
        console.error('Error:', error);
        alert("Error al actualizar el producto");
      });



  });

        } else{
            alert("Hay campos vacíos, por favor revisa");
        }
    } else {
        alert("Hay campos inválidos, por favor revisa");
    }
})

const volverMenu = document.querySelector(".header__login_button");
volverMenu.addEventListener("click", ()=>{
  window.location.href= "./productos.html";
})



/*BARRA DE BÚSQUEDA*/
barraDeBusquedaAdmin();


const lupaPantallaMayor = document.querySelector(".header__navegacion__busqueda_lupa");

lupaPantallaMayor.addEventListener("click", ()=>{
  const search = barraBusqueda.value;
  if(barraBusqueda.value.length<1 ){
    return false;
  }else{
    window.location.href = `./resultados.html?search=${search}`;
  }
  
 })



/*Form contacto*/ 
validarFormContacto();
}else{
  alert("No estás autenticado, por favor autentícate")
  window.location.href ="./login.html";
}


