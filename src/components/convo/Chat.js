import './chat.css';
import Messgs from "../Message/messg";
import Scroll from '../Scroll/Scroll';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { auth, db } from "../../firebase_setup/firebase";

const ChatSect = ({ convo_name, contct_id }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(function(user){

            if(user){

                const q = query(collection(db, "chatrooms"), where("contact_id", "==", contct_id));

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
        <div className="main-content">
            <div className="chatRoom__container">
                <div className="userProfile__container">
                    <div className="img-name__container">
                        <i className="bi bi-chat"></i>
                        <span className="profileName">{convo_name}</span>
                    </div>
                    <div className="exitConvo__container">
                       <Link to="/navbar/contacts"><i className="bi bi-x-circle"></i></Link> 
                    </div>
                </div>
                <Scroll>
                    <div className="chatSent__container">
                        {messages?.map((message) => (
                            <Messgs key={message.id} mess={message} />
                        ))}
                        
                    </div>
                </Scroll>
            </div>
        </div>
    );
}

export default ChatSect;