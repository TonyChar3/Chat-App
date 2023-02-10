import './contacts.css';
import ContctsScroll from '../Contact_scroll/ContctsScroll';
import ContctsCard from '../contact_cards/ContctsCard';
import {useState, useEffect} from 'react';
import { auth, db } from "../../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';



const Contacts = () => {

    const [contact, setContact] = useState([]);

    useEffect(() => {

        auth.onAuthStateChanged(function(user) {
            
            if(user){
    
                const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));
    
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                    const contacte = [];
    
                    querySnapshot.forEach((doc) => {
    
                        doc.data().contact.forEach(con => {
                            
                            contacte.push(con); 
                        })
                        
                        setContact(contacte)
                    })
                })
                return () => unsubscribe
            }
        })
    
    },[])

    return(
        <div className="contcts__firstContainer">
            <div className="contcts__secndContainer">
                <ContctsScroll>
                    {!contact.length ? 
                    <div className="emptyMessage__container">
                        <h2 id="empty__message">Add a contact to chatt :)</h2>
                    </div>
                     : 
                     contact?.map((contctz) => (
                        <ContctsCard key={contctz.id} contct_name={contctz.name} contct_id={contctz.id} contct_email={contctz.email} confirmed={contctz.confirmed} chatroom_ID={contctz.chatroom_id} />
                    ))}
                </ContctsScroll>
            </div>
        </div>
    )
}

export default Contacts;