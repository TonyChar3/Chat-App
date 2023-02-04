
import { useNavigate, Link } from 'react-router-dom';
import './register.css';
import {useState} from 'react';
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase_setup/firebase";


const Register = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const [nom, setNom] = useState("");
  const [erreur, setErreur ] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e)
  }

  const handlePasswrdChange = (e) => {
    setPasswrd(e)
  }

  const handleNameChange = (e) => {
    setNom(e)
  }

  const signUp = async(e) => {
    e.preventDefault();
    try{

      await createUserWithEmailAndPassword(auth, email, passwrd)

      await updateProfile(auth.currentUser, { displayName: nom})

      await setDoc(doc(db, "users", auth.currentUser.displayName), {
        user_uid: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        contact: []
      });

    }catch(error){
      console.log(error.code)
      setErreur(error.code)
    }

    //[todo] Navigate to the menu if signed in
    if(auth.currentUser !== null){
      setPersistence(auth, browserSessionPersistence)
      .then(() => {
        navigate("/navbar/welcome");
      })
      
      console.log(auth.currentUser.displayName)
    }
  }

    return(
        <div className="Registr__background">
          <div className="registr__container">
            <form onSubmit={signUp}>
                <div className="register__wrapper">
                  <Link to="/"><i className="bi bi-arrow-left">Go back</i></Link>
                </div>
                <h2>Register</h2>
                <div className="fullname__wrapper">
                    <input type="email" name="email" id="EmailInput" onChange={(e) => handleEmailChange(e.target.value)}  placeholder="Ex:email@random.com" />
                </div>
                <div className="userName__wrapper">
                  
                  <input type="text" name="username" id="userNameInput" onChange={(e) => handleNameChange(e.target.value)} placeholder="User name" />
                </div>
                <div className="password__wrapper">
                  <input type="text" id="passWrdInput" onChange={(e) => handlePasswrdChange(e.target.value)} placeholder="Password" />
                </div>
                <div className="buttons__wrapper">
                  <button id="signIn__btn" type="submit">Register</button>
                </div>
            </form>
            <div className="goback__wrapper">
              
            </div>
          </div>

          <div className='error__div'>{erreur}</div>
        </div>
    );
}

export default Register;