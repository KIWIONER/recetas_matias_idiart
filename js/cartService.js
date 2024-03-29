const cuentaCarritoElement = document.getElementById('cuenta-carrito');

//Toma un objeto producto o un objeto con al menos un id y lo agrega al carrito
function agregarAlCarrito(producto){
    //reviso si el producto está en el carrito
    let memoria = JSON.parse(localStorage.getItem('recetas'));
    let cantidadProductoFinal;
    //si no hay localStorage lo creo;
    if(!memoria || memoria.length === 0){
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem('recetas',JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
    }else {
        //si hay localStorage me fijo si el articulo ya está ahi.
        const indiceProducto = memoria.findIndex(receta => receta.id === producto.id)
        const nuevaMemoria = memoria;
        if(indiceProducto === -1){
            const nuevoProducto = getNuevoProductoParaMemoria(producto);
            nuevaMemoria.push(nuevoProducto);
            cantidadProductoFinal = 1;
            //localStorage.setItem('recetas',JSON.stringify(nuevaMemoria));
        }else{
            //SI el producto está en el carrito le agrego 1 a la cantidad.
            nuevaMemoria[indiceProducto].cantidad++;
            cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
            
        }
        localStorage.setItem('recetas',JSON.stringify(nuevaMemoria));
        actualizarNumeroCarrito();
        return cantidadProductoFinal;
    }
}

//Resta una unidad de un producto al carrito
function restarAlCarrito(producto){
    let memoria = JSON.parse(localStorage.getItem('recetas'));
    let cantidadProductoFinal = 0;
    const indiceProducto = memoria.findIndex(receta => receta.id === producto.id)
    let nuevaMemoria = memoria;
    nuevaMemoria[indiceProducto].cantidad--;
    cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    if(cantidadProductoFinal === 0){
        nuevaMemoria.splice(indiceProducto,1)
    };
    localStorage.setItem('recetas',JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
}

//toma un producto, le agrega cantidad 1 y lo devuelve
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

//Actualiza el numero del carrito del header
function actualizarNumeroCarrito(){
    let cuenta = 0;
    const memoria= JSON.parse(localStorage.getItem('recetas'));
    if(memoria && memoria.length > 0){
        cuenta = memoria.reduce((acum,current)=>acum+current.cantidad,0)
        return cuentaCarritoElement.innerText = cuenta;
    }
    cuentaCarritoElement.innerText = 0;
}

function reiniciarCarrito(){
    localStorage.removeItem('recetas');
    actualizarNumeroCarrito();
}
actualizarNumeroCarrito();