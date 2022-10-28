import { Link } from 'react-router-dom';
import { useState } from 'react';
import './signIn.css';
import ParticlesBg from 'particles-bg';

function SignIn(){

  const [showPasswrd, setShow ] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setShow(showPasswrd => !showPasswrd);
  }

    return(
      <>
      <ParticlesBg className="particles" color="#14b4e9" type='cobweb' bg={true}/>
      <div className="signIn__container">
          <h2>Sign-In</h2>
          <div className="userName__wrapper">
            <label htmlFor="username">UserName:</label>
            <input type="text" name="username" id="userNameInput" />
          </div>
          <div className="password__wrapper">
            <label htmlFor="password">Password:</label>
            <input type={showPasswrd? "text" : "password"} id="passWrdInput" />
            <span className="showPasswrd" onClick={handleClick} ><i className={showPasswrd? "bi bi-eye" : "bi bi-eye-slash" }></i></span>
          </div>
          <div className="buttons__wrapper">
            <Link to="/navbar/welcome"><input type="submit" value="Sign-in" id="signIn__btn" /></Link>
            <p className="registr__btn"><Link to="/register">Register</Link></p>
          </div>
      </div>
      </>

    );
  }
  
  export default SignIn;