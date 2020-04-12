import React, { useState } from 'react';
import { Input, Button } from 'antd';
import '../Styles/Login.css';
import { withRouter } from 'react-router-dom';

const Login = props => {

    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });

    const Auth = () => {
        console.log(loginCredentials);
        props.history.push('home');
    };

    return (
        <div className='login-main-container'>
            <div className="img-logo-container">
            </div>

            <section className="form-container">
                <Input className="input" placeholder="Correo Electrónico" onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value.toLowerCase() })} />

                <Input className="input" placeholder="Contraseña" onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })} type="password" />

            </section>

            <section className="login-btn-container">
                <Button type="primary" onClick={Auth}> Iniciar Sesión </Button>
            </section>

            <section className="final-options">
                <p>¿Olvidaste la contraseña? <a onClick={() => props.history.push('verification')}> Click aquí </a> </p>
                <p>¿No tienes cuenta? <a onClick={() => props.history.push('signup')}> Regístrate aquí </a> </p>
            </section>
        </div>
    )
};

export default withRouter(Login)
