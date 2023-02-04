import './contctsCard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, db } from "../../firebase_setup/firebase";

const ContctsCard = ({ contct_name, contct_id, contct_email, confirmed }) => {

    const [confirmit, setConfirm] = useState();
    const [chat, setChat] = useState("");
    
    const handleDelete = async(idx, nom, email, confirm) => {

        try{
            const contactRef = doc(db, 'users', auth.currentUser.displayName)

            await updateDoc(contactRef, {
                contact:arrayRemove({
                    "confirmed": confirm,
                    "email": email,
                    "id": idx,
                    "name": nom
                })      
            })
            
            // await deleteDoc(doc(db, 'chatrooms', nom));
        } catch(error){
            console.log(error)
        }

    }

    useEffect(() => {

        switch(confirmed){
            case 'true':
                setConfirm(<i className="bi bi-chat-square-fill"></i>)
                setChat("/navbar/chatpage")
                break;
            case 'false':
                setConfirm('rejected')
                setChat("")
                break;
            default:
                setConfirm("waiting...")
                setChat("")
        }

    },[confirmed])

    
    return(
        <div className="contctsCard__container">  
            <div className="name__container">
                <span className="contcts__name">{contct_name}</span>
            </div>
            <div className="chatIcon__container">
                <Link to={chat} state={{ room_name: contct_name, cntct_id: contct_id }}>{confirmit}</Link>
            </div>
                
            <div className="deleteIcon__container">
                <i className="bi bi-trash" onClick={() => handleDelete(contct_id, contct_name, contct_email, confirmed)}></i>
            </div>
        </div>
    );
}

export default ContctsCard;