import './register.css';
import { useNavigate, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase_setup/firebase";
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';


const Register = () => {

  // navigate with react-router-dom
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // email state
  const [passwrd, setPasswrd] = useState(""); // password
  const [nom, setNom] = useState(""); // name
  const [erreur, setErreur ] = useState(""); // erreur message
  const [loading, setLoading] = useState(false); // loading sequence

  // register function from Context
  const {registerUser} = UserAuth();

  // handle the email state
  const handleEmailChange = (e) => {
    setEmail(e.trim())
  }

  // handle the password state
  const handlePasswrdChange = (e) => {
    setPasswrd(e.trim())
  }

  // handle the name state
  const handleNameChange = (e) => {
    setNom(e.trim())
  }

  // when the user click register button
  const signUp = async(e) => {

    e.preventDefault();

    try{

      // register the new with the Context function
      await registerUser(email, passwrd) 

      // update the profile display name to the current given name
      await updateProfile(auth.currentUser, { displayName: nom})

      // set this new user document in the 'users' DB
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        user_uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        contact: [],
        invitations: []
      });
    
    // catch error
    }catch(error){
      // set error message
      setErreur(error.code)
    }

    // Navigate to the menu if signed in
    if(auth.currentUser !== null){
      // set the session to persist until the user logs out
      setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // navigate to the first/main page of the app
        navigate("/navbar/contacts/contct");
      })
    }
  }

  useEffect(() => {
    // show the loading sequence
    setLoading(true);

    // wait 1 second
    setTimeout(() => {
      // stop the loading sequence
      setLoading(false);
    },1000);

  },[])

    return(
      <>
        {loading ?         
          <motion.div 
            className="loader-container"
          
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.div 
              className="square-loader" 
              animate={{ scale: [0.99, 1.05, 0.99, 0.99] }} 
              transition={{ duration: 3, ease: 'easeIn', repeat: Infinity, times:[0.4, 0.8, 1] }}
            >
              <i className="bi bi-chat-square"></i>
            </motion.div>
          </motion.div>
        :
          <div className="register-form__wrapper">
            <div className="register-form__container">

              <form onSubmit={signUp}>
                <h2>
                  Register
                  <i className="bi bi-person-square"></i>
                </h2>

                <div className="register-email__container">
                    <motion.input 
                      whileFocus={{ scale: 1.03 }} 
                      type="email" 
                      name="email" 
                      id="register-email__input" 
                      onChange={(e) => handleEmailChange(e.target.value)}  
                      placeholder="email@random.com" 
                    />
                </div>

                <div className="register-name__container">
                  <motion.input 
                    whileFocus={{ scale: 1.03 }} 
                    type="text" 
                    name="username" 
                    id="register-name__input" 
                    onChange={(e) => handleNameChange(e.target.value)} 
                    placeholder="User name" 
                  />
                </div>

                <div className="register-password__container">
                  <motion.input 
                    whileFocus={{ scale: 1.03 }} 
                    type="text" 
                    id="register-password__input" 
                    onChange={(e) => handlePasswrdChange(e.target.value)} 
                    placeholder="Password" 
                  />
                </div>

                <div className="button__container">
                  <motion.button 
                    whileTap={{ scale: 0.90 }} 
                    type="submit" 
                    id="register__button"
                  >
                    Register
                  </motion.button>

                  <Link to="/">
                    Log In
                  </Link>
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

export default Register;