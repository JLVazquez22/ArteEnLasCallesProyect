const imgContainer = document.getElementById("imgContainer");

const obtenerImagenes = () => {
    const apiKey = "52FaxePhdgXPAT6Qiix6PezXgbpLdgfCWlysYNlOcVM"; 
    const ruta = "https://api.unsplash.com/search/photos?query=street%20art&client_id="+apiKey+"&per_page=10";

    fetch(ruta)
    .then((datos) => datos.json())
    .then((datosjson) => {
            const arrayImagenes = datosjson.results;
            console.log(arrayImagenes);
            
            arrayImagenes.forEach(imagen => {
                const imagenes = imagen.urls.regular;
                // INFORMACION DESCRIPCION, FECHA DE CREACION, AUTOR (fotografo)
                // console.log(imagen.urls);  
                crearImagenes(imagenes);

            });
        })
};

const crearImagenes = (imagenes) =>{
    let fragment = document.createDocumentFragment();

    let divImg = document.createElement("div");
    divImg.classList.add("box__img")
    let img = document.createElement("img");
    img.classList.add("img");
    img.src = imagenes;
    divImg.appendChild(img);
    fragment.appendChild(divImg);
    imgContainer.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded",obtenerImagenes);
