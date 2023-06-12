const section = document.querySelector(".contacto");

const rutaImg = (ruta1, ruta2)=>{
  var img = new Image();
  img.src = ruta1;

  if(img.complete && img.naturalWidth !== 0){
    return ruta1
  }else{
    return ruta2
  }
}

/* ../assets/Logo.png  ./assets/Logo.png*/

const contenido = `
<div class="contacto__informacion">
<div class="contacto__informacion__div">
<div class="contacto__informacion__logo">
<img src="../assets/Logo.png" alt="Logo Alurageek">
</div>
<div class="contacto__informacion__opciones">
    <ul class="contacto__informacion__opciones__lista">
        <li><a href="">Quienes somos</a></li>
        <li><a href="">Política de Privacidad</a></li>
        <li><a href="">Programa de fidelidad</a></li>
        <li><a href="">Nuestras tiendas</a></li>
        <li><a href="">Quiero ser franquiciado</a></li>
        <li><a href="">Anúncie aquí</a></li>
    </ul>
</div>    
</div>
<div class="contacto__informacion__form">
    <h3 class="contacto__informacion__form__titulo">Hable con nosotros</h3>
    <form action="" class="contacto__informacion__form__formulario" data-contacto="form">
        <div class="contacto__informacion__form__formulario__div">                                    
        <p>Nombre</p>
        <input type="text" id="nombre" name="name" class="contacto__informacion__form__formulario__div__nombre" data-contacto="form-nombre">
        </div>
        <div class="contacto__informacion__form__formulario__error-nombre" data-contacto="error-nombre"></div>

        <textarea id="mensaje" name="mensaje"
            class="contacto__informacion__form__formulario__mensaje" placeholder="Escribe tu mensaje" data-contacto="form-mensaje"></textarea>
            <div  class="contacto__informacion__form__formulario__error-mensaje" data-contacto="error-mensaje"></div>

        <button type="submit" class="contacto__informacion__form__formulario__boton" data-contacto="enviar"><p>Enviar mensaje</p></button>
    </form>
</div>
</div>
`;



export const elementosContacto ={section, contenido}

export function validarFormContacto(){
    const formularioContacto = document.querySelector('[data-contacto="form"]');

const campoNombre = document.querySelector('[data-contacto="form-nombre" ]');
const campoMensaje = document.querySelector('[data-contacto="form-mensaje"]');
const nombreError = document.querySelector('[data-contacto="error-nombre"]');
const mensajeError = document.querySelector('[data-contacto="error-mensaje"]');


formularioContacto.addEventListener("submit", (evento)=>{
    evento.preventDefault();
})

const nombreCaracteresMax = 40;
const mensajeCaracteresMax = 120;

const validarFormulario = () =>{
    let esValido = true;


    const nombre = campoNombre.value.trim();
    const mensaje = campoMensaje.value.trim();

    if (nombre === "") {
        esValido = false;
        nombreError.innerText = "Debes ingresar un nombre, el campo está vacío";
      } else if (nombre.length > nombreCaracteresMax) {
        esValido = false;
        nombreError.innerText = `El nombre debe tener como máximo ${nombreCaracteresMax} caracteres.`;
      } else {
        nombreError.innerText = "";
      }

      if (mensaje === "") {
        esValido = false;
        mensajeError.innerText = "Debes ingresar un mensaje, el campo está vacío";
      } else if (mensaje.length > mensajeCaracteresMax) {
        esValido = false;
        mensajeError.innerText = `El mensaje debe tener como máximo ${mensajeCaracteresMax} caracteres.`;
      } else {
        mensajeError.innerText = "";
      }

      return esValido;

   

}

formularioContacto.addEventListener("submit", (event) => {
    event.preventDefault();
  
    if (validarFormulario()) {
      console.log("valido");
    }
  });
}

