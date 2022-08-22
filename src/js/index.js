import '../css/index.css';
import { cargarChiste, generarHtmlChiste } from './chistes/chiste';  

/* fetch(urlJoke).then(res => {
    res.json().then(({id:identificador, value:chiste}) => {
        console.table({joke: chiste});
    });
}); */

/* fetch(urlJoke).then(res => res.json()).then(({value:chiste}) => console.log(chiste)); */


const botonChiste = document.getElementById('btnChiste');
const listaOrdenada = document.getElementById('listaChistes');

// Evento asincrono:
botonChiste.addEventListener('click', async () => {
    try {
        // Se intenta cargar el nodo del chiste, si hubo algun fallo se retorna un error:
        listaOrdenada.appendChild(generarHtmlChiste(await cargarChiste()));
    } catch (error) {
        // En caso de error, se muestra el mensaje del error:
        console.error(error.message);
    }
});

/* setInterval(() => {
    botonChiste.click();
}, 3000); */




