import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './signIn.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase_setup/firebase";
import { motion } from 'framer-motion';

function SignIn(){

  const navigate = useNavigate();

  const [showPasswrd, setShow ] = useState(false);
  const [email, setEmail ] = useState("");
  const [passwrd, setPasswrd ] = useState("");
  const [erreur, setErreur ] = useState("");
  const [loading, setLoading] = useState(false);

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
      
      setErreur(err.code)
    }

    //[todo] Navigate to the menu if signed in
    if(auth.currentUser != null){
      navigate("/navbar/welcome");
    }
  }

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    },1000);

  },[])

    return(
      <>
        {loading?      
          <motion.div 
            className="loader-container"
          
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.div className="square-loader" animate={{ scale: [0.99, 1.05, 0.99, 0.99] }} transition={{ duration: 3, ease: 'easeIn', repeat: Infinity, times:[0.4, 0.8, 1] }}>
              <i className="bi bi-chat-square"></i>
            </motion.div>
          </motion.div>
        :
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
        }
      </>
    );
  }
  
  export default SignIn;