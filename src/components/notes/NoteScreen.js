import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../actions/notes'
import { useForm } from '../hooks/useForm'
import { NotesAppBarr } from './NotesAppBarr'

export const NoteScreen = () => {
    //


    const {active:note} = useSelector(state => state.notes) //{active:note}solamente renombra el parametro active. con este useSelect, traemos la informacion del store acerca de la nota, con titulo, body ...etc
    const [ formValues, handleInputChange, reset ] = useForm( note )
    const { body, title, id } = formValues;
    const dispatch = useDispatch();
    const activeId = useRef(note.id) //hace una referencia al id que está almacenado en el store, para saber si cambia o no
    
    useEffect(() => { //el efecto va a redibujar el componente para qu ese muestre la nueva nota cuando hago un click
        if (note.id !== activeId.current){
            reset ( note )
            activeId.current = note.id //establece el nuevo valor del activeId para evitar un loop infinito
        }
    }, [note, reset])

    useEffect(() => {
        dispatch (activeNote(formValues.id, {...formValues}));//actualiza los valores de la nota activa dentro del store
        
    }, [ formValues, dispatch ] 
    )

    const handleDelete = () => { //accion de borrar la nota de la base de datos y del state
        dispatch( startDeleting ( id ) );
    }

    return (
        <div className="notes__main-content">
            <NotesAppBarr/>
            <div className="notes__content">
                <input
                    type="text"
                    name="title" //para que los input funcionen si o si deben tener el name
                    placeholder="some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}//se setea el value con lo que está en el store
                    onChange={ handleInputChange }
                
                />

                <textarea
                    placeholder="what happened today?"
                    name="body"
                    className="notes__textarea"
                    autoComplete="off"
                    value={body}
                    onChange={ handleInputChange }
                >
                </textarea>
                { (note.url) && // es un condicional que indica que si existe un url con imagen se muestra este componente. 
                (<div
                    className="notes__image"
                >
                    <img src={note.url}
                    alt="imagen"/>
                </div>)
                }
            </div>
            <button
                className = "btn btn-danger"
                onClick={ handleDelete }
            >
                delete
            </button>
        </div>
    )
}