import './contctsCard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayRemove, arrayUnion, deleteDoc, query, collection, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from "../../../firebase_setup/firebase";
import { motion } from 'framer-motion';

const ContctsCard = ({ contct_name, contct_id, contct_email, confirmed, chatroom_ID, contct_edit }) => {

    const [deleteRoom, setDeleteRoom] = useState();
    const [confirmit, setConfirm] = useState();
    const [deletecont, setDelete] = useState();
    const [chat, setChat] = useState("");
    const [edit, setEdit] = useState(false);
    
    
    useEffect(() => {
        if(contct_edit !== undefined){
            setEdit(contct_edit)
        }
        
        // to delete the user 
        const handleDelete = async(idx, nom, email, confirm, roomID) => {
            try{
                // Ref for the query
                const contactRef = doc(db, 'users', auth.currentUser.uid)

                //Ref for the query
                const InviteRef = doc(db, 'users', idx)

                // remove the contact from his contact list
                await updateDoc(contactRef, {
                    contact:arrayRemove({
                        "chatroom_id": roomID,
                        "confirmed": confirm,
                        "email": email,
                        "id": idx,
                        "name": nom
                    })      
                })
                //remove the out-dated component
                await updateDoc(InviteRef,{
                    contact: arrayRemove({
                        'chatroom_id': roomID,
                        'confirmed': confirm,
                        "email": auth.currentUser.email,
                        "id": auth.currentUser.uid,
                        "name": auth.currentUser.displayName
                    })
                })
                //add the up-to-date component
                await updateDoc(InviteRef,{
                    contact: arrayUnion({
                        'chatroom_id': 0,
                        'confirmed': 'deleted',
                        "email": auth.currentUser.email,
                        "id": auth.currentUser.uid,
                        "name": auth.currentUser.displayName
                    })
                })
                // delete the chatroom
                await deleteDoc(doc(db, 'chatrooms', deleteRoom));

            } catch(error){
                console.log(error)
            }
        }

        // to clean up anyone who refused or deleted you from their contact list
        const handleCleanUp = async(idx, nom, email) => {
            try{
                // Ref for the query
                const contactRef = doc(db, 'users', auth.currentUser.uid)

                //remove the contact from the list
                await updateDoc(contactRef, {
                    contact: arrayRemove({
                        "chatroom_id": 0,
                        "confirmed": confirmed,
                        "email": email,
                        "id": idx,
                        "name": nom
                    })
                })

            } catch(error){
                console.log(error)
            }
        }

        // get the id of the chatroom document
        auth.onAuthStateChanged(function(user){
            if(user){

                const q = query(collection(db, "chatrooms"), where("room_id", "==", chatroom_ID));

                
                const unsubscribe = onSnapshot(q , (querySnapshot) => {

                    querySnapshot.forEach((doc) => {

                        setDeleteRoom(doc.id)
                    })
                })
                return () => unsubscribe
            }
        })

        // set the state of the contact card
        switch(confirmed){
            case 'true':
                setConfirm(<i className="bi bi-chat-square-fill"></i>)
                setDelete(<i className="bi bi-person-x-fill" onClick={() => handleDelete(contct_id, contct_name, contct_email, confirmed, chatroom_ID)}></i>)
                setChat("/navbar/contacts/chatpage")
                break;
            case 'false':
                setConfirm('rejected')
                setDelete(<i className="bi bi-x-circle" onClick={() => handleCleanUp(contct_id, contct_name, contct_email, confirmed)}></i>)
                setChat("")
                break;
            case 'deleted':
                setConfirm('removed')
                setDelete(<i className="bi bi-x-circle" onClick={() => handleCleanUp(contct_id, contct_name, contct_email, confirmed)}></i>)
                setChat("")
                break;
            default:
                setConfirm("waiting...")
                setDelete("")
                setChat("")
        }
    },[contct_id, contct_name, contct_email, confirmed, chatroom_ID, contct_edit, deleteRoom])
    
    return(
        <div className="contctsCard__container">  
            <div className="name__container">
                <span className="contcts__name">{contct_name}</span>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} className="chatIcon__container">
                <Link to={chat} state={{ room_name: contct_name, cntct_id: contct_id, chatroomID: chatroom_ID }}>{confirmit}</Link>
            </motion.div>

            {
            edit? 
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="deleteIcon__container">
                    {deletecont}
                </motion.div>
            :             
                null
            }
        </div>
    );
}

export default ContctsCard;