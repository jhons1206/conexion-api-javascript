// Paginar Resultados
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
})


// Trabajando con API TMDB (https://www.themoviedb.org/)
const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=71c8934eb254c1acef9b57228dfe17c0&language=es-MX&page=${pagina}`);
    
        // console.log(respuesta);

        // Si la respuesta es correcta
        if(respuesta.status === 200) {
            const datos = await respuesta.json();
            
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;      
            });

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            console.log('Debe autenticarse para obtener películas');
        } else if (respuesta.status === 404) {
            console.log('La película que buscas no existe');
        } else {
            console.log('Hubo un error inesperado');
        }
    
    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();