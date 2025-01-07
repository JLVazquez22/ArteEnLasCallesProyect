document.addEventListener("DOMContentLoaded", () => {
    const favoritosContainer = document.getElementById("favoritosContainer");

    // OBTENER FAVORITOS DESDE LOCALSTORAGE
    const obtenerFavoritos = () => {
        const favoritos = localStorage.getItem("favoritos");
        return favoritos ? JSON.parse(favoritos) : [];
    };

    // MOSTRAR FAVORITOS
    const mostrarFavoritos = () => {
        const favoritos = obtenerFavoritos();

        if (favoritos.length === 0) {
            favoritosContainer.innerHTML = "<p>No tienes imágenes favoritas aún.</p>";
            return;
        }

        favoritos.forEach((imagenUrl) => {
            // DIV
            const divImg = document.createElement("div");
            divImg.classList.add("box__img");
            // IMG
            const img = document.createElement("img");
            img.classList.add("img");
            img.src = imagenUrl;

            // ELIMINAR FAV
            const buttonRemove = document.createElement("button");
            buttonRemove.textContent = "Eliminar de Favoritos";
            buttonRemove.classList.add("button__remove");
            buttonRemove.addEventListener("click", () => {
                eliminarFavorito(imagenUrl);
                divImg.remove(); // ELIMINAR DEL DOM
                if (obtenerFavoritos().length === 0) {
                    favoritosContainer.innerHTML = "<p>No tienes imágenes favoritas aún.</p>";
                }
            });

            divImg.appendChild(img);
            divImg.appendChild(buttonRemove);
            favoritosContainer.appendChild(divImg);
        });
    };

    // ELIMINAR FAVORITOS DE LOCALSTORAGE
    const eliminarFavorito = (imagenUrl) => {
        let favoritos = obtenerFavoritos();
        favoritos = favoritos.filter((fav) => fav !== imagenUrl);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    };

    mostrarFavoritos();
});



