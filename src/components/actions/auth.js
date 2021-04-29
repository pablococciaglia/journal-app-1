import { types } from "../types/types"
import Swal from 'sweetalert2'
import { googleAuthProvider,firebase } from "../../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email,password) => {
    return (dispatch)=>{
        dispatch (startLoading());

        firebase.auth().signInWithEmailAndPassword ( email,password )
        .then( ({user}) =>{
            
            dispatch(
                login(user.uid, user.displayName)
            )
            dispatch (finishLoading());
            
        })
        .catch(e=>{
            Swal.fire('error', e.message, 'error') //este es el popup del sweet alert 2
            dispatch (finishLoading());
        })
    }
}
 
export const startRegisterWithEmailPassordName = (email, password, name) => {
    return ( dispatch ) => {
        dispatch (startLoading());

        firebase.auth().createUserWithEmailAndPassword ( email,password )
            .then( async ({user}) =>{
                await user.updateProfile({displayName: name});
                console.log (user)
                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch (finishLoading());
            })
            .catch(e=>{
                dispatch (finishLoading());
                Swal.fire('error', e.message, 'error') //este es el popup del sweet alert 2
            })
    }
}

export const startGoogleLogin = ()=>{
    return (dispatch) =>{
        dispatch (startLoading());
        firebase.auth().signInWithPopup ( googleAuthProvider )
            .then( ({user}) =>{
                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch (finishLoading());
            });
    }
}

export const login = (uid, displayName)=>({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

/*  
export const login = (uid, displayName)=>{
    return{
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

tambien se puede escribir así*/

export const startLogout = () =>{
    return async(dispatch) =>{
        await firebase.auth().signOut();
        dispatch( logout() );
        dispatch( noteLogout() ); //purga el state
    }
} //esta funcion espera que se deslogee en firebase, y despues llama al dispatch de la funcion de logout que es para que se desloguee tambien del frontend

export const logout = () => ({
    type: types.logout
})