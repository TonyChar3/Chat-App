import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './signIn.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase_setup/firebase";

function SignIn(){

  const navigate = useNavigate();

  const [showPasswrd, setShow ] = useState(false);
  const [email, setEmail ] = useState("");
  const [passwrd, setPasswrd ] = useState("");
  const [erreur, setErreur ] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    setShow(showPasswrd => !showPasswrd);
  }

  const handlePasswordChange = (event) => {
    setPasswrd(event)
  }

  const handlEmailChange = (event) => {
    setEmail(event)
  }

  const logIn = async(e) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, email, passwrd)

    }catch(err){
      console.log(err)
      setErreur(err.code)
    }

    //[todo] Navigate to the menu if signed in
    if(auth.currentUser != null){
      navigate("/navbar/welcome");
      console.log(auth.currentUser.displayName);
    }
  }

    return(
      <div className="SignIn__background">
        
        <div className="signIn__container">
          <form onSubmit={logIn}>
          
            <h2>Sign-In</h2>
              <div className="userName__wrapper">
                <input type="email" name="username" id="userNameInput" onChange={(e) => handlEmailChange(e.target.value)} placeholder="E-mail" />
              </div>
              <div className="password__wrapper">
                <input type={showPasswrd? "text" : "password"} id="passWrdInput" onChange={(e) => handlePasswordChange(e.target.value)} placeholder="Password" />
                <span className="showPasswrd" onClick={handleClick} ><i className={showPasswrd? "bi bi-eye" : "bi bi-eye-slash" }></i></span>
              </div>
              <div className="buttons__wrapper">
                <button type="submit" value="Sign-in" id="signIn__btn">Sign-In</button>
                <p className="registr__btn"><Link to="/register">Register</Link></p>
              </div>
          </form>
        </div>
        <div className='error__div'>{erreur}</div>
      </div>
    );
  }
  
  export default SignIn;