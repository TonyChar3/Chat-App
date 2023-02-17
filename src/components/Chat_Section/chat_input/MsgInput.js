import './MsgInput.css';
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase_setup/firebase";
import {query, collection, where, onSnapshot, Timestamp, updateDoc, arrayUnion, doc} from "firebase/firestore";
import { motion } from 'framer-motion';


const MsgInput = ({ chat_id }) => {
    
   
    const [chatroom_id, setID] = useState();
    const [ message, setMessage ] = useState("");

    useEffect(() => {
        
        auth.onAuthStateChanged(function(user){
            if(user){

                const q = query(collection(db, "chatrooms"), where("room_id", "==", chat_id));

                
                const unsubscribe = onSnapshot(q , (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data())
                        setID(doc.id)
                        console.log(chatroom_id)
                    })
                })
                return () => unsubscribe
            }
        })
    })

    const sendMessage = async(event) => {
        event.preventDefault();

        try{
            if(message.trim() === ""){
                return;
            } else {
                const docRef = doc(db, "chatrooms", chatroom_id);
    
                console.log(chatroom_id)
                const created_at = Timestamp.fromDate(new Date())
        
                const sent_message ={
                    id: Math.floor(Math.random()*1000),
                    text: message,
                    name: auth.currentUser.displayName,
                    createdAt: created_at,
                    uid: auth.currentUser.uid,
                };
        
                await updateDoc(docRef, {
                    messages: arrayUnion(sent_message)
                });
        
                setMessage("")
                
            }
        } catch(error){
            console.log(error)
        }  
    }



    return(
        <motion.div 
            className="msgInput__container"

            initial={{ opacity: 0, width: 0, zIndex: 0 }}
            animate={{ opacity: 1, width: "100%", zIndex: 2 }}
            exit={{ opacity: 0, x: window.innerWidth, zIndex: 0, transition: { duration: 0.1 } }}
        >
            <motion.form inital={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={(event) => sendMessage(event)}>
                <motion.input whileFocus={{ scale: 1.01 }}  type="text" id="send__message" placeholder="send a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <div className="sendBtn__container">
                    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.1 }} type="submit"><i className="bi bi-send"></i></motion.button>
                </div>
            </motion.form>
        </motion.div>
    );
}

export default MsgInput;