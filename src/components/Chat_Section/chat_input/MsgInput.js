import './MsgInput.css';
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase_setup/firebase";
import {query, collection, where, onSnapshot, Timestamp, updateDoc, arrayUnion, doc} from "firebase/firestore";
import { motion } from 'framer-motion';


const MsgInput = ({ chat_id }) => {
    
   
    const [chatroom_id, setID] = useState(); // chatroom ID

    const [ message, setMessage ] = useState(""); // for each chat

    useEffect(() => {
        
        // To keep the current logged in user state
        auth.onAuthStateChanged(function(user){

            if(user){

                // query the chatroom
                const q = query(collection(db, "chatrooms"), where("room_id", "==", chat_id));

                // query Snapshot
                const unsubscribe = onSnapshot(q , (querySnapshot) => {

                    // set the chatroom id state
                    querySnapshot.forEach((doc) => {
                        setID(doc.id)
                    })
                })

                return () => unsubscribe
            }
        })
    })

    // Send the Chat
    const sendMessage = async(event) => {

        event.preventDefault();

        try{
            // If no message is given
            if(message.trim() === ""){

                return;

            } else {
                // Ref for the chatroom document
                const docRef = doc(db, "chatrooms", chatroom_id);
                
                // Create the timestamp at which the chat was sent
                const created_at = Timestamp.fromDate(new Date())
                
                // the sent message object
                const sent_message ={
                    id: Math.floor(Math.random()*1000),
                    text: message,
                    name: auth.currentUser.displayName,
                    createdAt: created_at,
                    uid: auth.currentUser.uid,
                };
                
                // update the chatroom document 'messages' array
                await updateDoc(docRef, {

                    // add the new chat to the array
                    messages: arrayUnion(sent_message)
                });
                
                // reset the state of the message
                setMessage("")
                
            }
        
            // catch error
        } catch(error){
            console.log(error)
        }  
    }



    return(
        <>
            <motion.div 
                className="chatinput__container"

                initial={{ opacity: 0, width: 0, zIndex: 0 }}
                animate={{ opacity: 1, width: "100%", zIndex: 2 }}
                exit={{ opacity: 0, x: window.innerWidth, zIndex: 0, transition: { duration: 0.2 } }}
            >

                <motion.form 
                    inital={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onSubmit={(event) => sendMessage(event)}
                >

                    <motion.input 
                        whileFocus={{ scale: 1.01 }}  
                        type="text" 
                        id="chat__input" 
                        placeholder="send a chat..." 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    />

                    <div className="send_btn__container">

                        <motion.button 
                            whileTap={{ scale: 0.95 }} 
                            whileHover={{ scale: 1.1 }} 
                            type="submit"
                        >
                            <i className="bi bi-send"></i>

                        </motion.button>

                    </div>
                </motion.form>
            </motion.div>
        </>
    );
}

export default MsgInput;