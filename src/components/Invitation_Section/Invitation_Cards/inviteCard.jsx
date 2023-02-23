import './invitCard.css';
import {useState} from 'react';
import { doc, updateDoc, arrayRemove, arrayUnion, addDoc, collection } from 'firebase/firestore';
import { auth, db } from "../../../firebase_setup/firebase";


const InviteCard = ({ sender_name, sender_email, sender_uid }) => {

    const [arrow, setArrow] = useState(false); // arrow-icon state

    // ref to access the current user document
    const current_user_Ref = doc(db, 'users', auth.currentUser.uid)

    // ref to access the request sender document
    const sender_Ref = doc(db, 'users', sender_uid)

    // handle the arrow-icon state
    const handleArrowClick = (e) =>{

        e.preventDefault();

        // set state
        setArrow(arrow => !arrow);
    }

    // If the invitation is declined
    const handleDecline = async() => {
        
        try{

            //update the document of the current logged in user
            await updateDoc(current_user_Ref, {
                // remove the invitation from his 'invitations' array
                invitations:arrayRemove({
                    "id": sender_uid,
                    "sender_email": sender_email,
                    "sent_from": sender_name
                })
            })

            // update the document of the sender of the invite 
            await updateDoc(sender_Ref, {
                // remove the current user from his contact list
                contact: arrayRemove({
                    "chatroom_id": 0,
                    "confirmed": "",
                    "id": auth.currentUser.uid
                    
                })
            })

            // update the document of the sender of the invite
            await updateDoc(sender_Ref,{
                // add again the current user with 'confirmed' set to false
                // -> let the other user know the invite he sent was declined
                contact: arrayUnion({
                    "chatroom_id": 0,
                    "confirmed": "false",
                    "id": auth.currentUser.uid
                })
            })

        // catch error
        } catch(error){
            console.log(error)
        }

    }

    // If the invitation is accepted
    const handleAccept = async() => {

        // variable for the random chatroom ID
        let chatR_id = Math.floor(Math.random()*1000)

        try{

            // update the current logged in user document
            await updateDoc(current_user_Ref,{
                // add the sender to his contact list
                contact:arrayUnion({
                    "chatroom_id": chatR_id,
                    "confirmed": "true",
                    "id": sender_uid,
                })
            })

            // update the current logged in user document
            await updateDoc(current_user_Ref,{
                // remove the invite from his 'invitations' array
                invitations:arrayRemove({
                    "id": sender_uid,
                    "sender_email": sender_email,
                    "sent_from": sender_name
                })
            })

            /*
                Modify the sender contact 'confirmed' field to 'true'
            */

            // update the sender document
            await updateDoc(sender_Ref, {
                // remove the current user from his contact list
                contact:arrayRemove({
                    "chatroom_id": 0,
                    "confirmed": "",
                    "id": auth.currentUser.uid,  
                })
            })

            // update the sender document
            await updateDoc(sender_Ref, {
                // add the current user to his contact list
                // -> confirmed set to true to be able to chat with him
                contact: arrayUnion({
                    "chatroom_id": chatR_id,
                    "confirmed": "true",
                    "id": auth.currentUser.uid,
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
        
        // catch error
        } catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <div className="invite-card__container">
                <div className="invite-info__wrapper">

                    <div className="sender-info__container">
                        <span className="sender__name">
                            {sender_name}
                        </span>

                        <div className={`arrow-icon_wrapper ${arrow? "" : "arrow-down"}`}>
                            <i onClick={(e) => handleArrowClick(e)} className={`bi bi-caret-up `}></i>
                        </div>
                    </div>

                    <div className={`sender-email__wrapper ${arrow? "show-email" : ""}`}>
                        <span className="sender__email">
                            {sender_email}
                        </span>
                    </div>
                    
                </div>

                <div className="invite-button__container">
                    <button 
                        className="accept__button" 
                        onClick={handleAccept}
                    >
                        <i className="bi bi-check"></i>
                    </button>

                    <button 
                        className="decline__button" 
                        onClick={handleDecline}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>

            </div>
        </>
    );
}

export default InviteCard;