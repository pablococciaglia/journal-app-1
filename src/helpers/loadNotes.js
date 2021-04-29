//se puede llamar desde una accion pero lo ponemos aparte porque va a ser muy largo

import { db } from '../firebase/firebaseConfig';

export const loadNotes = async ( uid ) => {
    const notesSnap = await db.collection(`${ uid }/journal/notes`).get();//hace referencia a la coleccion dentro de la base de datos, y hay que especificar una ruta
    const notes = [];
    notesSnap.forEach( snapHijo => {//para cada elemento que devuelve en el arreglo de la base de dato vamos a sacar la data
        notes.push({
            id: snapHijo.id, //le agregamos el id al arreglo con lo que viene de la base de datos
            ...snapHijo.data() //aqui mantenemos lo que ya traia
        })
    });

    return notes;
}