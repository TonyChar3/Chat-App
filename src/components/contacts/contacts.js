import './contacts.css';
import ContctsScroll from '../Scroll/ContctsScroll';
import ContctsCard from '../ContctsCard/ContctsCard';
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase_setup/firebase";

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
                    {contact?.map((contctz) => (
                            <ContctsCard key={contctz.id} contct_name={contctz.name} contct_id={contctz.id} />
                        ))}
                </ContctsScroll>
            </div>
        </div>
    );
}

export default Contacts;