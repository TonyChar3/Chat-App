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
    const [edit, setEdit] = useState(false); // Edit clicked or not
    const [alertDiv, setAlertDiv] = useState(false);// Alert message DIV
    const [alert, setAlert] = useState('');// Alert message

    // handle when 'Edit' is clicked
    const handleclickEdit = (data) => {
        // set edit state
        setEdit(data)
    }

    // handle the Alert DIV
    const handleAlertDiv = (event) => {
        setAlertDiv(event)
        setTimeout(() => {
            setAlertDiv(event => !event)
        },8000)
    }

    // handle the Alert message
    const handleAlertMess = (event) => {
        setAlert(event)
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
                    setContact(data)
                    
                })
                return () => unsubscribe 
            }
        })
    },[])

    let toggleAlertDiv = alertDiv? 'contact-alert__active' : '';
   
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
                                    contct_id={contctz.id}  
                                    confirmed={contctz.confirmed} 
                                    chatroom_ID={contctz.chatroom_id}
                                    contct_edit={edit}
                                    alert_mess={handleAlertMess}
                                    alert_div={handleAlertDiv}
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

                    <div className={`contact-alert__container ${toggleAlertDiv}`}>
                        <span id="contact-alert__span">{alert}</span>
                    </div>

                </div>

            </motion.div>
        </>
    )
}

export default Contacts;