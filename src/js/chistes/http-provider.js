const urlJoke = 'https://api.chucknorris.io/jokes/random';

const obtenerChiste = async () => {
    const chiste = await fetch(urlJoke).then(res => res.json()).then(({value:chiste}) => chiste);
    return chiste;
};

const obtenerChisteFH = async () => {
    const promesaChiste = await fetch(urlJoke);
    if (!promesaChiste.status) {
        return promesaChiste;
    } else {
        const chiste = await promesaChiste.json();
        return chiste;
    }
};

// Creamos una funcion asincrona que retorne un objeto, ya sea el objeto del chiste o un objeto error:
const obtenerChisteOptimizado = async () => {
    try {
        // Esperamos a que la promesa del chiste se resuelva y retorna la promesa de la data JSON:
        const promesaChiste = await fetch(urlJoke);
        // Esperamos que la promesa de json se resuelva, luego enviamos el objeto res:
        return await promesaChiste.json();
    } catch (error) {
        // En caso de fallo, se retorna el objeto de respuesta, pero es un objeto de error:
        return error;
    }
};

export {
    obtenerChiste,
    obtenerChisteFH,
    obtenerChisteOptimizado
}