import Swal from "sweetalert2";
import { db } from "../../firebase/firebaseConfig";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { notesReducer } from "../../reducers/notesReducer";
import { types } from "../types/types";

export const startNewNote = () => { 
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        
        dispatch (activeNote ( doc.id, newNote ) );
        dispatch (addNewNote ( doc.id, newNote ));
    }
}

export const activeNote = (id, note) =>({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        
        const notes = await loadNotes( uid );//regresa las notas que vienen de la base de datos
        dispatch( setNotes( notes ) );
        
    }
}


export const setNotes = (notes) =>({
    type: types.notesLoad,
    payload: notes
}) 

export const startSaveNote = (note) => { //graba las notas en la base de datos
    return async (dispatch,getState)=>{ //se dispara por thonk porque es una accion asincrona y requiere un middleware
        const { uid } = getState().auth;
        
        if (!note.url){ //como no se puede guardar un campo como undifined, en el caso de que no hayan guardado una imagen elimina el campo de la imagen de las notas
            delete note.url;
        }
        
        const noteToFirestore = {...note};
        delete noteToFirestore.id;//el firestare no requiere el id asique sacamos el id, con el operador "delete"
        await db.doc(`${ uid }/journal/notes/${note.id}`).update(noteToFirestore); //graba y hace un update en la ruta de la base de datos de firebase,  usando el id del usuario y el id de la nota

        dispatch (refreshNote(note.id, noteToFirestore)); //desencadena la accion de refresh en la pantalla
        Swal.fire('saved',note.title,'success'); //va tirar un pop up de sweet alert con la correcta grabación
    }
}

export const refreshNote =( id, note ) =>({ //esta funcion hará un refresh de la pantalla cuando haya guardado una nota
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id, 
            ...note
        }
    }
})

export const startUploading = ( file ) => { //se lo llama start porque empieza un proceso asincorono y se manda a la base de datos a guardar una imagen.
    return async ( dispatch, getState )  => {
        const { active: activeNote } = getState().notes; //renombramos active como "activeNote"

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload (file);
        activeNote.url = fileUrl
        dispatch ( startSaveNote(activeNote) )

        Swal.close(); //cierra el popup cuando termina de subirse
    }
}

export const startDeleting = (id) => { //le ponemos start al inicio porque va a ser una tarea asincrona, por eso tiene ademas que tener un return con un async
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        await db.doc (`${ uid }/journal/notes/${ id }`).delete(); //esto lo elimina de la base de datos. con la accion .delete() que es propia de firebase

        dispatch( deleteNote ( id ) );//esta accion es para eliminar del state esa nota
    }
}

export const deleteNote = ( id ) =>({ //esta accion es sincrona, no va a ocupar un return, manda a una accion en el reducer
    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning

})