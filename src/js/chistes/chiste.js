import { obtenerChisteOptimizado } from './http-provider';

let indice = 1;

// Con una promesa, esperamos que se resuelva el pedido del chiste:
const cargarChiste = async () => {
    const res = await obtenerChisteOptimizado();
    // Esta promesa siempre retornara un objeto, para gestionar su informacion el la funcion de abajo.
    return res;
}

const generarHtmlChiste = ( data ) => {

    // Esta funcion recibe como parametro la respuesta de la promesa que carga los chistes.
    // Se evalua si es un objeto error, accediendo al status (ya que el error solo posee la propiedad)
    // En caso de no tenerla, la condicion if se cumple, se genera el html y se retorna el nodo: 
    if (!data.status) {
        const itemContainer = document.createElement('div');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<b>${indice}. ${data.id}: </b><span>${data.value}</span>`;
        itemContainer.appendChild(listItem).setAttribute('class', 'caja-chiste');
        indice++;
        return itemContainer;
    } else {
        // Y si no se retorna, se retorna con un throw, el objeto(que es este caso es el objeto error).
        throw data;
    }

}

export {
    cargarChiste,
    generarHtmlChiste
}