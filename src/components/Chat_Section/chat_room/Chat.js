import './chat.css';
import Messgs from "../chat_bubbles/messg";
import Scroll from '../chat_scroll/Scroll';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { auth, db } from "../../../firebase_setup/firebase";
import { motion } from 'framer-motion';

const ChatSect = ({ convo_name, room_id }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(function(user){

            if(user){

                const q = query(collection(db, "chatrooms"), where("room_id", "==", room_id));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {

                    let messagez = [];

                    querySnapshot.forEach((doc) => {

                        doc.data().messages.forEach(mess => {
                            messagez.push(mess)
                        })

                        setMessages(messagez)
                    })
                })

                return () => unsubscribe
            }

        })
    });

    return(
        <motion.div 
            className="main-content"

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            <div className="chatRoom__container">
                <div className="userProfile__container">
                    <div className="exitConvo__container">
                       <Link to="/navbar/contacts/contct"><i className="bi bi-caret-left-fill"></i></Link> 
                    </div>
                    <div className="img-name__container">
                        <span className="profileName">{convo_name}</span>
                    </div>
                </div> 
                <Scroll>
                    {messages?.map((message) => (
                        <Messgs key={message.id} mess={message} chatroomID={room_id} />
                    ))}
                </Scroll>
            </div>
        </motion.div>
    );
}

export default ChatSect;