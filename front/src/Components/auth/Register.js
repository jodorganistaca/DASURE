import React, {useState} from 'react'
import "../../Styles/auth/Login.css"
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import Alert from "../../Components/layout/Alert"
import {register} from "../../actions/auth";
import PropTypes from 'prop-types'
import { useHistory, Redirect } from 'react-router-dom';
const Register = ({setAlert, register, isAuthenticated}) => {
  let history = useHistory();
    const [formData, setFormData] = useState(
        {
            name: "",
            email: "",
            password: "",
            password2: ""
        }
    );
    const loginWithGoogle = () => {
      return window.location.replace("/auth/google");
  }

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2)
        {
           setAlert("Las contraseñas no coinciden", "danger", 3000);
        }
        else
        {
            register({name, email, password});
        }
    }

    //Redirect if is authenticated
    if(isAuthenticated)
    {
      return <Redirect to="/"></Redirect>
    }

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    const {name, email, password, password2} = formData;
    return (
      <div className="limiter">
		  <div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form" onSubmit={e => onSubmit(e)}>
					<span className="login100-form-title p-b-43">
						Regístrate en DASURE
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

          <div className="wrap-input100 validate-input" data-validate="Password is required">
						<input className="input100" type="password" name="password2"  minLength="6" value={password2} onChange={e => onChange(e)} required/>
						<span className="focus-input100"></span>
						<span className="label-input100">Verifica tu contraseña</span>
					</div>
			

					<div className="container-login100-form-btn">
						<button className="login100-form-btn" type="submit">
							Registrarse
						</button>
					</div>
					
					<div className="text-center p-t-46 p-b-20">
						<span className="txt2">
							O Regístrate usando
						</span>
					</div>

					<div className="google-btn" onClick={loginWithGoogle}>
            <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </div>
               <p className="p-auth btn-text">Regístrate con Google</p>
          </div>
				</form>

				<div className="login100-more" style={{backgroundImage:"url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/outdoor-fireplace-1585628569.jpg')"}} >
				</div>
			</div>
		</div>
	</div>
    );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);
//State to map, object with actions

