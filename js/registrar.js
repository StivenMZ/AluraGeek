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
//Boton menú administrador 
const botonMenu = document.querySelector('[data-nav="boton-menu"]');
botonMenu.addEventListener("click", ()=>{
  window.location.href = "./productos.html";
})


//Campo imagen
let validarForm = false;
const imagenCampo = document.querySelector('[data-form="imagen-input"]');
const eliminar = document.createElement('span');
const imagenError = document.querySelector('[data-form="imagen-error"]')
const botonImagen = document.querySelector('[data-form="imagen-boton"]')
eliminar.classList.add('eliminar');
eliminar.textContent = ' x';

imagenCampo.addEventListener("mousedown", (e)=>{
e.preventDefault();
})

function ejecutarCodigoDespuesDeCargarImagen() {
  if (imagenCampo.value) {
    imagenCampo.value = "";
  }
  imagenCampo.value = imagenNombre || "Imagen";
  imagenCampo.parentNode.appendChild(eliminar);
}


botonImagen.addEventListener("click",  function(){
   widget_cloudinary.open();
});


eliminar.addEventListener('click', function() {
  imagenCampo.value = '';
  eliminar.parentNode.removeChild(eliminar);
  imagenUrl = "";
  imagenNombre = "";
});

//Campo categoria 
const categoriaCampo = document.querySelector('[data-form="categoria"]')
const categoriaError = document.querySelector('[data-form="categoria-error"]')

//Campo nombre
const nombreCampo = document.querySelector('[data-form="nombre"]');
const nombreError = document.querySelector('[data-form="nombre-error"]');



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
  
//Campo precio 

const precioCampo = document.querySelector('[data-form="precio"]');
const precioError = document.querySelector('[data-form="precio-error"]');

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

//Campo descripcion

const descripcionCampo = document.querySelector('[data-form="descripcion"]');
const descripcionError = document.querySelector('[data-form="descripcion-error"]');

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

function validarFormAgregar(){
  if(imagenCampo.value.length < 1 ){
    return false;

  }
  return validarForm;
}

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


const cloudName = 'dyxkzbd1n';
const uploadPreset = 'preset_stiven';



let imagenUrl= "";
let imagenNombre = "";
let widget_cloudinary = cloudinary.createUploadWidget({
  cloudName:  cloudName,
  uploadPreset: uploadPreset,

}, (err, result)=>{
  if(!err && result && result.event === 'success'){

    imagenUrl = result.info.secure_url;
    imagenNombre = result.info.original_filename;
    ejecutarCodigoDespuesDeCargarImagen();
  }
}) ;


form.addEventListener("submit", async (evento) => {
  evento.preventDefault();



  if(validarCamposVacios()){

    if(validarFormAgregar()){

      let imagen = imagenUrl;
      categoria = categoriaCampo.value,
      nombre = nombreCampo.value,
      precio = parseFloat(precioCampo.value),
      descripcion = descripcionCampo.value;
      imagenOriginal = imagenNombre;



      const producto = {
        imagen,
        categoria,
        nombre,
        precio,
        descripcion, 
        imagenOriginal

      }

      const response = await fetch('http://localhost:4000/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      if (response.ok) {
        alert('Producto agregado correctamente');
        window.location.href = "./productos.html";
      } else {
        alert('Error al agregar el producto');
      }  

    } else{
      alert("Hay campos vacíos o inválidos");
    }

  } else{
    
    alert ("Hay campos vacíos, por favor complétalos")
  }

})


 
/*BARRA DE BÚSQUEDA*/
barraDeBusquedaAdmin();




/*Form contacto*/ 
validarFormContacto();

}else{
  alert("No estás autenticado, por favor autentícate")
  window.location.href ="./login.html";
}


