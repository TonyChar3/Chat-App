import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './signIn.css';
import { auth } from "../../firebase_setup/firebase";
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';

function SignIn(){

  const { SignIn } = UserAuth(); // Context auth.currentUser
  const navigate = useNavigate();// navigate with react-router-dom

  const [showPasswrd, setShow ] = useState(false); // show password icon state
  const [email, setEmail ] = useState(""); // email 
  const [passwrd, setPasswrd ] = useState(""); // password
  const [erreur, setErreur ] = useState(""); // error message alert
  const [loading, setLoading] = useState(false); // loading sequence

  // handle click to show the password
  const handleClick = (event) => {
    event.preventDefault();
    setShow(showPasswrd => !showPasswrd);
  }

  // handle the password state
  const handlePasswordChange = (event) => {
    setPasswrd(event.trim())
  }
  
  // handle the email state
  const handlEmailChange = (event) => {
    setEmail(event.trim())
  }

  // when the user click the sign-in button
  const logIn = async(e) => {

    e.preventDefault();

    try{
      // sign with the Context function
      await SignIn(email, passwrd)
    
    // catch error
    } catch(err){
      // set the error message
      setErreur(err.code)
    }

    //[todo] Navigate to the menu if signed in
    if(auth.currentUser != null){

      // show the loading sequence
      setLoading(true);

      // wait 2 seconds
      setTimeout(() => {
        // navigate to the first/ main page of the app
        navigate("/navbar/contacts/contct");

        // stop the loading sequence
        setLoading(false);

      },2000);
      
    }
  }

  useEffect(() => {

    // show loading sequence when loading in
    setLoading(true);

    // wait 1 second
    setTimeout(() => {
      // stop the loading sequence
      setLoading(false);
    },1000);

  },[])

    return(
      <>
        {loading?      
          <motion.div 
            className="loader__container"
          
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.div 
            className="square-icon__container" 
            animate={{ scale: [0.99, 1.05, 0.99, 0.99] }} 
            transition={{ duration: 3, ease: 'easeIn', repeat: Infinity, times:[0.4, 0.8, 1] }}
            >
              <i className="bi bi-chat-square"></i>
            </motion.div>
          </motion.div>
        :
          <div className="signin-form__wrapper">
            <div className="signin-form__container">
              <form onSubmit={logIn}>

                <h2>
                  Connect
                  <i className="bi bi-chat-square-heart"></i>
                </h2>

                <div className="signin-email__container">
                  <motion.input 
                  whileFocus={{ scale: 1.03 }} 
                  type="email" 
                  name="username" 
                  id="signin-email__input" 
                  onChange={(e) => handlEmailChange(e.target.value)} 
                  placeholder="E-mail" 
                  />
                </div>

                <div className="signin-password__container">
                  <motion.input 
                  whileFocus={{ scale: 1.03 }} 
                  type={showPasswrd? "text" : "password"} 
                  id="signin-password__input" 
                  onChange={(e) => handlePasswordChange(e.target.value)} 
                  placeholder="Password" 
                  />

                  <span className="show-password__span" onClick={handleClick} >
                    <i className={showPasswrd? "bi bi-eye" : "bi bi-eye-slash" }></i>
                  </span>
                </div>

                <div className="button__container">
                  <motion.button 
                  whileTap={{ scale: 0.90 }} 
                  type="submit" 
                  value="Sign-in" 
                  id="signin__button"
                  >
                    Sign-In
                  </motion.button>

                  <motion.p className="register-link__container">
                    <Link to="/register">
                      No account ?
                    </Link>
                  </motion.p>
                  
                </div>

              </form>
            </div>

            <div className='error__div'>
              {erreur}
            </div>
          </div> 
        }
      </>
    );
  }
  
  export default SignIn;