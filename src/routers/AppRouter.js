import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { firebase } from '../firebase/firebaseConfig';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../components/actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
const [checking, setchecking] = useState(true) //chequea si esta logeado o no el usuario en la base de datos, poniendo una bandera, en el caso de que esté loguado o no, muestra a que pantalla se va a redirigir al cliente. y en el mientras tanto no muestra nada. solo una pantalla de espera
const [isLoggedIn, setisLoggedIn] = useState(false) // con este useState nos fijamos si esta logeado a no para saber a donde dirigimos al cliente. 
const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if ( user?.uid ) {
                dispatch( login(user.uid, user.displayName));
                setisLoggedIn ( true );
            } else {
                setisLoggedIn ( false )
            }
            setchecking ( false ) ;
        });
    }, [dispatch, setchecking, setisLoggedIn]) 

    //importamos el useDispatch y luego usamos un useEffect paramantener el usuario cuando recargamos la pagina
if (checking){
    return(<h1>Espere...</h1>)
}

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
