import './messg.css';
import { auth } from "../../firebase_setup/firebase";
import {useEffect, useState} from 'react';


const Messgs = ({ mess }) => {

    const [Uid, setUid] = useState("")

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if(user){
                setUid(auth.currentUser.uid)
            }
        })
        
    }, [])

    console.log(mess)

    return(
        <div className={`messg__container ${mess.uid == Uid ? "right" : "left"}`}>
            <div className="sentby__container">{mess.name}</div>
            <p className="sentText__container">{mess.text}</p>
        </div>
    );
};

export default Messgs;