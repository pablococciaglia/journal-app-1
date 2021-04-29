import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    let { notes } = useSelector( state => state.notes );
    notes = Object.values(notes);
    return (
        <div className="journal__entries">
            
            {
                notes.map( note => (
                    <JournalEntry 
                        key={ note.id }
                        { ...note }
                    />
                )) 
            }

        </div>
    )
}
