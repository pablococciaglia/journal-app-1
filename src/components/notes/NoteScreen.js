import React from 'react'
import { NotesAppBarr } from './NotesAppBarr'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBarr/>
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="what happened today?"
                    className="notes__textarea"
                    autoComplete="off"
                >
                </textarea>
                <div
                    className="notes__image"
                >
                    <img src="https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg"
                    alt="imagen"/>
                </div>
            </div>
        </div>
    )
}