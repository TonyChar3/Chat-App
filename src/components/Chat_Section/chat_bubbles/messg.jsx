import './messg.css';
import { auth, db } from "../../../firebase_setup/firebase";
import { doc, updateDoc, arrayRemove, query, collection, onSnapshot, where } from 'firebase/firestore';
import {useEffect, useState, useRef} from 'react';
import { motion } from 'framer-motion';


const Messgs = ({ mess, chatroomID }) => {

    const [roomID, setRoomID] = useState()
    const [Uid, setUid] = useState("")
    const [date, setDate] = useState()
    const [messDate, setMessDate] = useState()
    const messagesEndRef = useRef(null)

    const handleDelMess = async(message) => {

        try{
            const contactRef = doc(db, 'chatrooms', roomID)
            
            await updateDoc(contactRef, {
                messages:arrayRemove(message)      
            })

        } catch(error){
            console.log(error)
        }

    }


    useEffect(() => {
    
        setTimeout(() => {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }, 100)

        auth.onAuthStateChanged(function(user) {
            if(user){
                setUid(auth.currentUser.uid)

                const q = query(collection(db, "chatrooms"), where("room_id", "==", chatroomID));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setRoomID(doc.id)
                    })
                })
                return () => unsubscribe
            }
        })

        setDate(new Date().toDateString())
        setMessDate(new Date(mess.createdAt.seconds * 1000).toDateString())
        
    },[mess.createdAt.seconds, mess.uid, chatroomID])

    

    return(
        <div className="messg__wrapper">
            <div className="messDateTime__container">
                <div className={mess.uid === Uid ? "Date__right" : "Date__left"}>{messDate === date? '': `${messDate} at ${new Date(mess.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</div>
                <div className={`sentTime__container ${mess.uid === Uid ? "Date__right" : "Date__left"}`}>{messDate === date? new Date(mess.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</div>
            </div>
            <motion.div 
            className={`messg__container ${mess.uid === Uid ? "right" : "left"}`}

            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 }}}
            >
                <div className={`sentby__container ${mess.uid === Uid ? "sentBy__right" : "sentBy__left"}`}>{mess.name}</div>
                <div className="sentText__container">{mess.text}</div>
                
            </motion.div>
            <motion.div 
                className={`messDel__container `}

                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 }}}
            >
                <div ref={messagesEndRef}></div>
                <i className={`bi bi-x ${mess.uid === Uid ? "Tcan__right" : "Tcan__left"}`} onClick={() => handleDelMess(mess)}></i>
            </motion.div>
        </div>

    );
};

export default Messgs;