import './chatroom.css';
import ChatScrollContainer from '../../../../container/scroll/chat_scroll/ChatScroll';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { motion } from 'framer-motion';
import ChatBubbles from '../Text_bubbles/ChatBubbles';
import { auth, firebase_db } from '../../../../../firebase_setup/firebase_setup';

const ChatRoom = ({ convo_name, room_id }) => {

    const [chats, setChats] = useState([]); // chat array state
    const [black_screen, setBlckScreen] = useState(false);// black screen state

    // handle the black screen
    const handleBlackScreen = (event) =>{
        // set the black screen
        setBlckScreen(event)
    }

    useEffect(() => {

        // To keep the current logged in user state
        auth.onAuthStateChanged(function(user){

            if(user){

                // query to get the right chatroom from the DB
                const q = query(collection(firebase_db, "chatrooms"), where("room_id", "==", room_id));

                // query Snapshot
                const unsubscribe = onSnapshot(q, (querySnapshot) => {

                    // array for the chat data from the snapshot
                    let chat_data = [];

                    querySnapshot.forEach((doc) => {

                        // loop through the messages array
                        doc.data().messages.forEach(chatt => {

                            // push each separate chat into the array
                            chat_data.push(chatt)
                        })

                        // set the state
                        setChats(chat_data)
                    })
                })

                return () => unsubscribe
            }

        })
    });

    let toggleBlackScreen = black_screen ? 'chat-room-black-screen__active' : '';

    return(
        <>
            <div className="chat-room__wrapper">
                <motion.div 
                    className="chat-room__container"
                    
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                    <div className={`chat-room__black-screen ${toggleBlackScreen}`}>

                    </div>
                    <div className="user-profile__container">

                        <Link to="/navbar/contacts/contct">
                            <i className="bi bi-caret-left-fill exit-arrow"></i>
                        </Link> 
                        
                        <span className="name__span">
                            {convo_name}
                        </span>

                    </div> 

                    <ChatScrollContainer>
                        {chats?.map((message) => (
                            <ChatBubbles 
                                key={message.id} 
                                mess={message} 
                                chatroomID={room_id}
                                blck_screen={handleBlackScreen} 
                            />
                        ))}
                    </ChatScrollContainer>

                </motion.div>
            </div>
        </>

    );
}

export default ChatRoom;