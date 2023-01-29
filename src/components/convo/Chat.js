import './chat.css';
import Messgs from "../Message/messg";
import Scroll from '../Scroll/Scroll';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../../firebase_setup/firebase";

const ChatSect = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const q = query(
            collection(db, "messages"),
            orderBy("createdAt"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {

            let messagez = [];

            QuerySnapshot.forEach((doc) => {
                messagez.push({ ...doc.data(), id: doc.id });
            });
            
            setMessages(messagez); 
        });

        return () => unsubscribe;

    }, []);

    return(
        <div className="main-content">
            <div className="chatRoom__container">
                <div className="userProfile__container">
                    <div className="img-name__container">
                        <i className="bi bi-chat"></i>
                        <span className="profileName">Jane Doe</span>
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