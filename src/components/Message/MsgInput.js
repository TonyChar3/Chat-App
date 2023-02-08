import './MsgInput.css';
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase_setup/firebase";
import {query, collection, where, onSnapshot, Timestamp, updateDoc, arrayUnion, doc} from "firebase/firestore";


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
                alert("Enter a valid message");
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
        <div className="msgInput__container">
            <form onSubmit={(event) => sendMessage(event)}>
                <input type="text" id="send__message" placeholder="send a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <div className="sendBtn__container">
                    <button type="submit"><i className="bi bi-send"></i></button>
                </div>
            </form>
        </div>
    );
}

export default MsgInput;