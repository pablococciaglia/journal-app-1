import { types } from "../components/types/types";

/* {
notes:[],
active: null,
active:{
    id:'',
    title:'',
    imageUrl:'',
    date:
}
}
 */
const initialState={ //estado inicial de las notas
    notes: [],
    active: null,
}

export const notesReducer = (state= initialState,action) =>{//reducer con los distintos tipos de acciones sobre las notas
    switch (action.type) {
        
        case types.notesActive:
            return {
                ...state,
                active:{
                    ...action.payload
                }
            }
        
        
        case types.notesAddNew: //guarda la nuev nota creada en el state, entonces se refresca la barra lateral
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }



        case types.notesLoad: //de este modo guardamos en el store este arreglo de notas, y lo hacemos accesible para todo
            return{
                ...state,
                notes: {...action.payload}
            }

        case types.notesUpdated: //hace refresh de pantalla cuando guardo una nota nueva
        let notes = Object.values(state.notes); //convierte el objeto en un array para poder aplicar el .map
            return{
                ...state,
                notes: notes.map(
                    note=> note.id ===action.payload.id
                        ? action.payload.note
                        : note
                )
                

            }
        
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: Object.values(state.notes).filter( note => note.id !== action.payload )
            }      

        case types.notesLogoutCleaning: //purga el state
            return {
                ...state,
                active: null,
                notes: []
            }

       

        default:
            return state;
    }

}