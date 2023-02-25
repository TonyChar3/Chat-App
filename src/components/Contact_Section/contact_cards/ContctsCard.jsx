import './contctsCard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayRemove, arrayUnion, deleteDoc, query, collection, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from "../../../firebase_setup/firebase";
import { motion } from 'framer-motion';

const ContctsCard = ({ contct_id, confirmed, chatroom_ID, contct_edit, alert_mess, alert_div}) => {

    const [chatroom, setChatroom] = useState();// set the chatroom
    const [confirm, setConfirm] = useState();// confirmed value
    const [delete_contact, setDelete] = useState();// delete
    const [chat, setChat] = useState("");// access to the chat room
    const [edit, setEdit] = useState(false);// turn on/off the edit mode
    const [contct_name, setContactName] = useState('')// contact name
    const [contct_email, setContactEmail] = useState('')// contact name
    
    useEffect(() => {

        const q = query(collection(db, 'users'), where('user_uid', "==", contct_id))

        const unsubscribe = onSnapshot(q,(querySnapshot) => {

            querySnapshot.forEach(doc => {
                setContactEmail(doc.data().email)
                setContactName(doc.data().name)
            })
        })

        return () => unsubscribe
    },[])
    
    useEffect(() => {

        // current user document ref
        const current_user_Ref = doc(db, 'users', auth.currentUser.uid) 

        // if the edit value isn't undefined
        if(contct_edit !== undefined){
            // set the state
            setEdit(contct_edit)
        }
        
        // to delete the user 
        const handleDelete = async(idx, confirm, roomID) => {
            
            try{
                // contact document ref
                const contact_Ref = doc(db, 'users', idx)

                // update the current user document
                await updateDoc(current_user_Ref, {
                    // remove the contact object from the array
                    contact:arrayRemove({
                        "chatroom_id": roomID,
                        "confirmed": confirm,
                        "id": idx,
                    })      
                })

                // update the contact user document
                await updateDoc(contact_Ref,{
                    // remove the current user from his array
                    contact: arrayRemove({
                        'chatroom_id': roomID,
                        'confirmed': confirm,
                        "id": auth.currentUser.uid,
                    })
                })

                // update the contact user document
                await updateDoc(contact_Ref,{
                    // add a new contact object of the current user
                    // -> to show the other user he's been removed from the current user list
                    // -> 'confirmed' is set to deleted && 'chatroom_id' to 0
                    contact: arrayUnion({
                        'chatroom_id': 0,
                        'confirmed': 'deleted',
                        "id": auth.currentUser.uid,
                    })
                })

                // delete the chatroom from the 'chatrooms' DB
                await deleteDoc(doc(db, 'chatrooms', chatroom));

                // empty the contact list sent from the parent
                alert_div(true)
                alert_mess('Contact deleted...')
            
            // catch error
            } catch(error){
                console.log(error)
            }
        }

        // to clean-up your contact list if the current user has been removed by another user
        // OR if his invitation that he sent was declined
        const handleCleanUp = async(idx, confirmz) => {
            
            try{
                // update the current user document
                await updateDoc(current_user_Ref, {
                    // remove the contact from his contact list
                    contact: arrayRemove({
                        "chatroom_id": 0,
                        "confirmed": confirmz,
                        "id": idx
                    })
                })



            // catch error    
            } catch(error){
                console.log(error)
            }
        }

        // Keep the current logged in user state
        auth.onAuthStateChanged(function(user){
            if(user){

                // query the chatroom id
                const q = query(collection(db, "chatrooms"), where("room_id", "==", chatroom_ID));

                // query Snapshot
                const unsubscribe = onSnapshot(q , (querySnapshot) => {

                    // Loop through the snapshot document
                    querySnapshot.forEach((doc) => {
                        // set the chatroom state with the id
                        setChatroom(doc.id)
                    })
                })
                return () => unsubscribe
            }
        })

        // a switch to decide what will the state of the contact card
        switch(confirmed){
            case 'true':
                setConfirm(<i className="bi bi-chat-square-fill square-chat-icon"></i>)
                setDelete(<i className="bi bi-person-x-fill person-x-icon" onClick={() => handleDelete(contct_id, confirmed, chatroom_ID)}></i>)
                setChat("/navbar/contacts/chatpage")
                break;
            case 'false':
                setConfirm('rejected')
                setDelete(<i className="bi bi-x-circle x-icon" onClick={() => handleCleanUp(contct_id, confirmed)}></i>)
                setChat("")
                break;
            case 'deleted':
                setConfirm('removed')
                setDelete(<i className="bi bi-x-circle x-icon" onClick={() => handleCleanUp(contct_id, confirmed)}></i>)
                setChat("")
                break;
            default:
                setConfirm("waiting...")
                setDelete("")
                setChat("")
        }

    },[contct_id, contct_name, contct_email, confirmed, chatroom_ID, contct_edit, chatroom])
    
    return(
        <>
            <div className="contact-card__container"> 

                <div className="contact-card-name__container">
                    <span className="contact-card__name">
                        {contct_name}
                    </span>
                </div>

                {
                edit ?

                    null
                :
                    <motion.div whileHover={{ scale: 1.1 }} className="card-chat-icon__container">
                        <Link to={chat} state={{ room_name: contct_name, cntct_id: contct_id, chatroomID: chatroom_ID }}>
                            {confirm}
                        </Link>
                    </motion.div>
                }

                {
                edit ? 

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="card-delete-icon__container">
                        {delete_contact}
                    </motion.div>
                :             
                    null
                }

            </div>
        </>

    );
}

export default ContctsCard;