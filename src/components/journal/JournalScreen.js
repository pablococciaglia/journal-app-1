import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
//import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';



export const JournalScreen = () => {

  const {active} = useSelector(state => state.notes)//el use selector busca dentro del store, en este caso buscamos todo lo que este en el state de "notes", y lo que nos interesa es la propiedad active, que puede ser true o false

  return (
        <div className="journal__main-content" className="animate__animated animate__fadeIn animate__faster">
              <Sidebar/>
              <main>
              
                    {( active ) //operador ternario, si la nota tiene un true...
                      ? ( <NoteScreen/> ) // va a mostrar la nota
                      : ( <NothingSelected/> ) // si no está en true muestra la pantalla morada de que no hay nada seleccionado.
                    }
                
              </main>
        </div>
  )
}
