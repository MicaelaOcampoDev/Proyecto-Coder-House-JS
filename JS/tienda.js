let stockProductosEco = []

const cargarProductos = async () => {
    const resp = await fetch ('../JS/stock.json') 
    const data = await resp.json()
    stockProductosEco = data 
    mostrarProductos(stockProductosEco)
}

cargarProductos()


// CONTENEDORES:

const containerProducts = document.getElementById('containerProducts')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const carrito = []

const mostrarProductos = (array) => {
    containerProducts.innerHTML = ''
    
    array.forEach( (producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
                    <img src=${producto.imagen} alt="" class="card-img-top cards">
                    <h2 class="h3">${producto.nombre}</h2>
                    <p>${producto.caracteristicas}</p>
                    <p class="precioProducto">Precio: $${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
                    
        `
        
        containerProducts.appendChild(div)
    } )
}

mostrarProductos(stockProductosEco)


// CARRITO  

const agregarAlCarrito = (itemId) => {

    const productoEnCarrito = carrito.find((prod) => prod.id === itemId)

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++
    } else {

        const producto = stockProductosEco.find( (prod) => prod.id === itemId)
    
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        })
    }
    

    console.log(carrito)
    actualizarCarrito()
    
}

// ACTUALIZAR CARRITO

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                <p>${prod.nombre}</p>
                <p>Precio: $${prod.precio}</p>
                <p>Cantidad: ${prod.cantidad}</p>
                <button onclick="eliminarProducto(${prod.id})" class="boton-eliminar"> <i class="fas fa-trash-alt"></i></button>
             `

        contenedorCarrito.appendChild(div)
    })

    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc += prod.cantidad, 0)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc += prod.precio * prod.cantidad, 0)
}

// ELIMINAR PRODUCTO

const eliminarProducto = (itemId) => {
    const producto = carrito.find((prod) => prod.id === itemId)
    
    producto.cantidad--

    if (producto.cantidad === 0) {
        const index = carrito.indexOf(producto)
        carrito.splice(index, 1)
    }
   
    actualizarCarrito()
}


//====== API MERCADO PAGO PARA CERRAR COMPRA  Y MAP DE CARRITO ======


const finalizarCompra =  async () => {
    const itemsToMP = carrito.map ((prod) => {
        return {
            title: prod.nombre,
            description: prod.caracteristicas,
            picture_url: prod.imagen,
            category_id: prod.id,
            quantity : prod.cantidad,
            currency_id: "ARS",
            unit_price: prod.precio
           
        }
    })

    const response= await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            Authorization: "Bearer TEST-4229075349739142-110919-2020c85d4ec23e8c4981992937d9ae1b-613693781"
        },
        body: JSON.stringify({
            items:itemsToMP,
            back_urls:{
                success:window.location.href,
                failure:window.location.href
            }
        })
    }) 

    const data = await response.json()
    
    window.location.replace(data.init_point)
        
}


// MODAL 

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('cerrarCarrito')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
contenedorModal.addEventListener('click', ()=>{
    botonCerrar.click()
})
modalCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})