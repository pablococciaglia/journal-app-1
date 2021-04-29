import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { activeNote } from '../actions/notes';


export const JournalEntry = ({id, date, title, body, url}) => {


    const noteDate = moment(date);
    
    const dispatch = useDispatch(activeNote);//hace dispatch de la accion activeNote
    
    const handleEntryClick = () => {
        dispatch ( activeNote (id, {date, title, body, url //maneja el evento click sobre alguna de las entradas del journal, activando su edicion
        }) 
        );
    }

    return (
        <div className="journal__entry pointer"
        onClick = { handleEntryClick }>
            
            { 
            url && //esta condicion indica que si existe una URL con una imagen se mostrará, sino esa parte no va a mostrarse
            
            <div 
                className="journal__entry-picture"
                style={{
                    BackgroundSize: 'cover',
                    backgroundImage:`url(${url})`,
                }}
            ></div>
            }
                <div className="journal__entry-body">
                    <p className="journal__entry-title">
                        {title}
                    </p>
                    <p className="journal__entry-content">
                        {body}
                    </p>
                </div>
                <div className="journal__entry-date-box">
                    <span>{noteDate.format('dddd')}</span> {/* formatos de moment.js que se pueden ver en la documentacion https://momentjs.com/docs/#/displaying/format/ */}
                    <h4>{noteDate.format('Do')}</h4>

                </div>

            
        </div>
    )
}
