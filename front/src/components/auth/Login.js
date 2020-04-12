import React, {Fragment, useState} from 'react'
import "../../Styles/auth/Login.css"
import axios from "axios";
import {Link, Redirect} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faGoogle} from "@fortawesome/free-brands-svg-icons"
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Alert from "../../Components/layout/Alert"
import {login} from "../../actions/auth"
export const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    );

    const onSubmit = async e => {
        e.preventDefault();
       login(email, password);
    }

    //TODO: Replace to heroku url
    const loginWithGoogle = () => {
      return  login(null,null,true);
  }

    if(isAuthenticated)
    {
      return <Redirect to="/"/>
    }

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    const {email, password} = formData;
    return (
      <div className="limiter">
		  <div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form" onSubmit={e => onSubmit(e)}>
					<span className="login100-form-title p-b-43">
						Inicia sesión en DASURE
					</span>
					<Alert/>
					
					<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="email" name="email" value={email} onChange={e => onChange(e)} required/>
						<span className="focus-input100"></span>
						<span className="label-input100">Email</span>
					</div>
					
					
					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<input className="input100" type="password" name="password"  minLength="6" value={password} onChange={e => onChange(e)} required/>
						<span className="focus-input100"></span>
						<span className="label-input100">Contraseña</span>
					</div>
			

					<div className="container-login100-form-btn">
						<button className="login100-form-btn" type="submit">
							Iniciar sesión
						</button>
					</div>
					
					<div className="text-center p-t-46 p-b-20">
						<span className="txt2">
							O inicia sesión con
						</span>
					</div>

					<div className="google-btn" onClick={loginWithGoogle}>
            <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
               <p className="btn-text">Iniciar sesión con Google</p>
          </div>
				</form>

				<div className="login100-more" >
				</div>
			</div>
		</div>
	</div>
    )
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
