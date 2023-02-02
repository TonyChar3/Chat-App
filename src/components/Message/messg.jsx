import './messg.css';
import { auth } from "../../firebase_setup/firebase";
import {useEffect, useState, useRef} from 'react';


const Messgs = ({ mess }) => {

    const [Uid, setUid] = useState("")
    const messagesEndRef = useRef(null)

    useEffect(() => {

        messagesEndRef.current.scrollIntoView({behavior: "smooth"})

        auth.onAuthStateChanged(function(user) {
            if(user){
                setUid(auth.currentUser.uid)
            }
        })
        
    }, [])

    return(
    <div className="messg__wrapper">
        <div className={`messg__container ${mess.uid === Uid ? "right" : "left"}`}>
            <div className="sentby__container">{mess.name}</div>
            <p className="sentText__container">{mess.text}</p>
            <div ref={messagesEndRef}></div>
        </div>
    </div>
    );
};

export default Messgs;