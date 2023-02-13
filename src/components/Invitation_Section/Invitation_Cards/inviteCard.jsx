import './invitCard.css';
import {useState} from 'react';
import { doc, updateDoc, arrayRemove, arrayUnion, addDoc, collection } from 'firebase/firestore';
import { auth, db } from "../../../firebase_setup/firebase";


const InviteCard = ({ sender_name, sender_email, sender_uid }) => {

    const [arrow, setArrow] = useState(false);

    // ref to access the current user document
    const invitRef = doc(db, 'users', auth.currentUser.uid)

    // ref to access the request sender document
    const senderRef = doc(db, 'users', sender_uid)


    const handleArrowClick = (e) =>{
        e.preventDefault();
        setArrow(arrow => !arrow);
    }

    // Decline X
    const handleDecline = async() => {
        
        try{

            //remove the received invitation
            await updateDoc(invitRef, {
                invitations:arrayRemove({
                    "id": sender_uid,
                    "sender_email": sender_email,
                    "sent_from": sender_name
                })
            })

            // remove the out-dated object from the array
            await updateDoc(senderRef, {
                contact: arrayRemove({
                    "confirmed": "",
                    "email": auth.currentUser.email,
                    "id": auth.currentUser.uid,
                    "name": auth.currentUser.displayName,
                    "chatroom_id": 0
                })
            })

            // add a up-to-date object with confirmed set to false
            await updateDoc(senderRef,{
                contact: arrayUnion({
                    "confirmed": "false",
                    "email": auth.currentUser.email,
                    "id": auth.currentUser.uid,
                    "name": auth.currentUser.displayName,
                    "chatroom_id": 0
                })
            })
   
        } catch(error){
            console.log(error)
        }

    }

    // Accept
    // class to handle the acceptation of the request
    const handleAccept = async() => {

        //variable for the random chatroom ID
        let chatR_id = Math.floor(Math.random()*1000)

        try{

            // add the invite to the contact list
            await updateDoc(invitRef,{
                contact:arrayUnion({
                    "confirmed": "true",
                    "email": sender_email,
                    "id": sender_uid,
                    "name": sender_name,
                    "chatroom_id": chatR_id
                })
            })

            // remove it from the invitations list
            await updateDoc(invitRef,{
                invitations:arrayRemove({
                    "id": sender_uid,
                    "sender_email": sender_email,
                    "sent_from": sender_name
                })
            })

            /*
                Modify the sender contact 'confirmed' field to 'true'
            */

            // remove the out-dated contact object
            await updateDoc(senderRef, {
                contact:arrayRemove({
                    "confirmed": "",
                    "email": auth.currentUser.email,
                    "id": auth.currentUser.uid,
                    "name": auth.currentUser.displayName,
                    "chatroom_id": 0
                })
            })

            // add the new up-to-date object to the contact list
            await updateDoc(senderRef, {
                contact: arrayUnion({
                    "confirmed": "true",
                    "email": auth.currentUser.email,
                    "id": auth.currentUser.uid,
                    "name": auth.currentUser.displayName,
                    "chatroom_id": chatR_id
                })
            })

            /**
             * Create the chatroom with both the 'sender' & 'current user'
             */

            // create the document with auto ID in the chatroom DB
            await addDoc(collection(db,'chatrooms'), {
                room_id: chatR_id,
                messages: [],
                confirmed_user: {
                    u1:{
                        name: auth.currentUser.displayName,
                        u_uid: auth.currentUser.uid
                    },
                    u2:{
                        name: sender_name,
                        u_uid: sender_uid
                    }
                }
            })

        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className="invitationCard__container">
            <div className="Info__wrapper">
                <div className="senderInfo__container">
                    <span className="sender__name">{sender_name}</span>
                    <div className={`arrow_wrapper ${arrow? "" : "down"}`}>
                        <i onClick={(e) => handleArrowClick(e)} className={`bi bi-caret-up `}></i>
                    </div>
                </div>
                <div className={`email__wrapper ${arrow? "show-email" : ""}`}>
                    <span className="sender__email">{sender_email}</span>
                </div>
                
            </div>
            <div className="requestBtn__container">
                <button className="accept__btn" onClick={handleAccept}><i className="bi bi-check"></i></button>
                <button className="decline__btn" onClick={handleDecline}><i className="bi bi-x"></i></button>
            </div>
        </div>
    );
}

export default InviteCard;