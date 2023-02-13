import './register.css';
import { useNavigate, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase_setup/firebase";
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';


const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const [nom, setNom] = useState("");
  const [erreur, setErreur ] = useState("");
  const [loading, setLoading] = useState(false);

  const {registerUser} = UserAuth();

  const handleEmailChange = (e) => {
    setEmail(e.trim())
  }

  const handlePasswrdChange = (e) => {
    setPasswrd(e.trim())
  }

  const handleNameChange = (e) => {
    setNom(e.trim())
  }

  const signUp = async(e) => {
    e.preventDefault();
    try{

      await registerUser(email, passwrd) 

      await updateProfile(auth.currentUser, { displayName: nom})

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        user_uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        contact: [],
        invitations: []
      });

    }catch(error){
      setErreur(error.code)
    }

    //[todo] Navigate to the menu if signed in
    if(auth.currentUser !== null){
      setPersistence(auth, browserSessionPersistence)
      .then(() => {
        navigate("/navbar/welcome");
      })
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
        <div className="Registr__background">
          <div className="registr__container">
            <form onSubmit={signUp}>
                <h2>Register<i className="bi bi-person-square"></i></h2>
                <div className="fullname__wrapper">
                    <motion.input whileFocus={{ scale: 1.03 }} type="email" name="email" id="EmailInput" onChange={(e) => handleEmailChange(e.target.value)}  placeholder="email@random.com" />
                </div>
                <div className="userName__wrapper">
                  <motion.input whileFocus={{ scale: 1.03 }} type="text" name="username" id="userNameInput" onChange={(e) => handleNameChange(e.target.value)} placeholder="User name" />
                </div>
                <div className="password__wrapper">
                  <motion.input whileFocus={{ scale: 1.03 }} type="text" id="passWrdInput" onChange={(e) => handlePasswrdChange(e.target.value)} placeholder="Password" />
                </div>
                <div className="buttons__wrapper">
                  <motion.button whileTap={{ scale: 0.90 }} type="submit" id="signIn__btn">Register</motion.button>
                  <Link to="/">Log In</Link>
                </div>
            </form>
          </div>
          <div className='error__div'>{erreur}</div>
        </div>
      }
      </>
    );
}

export default Register;