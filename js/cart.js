const contenedorTarjetas = document.getElementById('cart-container');
const cantidadElement = document.getElementById('cantidad');
const precioElement = document.getElementById('precio');
const carritoVacioElement= document.getElementById('carrito-vacio');
const totalesContainer= document.getElementById('totales'); 

//crea las tarjetas de productos teniendo en cuenta lo guardado en el localStorage
function crearTarjetasProductosCarrito(){
    contenedorTarjetas.innerHTML='';
    const productos = JSON.parse(localStorage.getItem('recetas'));
    if(productos && productos.length>0){
    productos.forEach((producto) => {
        const nuevaReceta = document.createElement('div');
        nuevaReceta.classList = 'tarjeta-producto';
        nuevaReceta.innerHTML = `
        <img src='../${producto.img}'>
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}€</p>
        <div>
            <button>-</button>
            <span class ="cantidad">${producto.cantidad}</span>
            <button>+</button>
        </div>
        `;
        contenedorTarjetas.appendChild(nuevaReceta)
        nuevaReceta.getElementsByTagName('button')[0]
        .addEventListener('click',(e)=>{
            const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
            cantidadElement.innerText = restarAlCarrito(producto);
            crearTarjetasProductosCarrito();
            
            actualizarTotales();
        });
    nuevaReceta
    .getElementsByTagName('button')[1]
    .addEventListener('click', (e) => {
        const cantidadElement = e.target.parentElement.getElementsByClassName('cantidad')[0];
        cantidadElement.innerText = agregarAlCarrito(producto);
        actualizarTotales()
        }); 
    });
}
revisarMensajeVacio()
actualizarTotales()
actualizarNumeroCarrito()
}

crearTarjetasProductosCarrito();

//Actualiza el total del precio y unidades de la pagina del carrito

function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem('recetas'));
    let cantidad = 0;
    let precio = 0;
    if(productos && productos.length > 0) {
        productos.forEach((producto) =>{
            cantidad += producto.cantidad;
            precio += producto.precio*producto.cantidad;
        });
    }
    cantidadElement.innerText = cantidad;
    precioElement.innerText = precio;
    if(precio === 0){
        reiniciarCarrito();
        revisarMensajeVacio();
    }
}

document.getElementById('reiniciar').addEventListener('click', () => {
    Swal.fire({
        title: "Haz vaciado el carrito",
        text: "Te esperamos nuevamente",
        icon: "warning"
    });
    contenedorTarjetas.innerHTML = '';
    reiniciarCarrito();
    revisarMensajeVacio();
});

document.getElementById('comprar').addEventListener('click',()=>{
    if(agregarAlCarrito('recetas') > 0){
    Swal.fire({
        title: "Gracias por comprar con nosotros",
        text: "Te esperamos nuevamente",
        icon: "success"
    });
    }else{
        Swal.fire({
            title: "El carrito está vacío",
            text: "Agrega al menos un producto",
            icon: "warnning"
        });
    }
    contenedorTarjetas.innerHTML = '';
    
    reiniciarCarrito();
    actualizarTotales()
    revisarMensajeVacio();
})

//Muestra o esconde el mensaje de que no hay nada en el carrito

function revisarMensajeVacio(){
    const productos =JSON.parse(localStorage.getItem('recetas'));
    carritoVacioElement.classList.toggle('escondido',productos);
    totalesContainer.classList.toggle('escondido', !productos);
}
