import './contctsCard.css';
import { Link } from 'react-router-dom';
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, db } from "../../firebase_setup/firebase";

const ContctsCard = ({ contct_name, contct_id, contct_email }) => {

    const handleDelete = async(idx, nom, email) => {

        try{
            const contactRef = doc(db, 'users', auth.currentUser.displayName)

            await updateDoc(contactRef, {
                contact:arrayRemove({
                    "email": email,
                    "id": idx,
                    "name": nom
                })      
            })
            
            await deleteDoc(doc(db, 'chatrooms', nom));
        } catch(error){
            console.log(error)
        }

    }

    
    return(
        <>
            <div className="contctsCard__container">
                
                    <div className="name__container">
                        <span className="contcts__name">{contct_name}</span>
                    </div>
                    <div className="chatIcon__container">
                    <Link to="/navbar/chatpage" state={{ room_name: contct_name, cntct_id: contct_id }}><i className="bi bi-chat-square-fill"></i></Link>
                    </div>
                
                <div className="deleteIcon__container">
                    <i className="bi bi-trash" onClick={() => handleDelete(contct_id, contct_name, contct_email)}></i>
                </div>
            </div>
        
        </>

    );
}

export default ContctsCard;