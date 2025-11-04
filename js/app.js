import { db } from './guitarras.js'

const divContainer = document.querySelector('main div')
const carritoContainer = document.querySelector('#carrito')
const buttonVai = document.querySelector('#button-vai')

let carrito = []

const createDiv = (guitar) => {
    const div = document.createElement('div')
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `<div class="col-4">
                    <img class="img-fluid" src="./img/${ guitar.imagen }.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${ guitar.nombre }</h3>
                    <p>${ guitar.descripcion }</p>
                    <p class="fw-black text-primary fs-3">$${ guitar.precio }</p>
                    <button 
                        data-id="${ guitar.id }"
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`
    div.innerHTML = html
    return div
}

const createCart = (carrito) => {
    const p = '<p class="text-center">El carrito esta vacio</p>'
    let total = 0
    let html = `<table class="w-100 table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>`
    carrito.forEach(g => {
        total += g.precio * g.cantidad
        html += `<tr data-id="${ g.id }">
                    <td>
                        <img class="img-fluid" src="./img/${ g.imagen }.jpg" alt="imagen guitarra">
                    </td>
                    <td>${ g.nombre }</td>
                    <td class="fw-bold">
                        $${ g.precio }
                    </td>
                    <td class="flex align-items-start gap-4">
                        <button
                            type="button"
                            class="btn btn-dark"
                        >-</button>
                            ${ g.cantidad }
                        <button
                            type="button"
                            class="btn btn-dark"
                        >+</button>
                    </td>
                    <td>
                        <button
                            class="btn btn-danger"
                            type="button"
                        >X</button>
                    </td>
                </tr>`
    })
    html += `</tbody>
                </table>

                <p class="text-end">Total pagar: <span class="fw-bold">$${ total }</span></p>
                <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>`
    if(carrito.length === 0){
        carritoContainer.innerHTML = p
    } else {
        carritoContainer.innerHTML = html
    }
}

db.forEach(guitar => {
    divContainer.appendChild(createDiv(guitar))
})

const obtieneCarrito = () => {
    const carritoStorage = localStorage.getItem('carrito')
    if(carritoStorage){
        carrito = JSON.parse(carritoStorage)
    } else {
        carrito = []
    }
}

const guardaCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const carritoClicked = (e) => {
    if(e.target.classList.contains('btn')){
        const btn = e.target.innerText
        const idCarrito = e.target
            .parentElement
            .parentElement.getAttribute('data-id')
        const idxCarrito = carrito
            .findIndex(g => g.id === Number(idCarrito))
        if(btn === '-') {
            if(carrito[idxCarrito].cantidad > 1){
                carrito[idxCarrito].cantidad--
            }
        } else if(btn === '+'){
            if(carrito[idxCarrito].cantidad < 10){
                carrito[idxCarrito].cantidad++
            }
        } else if(btn === 'X'){
            carrito = carrito.filter(g => g.id !== Number(idCarrito))
        } else if(btn === 'VACIAR CARRITO'){
            carrito = []
        }
        guardaCarrito()
        createCart(carrito)
    }
}

const cardClicked = (e) => {
    if(e.target.classList.contains('btn')) {
        //console.log('Le diste al botón', e.target.getAttribute('data-id'))
        const idGuitar = Number(e.target.getAttribute('data-id'))
        //const indexdb = db.findIndex(guitar => guitar.id === Number(idGuitar))
        // Si la guitarra ya existe incrementamos cantidad en 1
        // En caso de que no agregamos una nueva
        const idxGuitar = carrito.findIndex(g => g.id === idGuitar) 
        if(idxGuitar === -1){
            carrito.push({
                ...db[idGuitar - 1],
                cantidad: 1
            })    
        } else {
            if(carrito[idxGuitar].cantidad < 10){
                carrito[idxGuitar].cantidad++
            }
        }
        guardaCarrito()
        createCart(carrito)
    }
}

obtieneCarrito()
createCart(carrito)

divContainer.addEventListener('click', cardClicked)
carritoContainer.addEventListener('click', carritoClicked)
buttonVai.addEventListener('click', cardClicked)