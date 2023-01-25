import './welcome.css';
import ParticlesBg from 'particles-bg';
import { auth } from "../../firebase_setup/firebase";
import { useState, useEffect } from "react";

function Welcome(){

    const [nom, setNom ] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if(user){
                setNom(auth.currentUser.displayName)
            }
        })
        
    }, [])

    return(
            <div className="welcomePage__background">
                <div className="welcomePage__container">
                    <ParticlesBg className="particles" color="#f2f6f7" type='polygon' bg={true}/>
                    <h2 className="welcomePage__title">Welcome to the Chat App {nom}!</h2>
                    <p className="welcomePage__text">This Chat App is only a mock-up to show case my Front-end Skills!</p>
                </div>
            </div>
    )
}

export default Welcome;