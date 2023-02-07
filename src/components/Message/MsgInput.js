import './MsgInput.css';
import { useState } from "react";
import { auth, db } from "../../firebase_setup/firebase";
import { doc, updateDoc, arrayUnion, Timestamp, } from "firebase/firestore";


const MsgInput = ({ chat_name }) => {

    const [ message, setMessage ] = useState("");

    const sendMessage = async(event) => {
        event.preventDefault();

        if(message.trim() === ""){
            alert("Enter a valid message");
            return;
        }
        const { uid, displayName } = auth.currentUser;

        const docRef = doc(db, "chatrooms", chat_name);

        // query where both confirmed uid are in
        // get the id of the room
        // add the message to the room

        const created_at = Timestamp.fromDate(new Date())

        const sent_message ={
            id: Math.floor(Math.random()*1000),
            text: message,
            name: displayName,
            createdAt: created_at,
            uid,
        };

        await updateDoc(docRef, {
            messages: arrayUnion(sent_message)
        });

        setMessage("")
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