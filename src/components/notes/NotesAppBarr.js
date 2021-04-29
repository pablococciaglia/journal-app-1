import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../actions/notes'



export const NotesAppBarr = () => {
    
    const dispatch = useDispatch()
    const {active} = useSelector(state => state.notes)

    const handleSave = () =>{
        dispatch (startSaveNote(active))
     }

    const handleFileChange = (e) => {
        const file = e.target.files[0]; //e.target.files es donde se encuentra el archivo seleccionado
        if (file) { //si existe un file...
            dispatch( startUploading (file)) //se envia el file a la funcion
        }
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();//esta función simula un click en el input type "file", para seleccionar un archivo
    }

    return (
        <div className="notes__appbar">
            <span>fecha cualquiera</span>
            <input //este es un input para que podamos seleccionar un archivo, que puede ser de imagen para subir a algun lado. 
                id="fileSelector" //se pone un id para ser llamado por el handlePictureClick
                type="file" 
                name="file"
                onChange={ handleFileChange }
                style={{ display: 'none' }}
            />
            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button className="btn"
                onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
