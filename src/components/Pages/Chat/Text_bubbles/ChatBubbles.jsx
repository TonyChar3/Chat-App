import './chatbubble.css';
import ChatDeleteModal from './delete_chat_modal/ChatDeleteModal';
import { doc, updateDoc, arrayRemove, query, collection, onSnapshot, where } from 'firebase/firestore';
import {useEffect, useState, useRef} from 'react';
import { motion } from 'framer-motion';
import { auth, firebase_db } from '../../../../../firebase_setup/firebase_setup';

const ChatBubble = ({ mess, chatroomID, blck_screen }) => {

    const [roomID, setRoomID] = useState() // chat room ID
    const [Uid, setUid] = useState("") // user uid
    const [date, setDate] = useState() // for the current date
    const [messDate, setMessDate] = useState() // date of the sent message
    const [modal, setModal] = useState(false);// delete chat modal
    const messagesEndRef = useRef(null) // Ref for the last sent message

    // Activate the modal
    const handleDeleteModal = () => {
        // set the modal
        setModal(modal => !modal)
        // set the black screen
        blck_screen(modal => !modal)

    }

    // Delete a selected chat
    const handleDelMess = async(message) => {

        try{
            // ref to access the current chatroom in the 'chatrooms' DB
            const contactRef = doc(firebase_db, 'chatrooms', roomID)
            
            // update chat array in the DB
            await updateDoc(contactRef, {
                // remove the chat
                messages:arrayRemove(message)      
            })

        // catch error
        } catch(error){
            console.log(error)
        }

    }

    useEffect(() => {
        
        // To give time for the last chat to load before executing the 'scrollIntoView'
        setTimeout(() => {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }, 100)

        // Function to keep the state of the current user 
        auth.onAuthStateChanged(function(user) {
            if(user){

                // Get the current Logged in user uid
                setUid(auth.currentUser.uid)

                // query the chatroom with the given room ID
                const q = query(collection(firebase_db, "chatrooms"), where("room_id", "==", chatroomID));

                // The query Snapshot
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {

                        // Set the chat room ID
                        setRoomID(doc.id)
                    })
                })
                return () => unsubscribe
            }
        })

        // the current date
        setDate(new Date().toDateString())

        // The date of creation of the chat from the DB
        setMessDate(new Date(mess.createdAt.seconds * 1000).toDateString())
        
    },[mess.createdAt.seconds, mess.uid, chatroomID])

    
    return(
        <>
            <ChatDeleteModal 
                active={modal} 
                close_modal={handleDeleteModal} 
                chat_message={mess} 
                delete_chat={handleDelMess}  
            />

            <div className="chat__wrapper">
                <div className="chat-date-time__container">
                    
                    <div className="chat-date__right">
                        { messDate === date ? 

                        ""
                        : 

                        `${messDate} at ${new Date(mess.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                        }
                    </div>

                    <div className="chat-date__right">
                        { messDate === date? 
                        new Date(mess.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                        : 
                        ""
                        }
                    </div>

                </div>

                <motion.div 
                    className={`chat__container ${mess.uid === Uid ? "chat__right" : "chat__left"}`}

                    initial={{ opacity: 0, scale: 0.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 }}}
                >

                    <div className={`chat-sent-by__container ${mess.uid === Uid ? "chat-sent-by__right" : "chat-sent-by__left"}`}>
                        {mess.name}
                    </div>

                    <div className="chat-text__container">
                        {mess.text}
                    </div>
                    
                </motion.div>

                <motion.div 
                    className="chat-delete__container"

                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 }}}
                >

                    <div ref={messagesEndRef}></div>

                    <i 
                    className={`bi bi-x ${mess.uid === Uid ? "chat-delete__right" : "chat-delete__left"}`} 
                    onClick={handleDeleteModal}></i>

                </motion.div>
            </div>
        </>
    );
};

export default ChatBubble;