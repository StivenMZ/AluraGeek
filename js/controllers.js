/*Eliminar PRODUCTO*/
function eliminarProducto(){
const eliminarIcono = document.querySelectorAll('[data-producto="eliminar"]');
    
    
eliminarIcono.forEach(boton =>{
    boton.addEventListener('click', async(event)=>{
        event.preventDefault();
        let respuesta = prompt(`¿Deseas eliminar este producto? responde "SI" o "NO" en mayúsculas, ejemplo: SI`)
    if(respuesta === "SI"){
        if (event.target.dataset.producto === "eliminar") { 
      const productoId = boton.dataset.id;
      eliminarProducto(productoId);
      event.target.closest("li").remove();
    } 
} else if (respuesta ==="NO"){
    return;
}
    });
  });

  async function eliminarProducto(idProducto) {
    try {
      const response = await fetch(`http://localhost:4000/productos/${idProducto}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Producto eliminado correctamente");
      } else {
        console.error("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
}
}
/*Editar producto*/
function editarProducto(){
const editarIcono = document.querySelectorAll('[data-producto="editar"]'); 


editarIcono.forEach(boton =>{
  boton.addEventListener('click', async(event)=>{ 
    console.log("prueba");
      if (event.target.dataset.producto === "editar") { 
    const productoId = boton.dataset.id;
    
    window.location.href = `./editar.html?id=${productoId}`;

  } 
  });
});
}

export const controladores = {
    eliminarProducto,
    editarProducto
}
