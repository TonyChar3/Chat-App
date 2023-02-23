import './contacts.css';
import ContctsNav from '../contact_top_navbar/contact__navbar';
import ContctsScroll from '../Contact_scroll/ContctsScroll';
import ContctsCard from '../contact_cards/ContctsCard';
import {useState, useEffect} from 'react';
import { auth, db } from "../../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { motion } from 'framer-motion';

const Contacts = () => {
    const [contact, setContact] = useState([]); // contacts array
    const [fetch_data, setFetchData] = useState([]); // contact data array
    const [edit, setEdit] = useState(); // Edit clicked or not

    // handle when 'Edit' is clicked
    const handleclickEdit = (data) => {
        // set edit state
        setEdit(data)
    }

    // Reset contacts and contact data array if the contact gets removed
    const Deleted = (event) => {
        // set state
        setContact(event)
        setFetchData(event)
    }

    useEffect(() => {
        // Keep the current logged in user state
        auth.onAuthStateChanged(function(user) {
            
            if(user){

                //query the current logged in user
                const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));
                
                // query Snapshot
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    // array for the queried data
                    const data = [];
                    
                    // loop through the snapshot document
                    querySnapshot.forEach((doc) => {
                        // loop through the contact array
                        doc.data().contact.forEach(con => {
                            // push each contact object inside the array
                            data.push(con);
                        }) 
                    })
                    // set the state of the contact data array
                    setFetchData(data)
                    
                })
                return () => unsubscribe 
            }
        })
    },[])

    useEffect(() => {
        // if there's contacts objects inside the contact data array
        if(fetch_data.length > 0){

            // loop through the array
            fetch_data.forEach(each_u => {

                // query each contact with their user uid
                const q = query(collection(db, 'users'), where("user_uid","==", each_u.id))
                
                // query Snapshot
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    
                    // array for the data
                    let data = [];

                    // loop through the snapshot document
                    querySnapshot.forEach((doc) => {
                        
                        // create a contact object to be rendered in the DOM
                        let contact_data = {
                            id: doc.data().user_uid,
                            name: doc.data().name,
                            email: doc.data().email,
                            chatroom_id: each_u.chatroom_id,
                            confirmed: each_u.confirmed
                        }

                        // push the object         
                        data.push(contact_data)
                                    
                    })

                    //set the state of the contact array
                    setContact(data)
                    
                })         
                return () => unsubscribe
            })

         // if the contact data array was empty   
        } else {
            // set the contact array to empty
            setContact([])
        }

    },[fetch_data, contact.length])

    return(
        <>
            <ContctsNav func={handleclickEdit} />

            <motion.div 
                className="contact-section__wrapper"

                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <div className="contact-section__container">

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
                            <div className="no-contact__container">

                                <h2 id="no-contact__message">
                                    Add a contact to chatt :)
                                </h2>
                                
                            </div>
                        }
                    </ContctsScroll>

                </div>
            </motion.div>
        </>
    )
}

export default Contacts;