import './messg.css';
import { auth } from "../../firebase_setup/firebase";
import {useEffect, useState, useRef} from 'react';


const Messgs = ({ mess }) => {

    const [Uid, setUid] = useState("")
    const [date, setDate] = useState()
    const [messDate, setMessDate] = useState()
    const messagesEndRef = useRef(null)

    useEffect(() => {

        messagesEndRef.current.scrollIntoView({behavior: "smooth"})

        auth.onAuthStateChanged(function(user) {
            if(user){
                setUid(auth.currentUser.uid)
            }
        })

        setDate(new Date().toDateString())
        setMessDate(new Date(mess.createdAt.seconds * 1000).toDateString())
        
    },[mess.createdAt.seconds])

    

    return(
    <div className="messg__wrapper">
        <div className="messDateTime__container">
            <div className={mess.uid === Uid ? "Date__right" : "Date__left"}>{messDate === date? '': `${messDate} at ${new Date(mess.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</div>
            <div className={`sentTime__container ${mess.uid === Uid ? "Date__right" : "Date__left"}`}>{messDate === date? new Date(mess.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</div>
        </div>
        <div className={`messg__container ${mess.uid === Uid ? "right" : "left"}`}>
            <div className={`sentby__container ${mess.uid === Uid ? "sentBy__right" : "sentBy__left"}`}>{mess.name}</div>
            <div className="sentText__container">{mess.text}</div>
            <div ref={messagesEndRef}></div>
        </div>
    </div>
    );
};

export default Messgs;