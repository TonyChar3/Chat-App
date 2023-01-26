import './MsgInput.css';
import { useState } from "react";
import { auth, db } from "../../firebase_setup/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


const MsgInput = () => {

    const [ message, setMessage ] = useState("");

    const sendMessage = async(event) => {
        event.preventDefault();

        if(message.trim() === ""){
            alert("Enter a valid message");
            return;
        }
        const { uid, displayName } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            text: message,
            name: displayName,
            createdAt: serverTimestamp(),
            uid,
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