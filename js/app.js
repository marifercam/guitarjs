import { db } from './guitarras.js';

const divContainer = document.querySelector('main div');

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