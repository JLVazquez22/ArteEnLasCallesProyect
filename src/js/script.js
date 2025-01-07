const imgContainer = document.getElementById("imgContainer");
const ubicationContainer = document.getElementById("ubicationContainer");

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
            const autor = imagen.user.first_name;            
            const localizacion = imagen.user.location || "Ubicación no disponible"; 

            // CREAR IMAGENES Y LOCALIZACIÓN
            crearElementos(imagenes, autor, localizacion);
        });
    })
};


// CREAR IMAGENES E INFORMACIÓN EN EL DOM
const crearElementos = (imagenes, autor, localizacion) => {
    let fragment = document.createDocumentFragment();

    // DIV
    let divImg = document.createElement("div");
    divImg.classList.add("box__img");

    // IMG
    let img = document.createElement("img");
    img.classList.add("img");
    img.src = imagenes;

    // LIKE BUTTON
    let buttonLike = document.createElement("button");
    buttonLike.classList.add("button__like");
    // buttonLike.dataset.imagen = imagenes; // ASOCIA LA URL A LA IMAGEN DEL BOTON

    // ICON LIKE FOR THE BUTTON
    let iconLike = document.createElement("i");
    iconLike.classList.add("fas", "fa-heart");
    buttonLike.appendChild(iconLike);

    // Añadir evento de clic para gestionar favoritos
    buttonLike.addEventListener("click", () => {
        if (buttonLike.classList.contains("favorito")) {
            eliminarFavorito(imagenes);
            buttonLike.classList.remove("favorito");
        } else {
            guardarFavorito(imagenes);
            buttonLike.classList.add("favorito");
        }
    });

    divImg.appendChild(img);
    divImg.appendChild(buttonLike);
    fragment.appendChild(divImg);
    imgContainer.appendChild(fragment);

    // MOSTRAR NOMBRE AUTOR
    const nombreAutor = document.createElement("h3");
    nombreAutor.textContent = autor;
    nombreAutor.classList.add("h3__box__img");
    divImg.appendChild(nombreAutor);

    // MOSTRAR UBICACION
    const ubicacionTexto = document.createElement("p");
    ubicacionTexto.textContent = localizacion;
    ubicacionTexto.classList.add("p__box__img");
    divImg.appendChild(ubicacionTexto);

    // LLAMAR A LA FUNCION DE LA SEGUNDA API
    if (localizacion !== "Ubicación no disponible") {
        obtenerLugaresArteUrbano(localizacion, divImg);
    }
};

// FAVORITOS DE LOCALSTORAGE
const obtenerFavoritos = () => {
    const favoritos = localStorage.getItem("favoritos");
    return favoritos ? JSON.parse(favoritos) : [];
};

// GUARDAR EN LOCALSTORAGE
const guardarFavorito = (imagenUrl) => {
    let favoritos = obtenerFavoritos();
    if (!favoritos.includes(imagenUrl)) {
        favoritos.push(imagenUrl);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
};

// ELIMINAR DE LOCALSTORAGE
const eliminarFavorito = (imagenUrl) => {
    let favoritos = obtenerFavoritos();
    favoritos = favoritos.filter((fav) => fav !== imagenUrl);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

// MARCAR FAVORITOS AL CARGAR LA PAGINA
const marcarFavoritos = () => {
    const favoritos = obtenerFavoritos();
    const botones = document.querySelectorAll(".button__like");
    botones.forEach((boton) => {
        const imagenUrl = boton.dataset.imagen;
        if (favoritos.includes(imagenUrl)) {
            boton.classList.add("favorito");
        }
    });
};


// API FOURSQUARE PARA OBTENER UBICACIONES DE GALERÍAS
const obtenerLugaresArteUrbano = (localizacion, divImg) => {
    const apiKeyFoursquare = "fsq3lDQWUQIGu/49A1K/GtfaJ6Xp5S4WXiPeGyRDDQvXDyg=";  
    const rutaFoursquare = "https://api.foursquare.com/v3/places/search?query=art%20mural&near="+localizacion+"&limit=3";

    fetch(rutaFoursquare, {
        headers: {
            "Authorization": apiKeyFoursquare,
        }
    })
    .then(datos => datos.json())
    .then(datosjson => {
        const lugares = datosjson.results;
        if (lugares.length > 0) {
            const listaLugares = document.createElement("ul");
            listaLugares.classList.add("lugares__list");

            lugares.forEach(lugar => {
                const lugarElemento = document.createElement("p");
                lugarElemento.textContent = "Lugar: "+lugar.name+" - Dirección: "+lugar.location.address;
                lugarElemento.classList.add("lugar__item");
                divImg.appendChild(lugarElemento);
            });
        } else {
            divImg.appendChild(document.createTextNode("No se encontraron galerías cercanas."));
        }
    })
};

document.addEventListener("DOMContentLoaded", () => {
    obtenerImagenes();
    marcarFavoritos();
});


