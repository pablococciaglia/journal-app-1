import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { removeError, setError } from '../actions/ui';
import { startRegisterWithEmailPassordName } from '../actions/auth';

export const RegisterScreen = () => {

const dispatch = useDispatch();
const {msgError} = useSelector(state => state.ui);

const [ formValues, handleInputChange ] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
})

const {name, email, password, password2} = formValues;
    
const handleRegister = (e) => {
    e.preventDefault();
    if ( isFormValid() ){
        dispatch ( startRegisterWithEmailPassordName  (email, password, name) )
    }
}

const isFormValid = () => {
    if(name.trim().length ===0){
        dispatch(setError("name is required"));
        return false;
    } else if (!validator.isEmail( email )){
        dispatch(setError("email no es valido"));
        return false
    } else if ( password !== password2 || password.length < 5 ){
        dispatch(setError("contraseña no coincide o es menor a 6 caracteres"));
        return false;
    }
    dispatch (removeError());
    return true
}

    return (
        <div className="">
            <h1 className="auth__title">Registrar usuario</h1>
            <form onSubmit={handleRegister}>
                {
                    msgError &&
                    (<div className="auth__alert-error">
                        {msgError}
                    </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="E-mail"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange}
                />
                
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    autoComplete="off"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Registrar
                </button>
            
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </div>
    )
}