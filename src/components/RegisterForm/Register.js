import ParticlesBg from 'particles-bg';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';
import {useState} from 'react';
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../../firebase_setup/firebase";


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
        <>
        <ParticlesBg className="particles" color="#14b4e9" type='cobweb' bg={true}/>
        <div className="registr__container">
          <form onSubmit={signUp}>
              <div className="register__wrapper">
                <Link to="/"><i className="bi bi-arrow-left">Go back</i></Link>
              </div>
              <h2>Register</h2>
              <div className="fullname__wrapper">
                  <label htmlFor="fullname">Email:</label>
                  <input type="email" name="email" id="EmailInput" onChange={(e) => handleEmailChange(e.target.value)}  placeholder="Ex:email@random.com" />
              </div>
              <div className="userName__wrapper">
                <label htmlFor="username">Enter a UserName:</label>
                <input type="text" name="username" id="userNameInput" onChange={(e) => handleNameChange(e.target.value)} />
              </div>
              <div className="password__wrapper">
                <label htmlFor="password">Enter a Password:</label>
                <input type="text" id="passWrdInput" onChange={(e) => handlePasswrdChange(e.target.value)} />
              </div>
              <div className="buttons__wrapper">
                <button id="signIn__btn" type="submit">Register</button>
              </div>
          </form>
          <div className="goback__wrapper">
            
          </div>
        </div>

        <div className='error__div'>{erreur}</div>
        </>
    );
}

export default Register;