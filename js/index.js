const contenedorTarjetas = document.getElementById('productos-container')

function crearTarjetasProductosInicio(productos){
    recetas.forEach(producto => {
        const nuevaReceta= document.createElement('div');
        nuevaReceta.classList = 'tarjeta-producto';
        nuevaReceta.innerHTML = `
        <img src='${producto.img}'>
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}€</p>
        <button>Agregar al carrito</button>`
        contenedorTarjetas.appendChild(nuevaReceta)
        nuevaReceta.getElementsByTagName('button')[0].addEventListener('click',() =>agregarAlCarrito(producto))
    });
}

crearTarjetasProductosInicio(recetas);
