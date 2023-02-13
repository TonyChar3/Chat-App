import './welcome.css';
import { auth } from "../../firebase_setup/firebase";
import { useEffect } from "react";

import { motion } from 'framer-motion';


function Welcome(){

    // const [nom, setNom ] = useState("");
    //const [email, setEmail ] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if(user){
                // setNom(auth.currentUser.displayName)
                // setEmail(auth.currentUser.email)
            }
        })
        
    }, [])

    return(
            <motion.div 
                className="welcomePage__background"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <div className="welcomePage__container">
                    <h2 className="welcomePage__title">Welcome to the Chat App!</h2>
                    <p className="welcomePage__text">This Chat App is only a mock-up to show case my Front-end Skills!</p>
                </div>
            </motion.div>
    )
}

export default Welcome;