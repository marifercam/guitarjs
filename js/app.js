import { db } from './guitarras.js';

const divContainer = document.querySelector('main div');
const carrito = []

const createDiv = (guitar) => {
    const div = document.createElement('div');
    div.className = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `<div class="col-4">
                    <img class="img-fluid" src="./img/${guitar.imagen}.jpg" alt="imagen guitarra">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${ guitar.nombre }</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae labore odit magnam in autem nesciunt, amet deserunt</p>
                    <p class="fw-black text-primary fs-3">$${ guitar.precio}</p>
                    <button 
                    data-id="${ guitar.id }"
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`
    div.innerHTML = html;
    return div;
}

//utilizando interadores
db.forEach( guitar => {
    divContainer.appendChild( createDiv(guitar) );
})
const cardClicked = (e) =>{
    if(e.target.classList.contains('btn')){
        //console.log('Le diste al botón',e.target.getAttribute('data-id'))
        const idGuitar = Number(e.target.getAttribute('data-id'))
       // const indexdb = db.findIndex(guitar => guitar.id === Number(idGuitar))
       //si la guitarra ya existe incrementamos cantidad 1
       //En caso de que no agregamos una nueva
    if(!carrito.some(g => g.id === idGuitar)){
        carrito.push({
            ...db[idGuitar],
            cantidad: 1
    })
        
    } else{
        const idCarrito = carrito.findIndex(g => g.id === idGuitar)
        const currentGuitar = carrito[idCarrito]
        currentGuitar.cantidad++
    }
    console.log(carrito)
}
divContainer.addEventListener('click', cardClicked)