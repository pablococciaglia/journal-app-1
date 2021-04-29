export const types = {

    login: '[Auth] Login', //lo que esta entre corchetes indica cual es el reducer al que reacciona esta accion
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start startLoading',
    uiFinishLoading: '[UI] Finish startLoading',

    notesAddNew: '[Notes] New Note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load Notes',
    notesUpdated: '[Notes] Updated Note',
    notesFileUrl: '[Notes] Updated image url',
    notesDelete: '[Notes] Delete note',
    notesLogoutCleaning: '[Notes] Logout Cleaning',



}