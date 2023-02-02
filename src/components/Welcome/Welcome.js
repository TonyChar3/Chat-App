import './welcome.css';
import { auth } from "../../firebase_setup/firebase";
import { useState, useEffect } from "react";
import ReactImg from "../../img/1174949_js_react js_logo_react_react native_icon.png";
import FirebaseImg from "../../img/logo-built_white.png"
function Welcome(){

    const [nom, setNom ] = useState("");
    const [email, setEmail ] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if(user){
                setNom(auth.currentUser.displayName)
                setEmail(auth.currentUser.email)
            }
        })
        
    }, [])

    return(
            <div className="welcomePage__background">
                <div className="welcomePage__container">
                    <h2 className="welcomePage__title">Welcome to the Chat App {nom}!</h2>
                    <p className="welcomePage__text">This Chat App is only a mock-up to show case my Front-end Skills!</p>
                </div>
                <div className="welcomeProfile__container shadow-drop-2-center">
                    <h2>Your Profile</h2>
                    <div className="welcomeProfile_Name_container">
                        <h4>{nom}</h4>
                    </div>
                    <div className="welcomeProfile_Email_container">
                        <h4>{email}</h4>
                    </div>
                </div>
                <div className="madeWith__container shadow-drop-2-center">
                    <img src={ReactImg} alt="react logo" width="60" height="60" />
                    <span>X</span>
                    <img src={FirebaseImg} alt="firebase logo" width="160" height="60" />
                </div>
            </div>
    )
}

export default Welcome;