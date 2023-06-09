const btnLogin = document.querySelector('[data-login="entrar"]');

function ayudaBusqueda(pantalla) {
  const busquedaIcono = document.querySelector(".header__navegacion__busqueda_lupa");
  const barraBusqueda = document.querySelector(".header__navegacion__busqueda__input");
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
        busquedaIcono.style.display = "flex";
        busquedaIcono.style.left = "-9.1%";
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
        busquedaIcono.style.display = "flex";
        busquedaIcono.style.left = "50%";
      })
      buscar.addEventListener("click", () => {
        const search = barraBusqueda.value;
        if (barraBusqueda.value.length < 1) {
          return false;
        } else {
          window.location.href = `./${pantalla}.html?search=${search}` ||  `./docs/${pantalla}.html?search=${search}`;
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
            window.location.href = `./${pantalla}.html?search=${search}` || `./docs/${pantalla}.html?search=${search}`;
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
      window.location.href = `./${pantalla}.html?search=${search}` ||  `./docs/${pantalla}.html?search=${search}`;
    }
  }
  barraBusqueda.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      irBusqueda();
    }
  })
  lupaPantallaMayor.addEventListener("click", irBusqueda)
}
/*ADMIN*/
export function barraDeBusquedaAdmin() {
  ayudaBusqueda("resultados");
}
/*USUARIOOO*/
export function barraDeBusquedaUsuario() {
  ayudaBusqueda("resultadouser");
}