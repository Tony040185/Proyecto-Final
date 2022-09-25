//Variables

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaBusquedas');
let arrayBusquedas = [];

//Funciones     

const crearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: true
    }
    arrayBusqueda.push(item);
    return item;
}

const guardarDB = (actividad) => {
    localStorage.setItem('busqueda', JSON.stringify(arrayBusquedas));
    pintarDB();
}


const pintarDB = () => {
    listaActividadesUI.innerHTML = '';
    arrayBusquedas = JSON.parse(localStorage.getItem('busqueda'));
    if (arrayBusquedas.length > 3) {
        arrayBusquedas.shift();
    }
    if (arrayBusquedas === null) {
        arrayBusquedas = [];
    } else {
        arrayBusquedas.forEach(Element => {
            listaActividadesUI.innerHTML += `
            <div>
            <b class="clickeable" onclick="enviarValor('${Element.actividad}')">${Element.actividad}</b> 
            </div>`
        });
    }
}

//escuchar el evento del click del boton

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();
    let actividadUI = document.getElementById('search').value;
    crearItem(actividadUI);
    guardarDB();
    formularioUI.reset();
});


document.addEventListener('DOMContentLoaded', pintarDB)