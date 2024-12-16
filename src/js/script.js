const imgContainer = document.getElementById("imgContainer");

// API UNSPLASH PARA OBTENER IMAGENES
const obtenerImagenes = () => {
    const apiKeyUnSplash = "52FaxePhdgXPAT6Qiix6PezXgbpLdgfCWlysYNlOcVM"; 
    const rutaUnSplash = "https://api.unsplash.com/search/photos?query=street%20art&client_id="+apiKeyUnSplash+"&per_page=30";

    fetch(rutaUnSplash)
    .then((datos) => datos.json())
    .then((datosjson) => {
        const arrayImagenes = datosjson.results;
        console.log(arrayImagenes);
        
        arrayImagenes.forEach(imagen => {
            const imagenes = imagen.urls.regular;
            const localizacion = imagen.user.location || "Ubicación no disponible"; 

            // CREAR IMAGENES Y LOCALIZACIÓN
            crearElementos(imagenes, localizacion);
        });
    })
};


// CREAR IMAGENES E INFORMACIÓN EN EL DOM
const crearElementos = (imagenes, localizacion) => {
    let fragment = document.createDocumentFragment();

    let divImg = document.createElement("div");
    divImg.classList.add("box__img");
    let img = document.createElement("img");
    img.classList.add("img");
    img.src = imagenes;
    divImg.appendChild(img);
    fragment.appendChild(divImg);
    imgContainer.appendChild(fragment);

     // MOSTRAR UBICACION
     const ubicacionTexto = document.createElement("p");
     ubicacionTexto.textContent = localizacion;
     divImg.appendChild(ubicacionTexto);
 
     // LLAMAR A LA FUNCION DE LA SEGUNDA API
     if (localizacion !== "Ubicación no disponible") {
         obtenerLugaresArteUrbano(localizacion, divImg);
     }
};

// API FOURSQUARE PARA OBTENER UBICACIONES DE GALERÍAS
const obtenerLugaresArteUrbano = (localizacion, divImg) => {
    const apiKeyFoursquare = "fsq3lDQWUQIGu/49A1K/GtfaJ6Xp5S4WXiPeGyRDDQvXDyg=";  
    const rutaFoursquare = "https://api.foursquare.com/v3/places/search?query=art%20mural&near="+localizacion+"&limit=5";

    fetch(rutaFoursquare, {
        headers: {
            "Authorization": apiKeyFoursquare,
        }
    })
    .then(datos => datos.json())
    .then(datosjson => {
        const lugares = datosjson.results;
        if (lugares.length > 0) {
            lugares.forEach(lugar => {
                const lugarElemento = document.createElement("p");
                // lugarElemento.textContent = "Lugar: "+lugar.name+" - Dirección: "+lugar.location.address || 'No disponible'+"";
                divImg.appendChild(lugarElemento);
            });
        } else {
            divImg.appendChild(document.createTextNode("No se encontraron lugares de arte urbano cercanos."));
        }
    })
};

document.addEventListener("DOMContentLoaded",obtenerImagenes);
