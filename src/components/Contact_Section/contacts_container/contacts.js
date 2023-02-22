import './contacts.css';
import SearchContcts from '../Contact_add_form/SearchContcts';
import ContctsScroll from '../Contact_scroll/ContctsScroll';
import ContctsCard from '../contact_cards/ContctsCard';
import {useState, useEffect} from 'react';
import { auth, db } from "../../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { motion } from 'framer-motion';

const Contacts = () => {
    const [contact, setContact] = useState([]);
    const [fetch_data, setFetchData] = useState([]);
    const [edit, setEdit] = useState();

    const handleclickEdit = (data) => {
        setEdit(data)
    }

    const Deleted = (event) => {
        setContact(event)
        setFetchData(event)
    }

    useEffect(() => {

        auth.onAuthStateChanged(function(user) {
            
            if(user){

                const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));
    
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                    const data = [];
    
                    querySnapshot.forEach((doc) => {
                        console.log(querySnapshot.size)
                        doc.data().contact.forEach(con => {
                            data.push(con);
                        }) 
                    })
                    setFetchData(data)
                    
                })
                
                return () => unsubscribe 
            }
        })
    },[])

    useEffect(() => {

        if(fetch_data.length > 0){

            fetch_data.forEach(each_u => {

                const q = query(collection(db, 'users'), where("user_uid","==", each_u.id))
    
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
                    let data = [];
    
                    querySnapshot.forEach((doc) => {
                        console.log(querySnapshot.size)
                        let contact_data = {
                            id: doc.data().user_uid,
                            name: doc.data().name,
                            email: doc.data().email,
                            chatroom_id: each_u.chatroom_id,
                            confirmed: each_u.confirmed
                        }
                                    
                        data.push(contact_data)
                                    
                    })
                    setContact(data)
                    
                })
                           
                return () => unsubscribe
            })
            
        } else {
            setContact([])
        }

    },[fetch_data, contact.length])
    
    console.log(contact)

    return(
        <>
        <SearchContcts func={handleclickEdit} />
        <motion.div 
            className="contcts__firstContainer"

            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className="contcts__secndContainer">
                <ContctsScroll>
                    {contact.length > 0 ? 

                     contact.map((contctz) => (
                        <ContctsCard 
                            key={contctz.id} 
                            contct_name={contctz.name} 
                            contct_id={contctz.id} 
                            contct_email={contctz.email} 
                            confirmed={contctz.confirmed} 
                            chatroom_ID={contctz.chatroom_id}
                            contct_edit={edit}
                            funct={Deleted}
                        />
                    ))
                    :
                    <div className="emptyMessage__container">
                        <h2 id="empty__message">Add a contact to chatt :)</h2>
                    </div>
                    }
                </ContctsScroll>
            </div>
        </motion.div>
        
        </>

    )
}

export default Contacts;