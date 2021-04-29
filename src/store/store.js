import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from "../reducers/uiReducers";
import { notesReducer } from "../reducers/notesReducer";
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
 


const reducers = combineReducers({//combina todos los reducers de la aplicacion, ya que el store solo puede aceptar un reducer
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk)),
    );
