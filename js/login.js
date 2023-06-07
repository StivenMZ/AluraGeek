import { elementosContacto } from "./contacto.js";
import { barraDeBusquedaUsuario } from "./barraBusqueda.js";
import { validarFormContacto } from "./contacto.js";

elementosContacto.section.innerHTML = elementosContacto.contenido;


const formulario = document.querySelector('[data-login="formulario"]');
const correo = document.querySelector('[data-login="correo"]');
const contrasenia = document.querySelector('[data-login="contrasenia"]');

const correoError = document.querySelector('[data-login="error-correo"]');
const contraseniaError = document.querySelector('[data-login="error-contrasenia"]');

let usuarioValido = false;

let camposVacios = true;
function validarCorreo (){
    const valor = correo.value.trim();

    if(valor ===""){
        correoError.innerHTML = "Por favor ingrese un correo, el campo no debe estar vacío";
        camposVacios = true;
        return false
    } else{
        correoError.innerHTML = "";
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!expresionCorreo.test(valor)){
        correoError.innerHTML = "Correo inválido, debe cumplir el siguiente formato ejemplo@ejemplo.com";
        return false
    } else{
        correoError.innerHTML ="";
    }
    camposVacios = false;
    return true;
}

function validarContrasenia (){
    const valor = contrasenia.value.trim();

    if(valor === ""){
        contraseniaError.innerHTML = "Por favor ingrese su contraseña, el campo no debe estar vacío";
        camposVacios = true;
        return false;  
    } else{
        contraseniaError.innerHTML = "";
    }
    camposVacios = false;
    return true;

}
let usuarioId;

async function validarFormulario (){
    const response = await fetch('http://localhost:3000/usuarios');
    const data = await response.json();

    const usuario = data.find(u => u.correo === correo.value & u.contrasenia === contrasenia.value)

    if(usuario){
        usuarioValido = true;
    } else{
        usuarioValido = false
    }
}


correo.addEventListener("blur", validarCorreo);
contrasenia.addEventListener("blur", validarContrasenia);

/*Funcion crear Cookie*/
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        session: true, // establecer session en true para que la cookie se elimine al cerrar el navegador
        ...options
    };

    value = encodeURIComponent(value);

    let updatedCookie = name + '=' + value;

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if(camposVacios){
        alert("Hay campos vacíos, por favor complétalos")
    } else{
    await validarFormulario();
  
    if (usuarioValido) {
      const response = await fetch(`http://localhost:3000/usuarios/${usuarioId}`);
      const data = await response.json();
  
     //COKIE PARA VALIDAR SESION

     setCookie('token', 'abc123', {session: true});
     setCookie('username', 'johndoe', {session: true});

     //
      window.location.href = "./productos.html";
    } else {
     alert ("Usuario y/o correo no coinciden o no están registrados");
    }}
  });

/*BARRA DE BÚSQUEDA*/
barraDeBusquedaUsuario();

/*Form contacto*/ 
validarFormContacto();






  