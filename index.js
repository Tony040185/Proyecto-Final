const api_url_popular = `https://api.giphy.com/v1/gifs/trending?api_key=TBacSLOiPkB3veQuMPpdZhjiY0usOscB`;
const api_url_busqueda = `https://api.giphy.com/v1/gifs/search`
let buscar = "?q=";
const apikey = `&api_key=TBacSLOiPkB3veQuMPpdZhjiY0usOscB`;

let q = "";
urlCompleta = "";
let pagina = 1;


//scroll infinity
let observador = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entradas => {
        if (entradas.isIntersecting) {
            pagina++;
            displayTrending();
        }
        
    })
}, {
    rootMargin: '0px 0px 50px 0px',
    threshold: 1.0
})

const displayTrending = async () => {
    await fetch(api_url_popular).then ((Response) => {
        return Response.json();
    }).then((giphy) => {
        console.log(giphy);

        for(let i = 0; i < giphy.data.length; i++) {
            const gif = document.createElement("img");
            gif.src = giphy.data[i].images["original"].url;
            document.getElementById("figuras").appendChild(gif);
        }
    })
    const gifsEnPantalla = document.querySelectorAll('#figuras img');
    let ultimoGif = gifsEnPantalla[gifsEnPantalla.length - 1];
    observador.observe(ultimoGif);
}
displayTrending();

const boton = document.getElementById("boton");
boton.onclick = () => {
    document.getElementById('figuras').innerHTML = "";
    q = document.getElementById('search').value;
    urlCompleta = api_url_busqueda + buscar + q + apikey;
    getData();    
}

boton.onclick = () => {
    searchValue();
}

//vamos a agregar scroll infinity a la busqueda
let observador1 = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entradas => {
        if (entradas.isIntersecting) {
            pagina++;
            getData();
        }
        
    })
}, {
    rootMargin: '0px 0px 50px 0px',
    threshold: 1.0
})

//Que se busca

const getData = async () => {
    try{ 
        await fetch(urlCompleta).then ((response) => {
        return response.json();
    }).then((giphy) => {
        console.log(giphy);

    for(let i = 0; i < giphy.data.length; i++) {
        const gif = document.createElement("img");
        gif.src = giphy.data[i].images["original"].url;
        document.getElementById("figuras").appendChild(gif)
    }
    })
    const gifsEnPantalla = document.querySelectorAll('#figuras img');
    let ultimoGif = gifsEnPantalla [gifsEnPantalla.length - 1];
    observador.observe(ultimoGif);
}catch (e) {
    document.getElementById('figuras').innerHTML ="<b style='color:blue'>Su Busqueda No Arrojo Resultados</b>"
}

}

//ultimas busquedas

const enviarValor = (search) => {
    document.getElementById('search2').value = search;
    searchValue();
      
}

const searchValue = () => {
    document.getElementById('figuras').innerHTML = "";
    q = document.getElementById('search').value;

    if (q == "") {
        q= document.getElementById('search2').value;
        document.getElementById('search').value = '';
    }
    urlCompleta = api_url_busqueda + buscar + apikey
    getData();
}