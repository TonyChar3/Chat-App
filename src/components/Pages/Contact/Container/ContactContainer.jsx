import './contactcontainer.css';
import {useState, useEffect} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { auth, firebase_db } from '../../../../firebase_setup/firebase';
import ContactScroll from '../../../../container/scroll/contact_scroll/ContactScroll';
import ContactNavbar from '../Contact_navbar/ContactNavbar';
import ContactCard from '../Card/ContactCard';

const ContactSectionContainer = () => {
    const [contact, setContact] = useState([]); // contacts array
    const [edit, setEdit] = useState(false); // Edit clicked or not
    const [alertDiv, setAlertDiv] = useState(false);// Alert message DIV
    const [alert, setAlert] = useState('');// Alert message
    const [black_screen, setBlackScreen] = useState(false);// black screen for the modal

    // handle the black screen to activate or not
    const handleBlackScreen = (event) => {
        // activate or turn off
        setBlackScreen(event)
    }

    // handle when 'Edit' is clicked
    const handleclickEdit = (data) => {
        // set edit state
        setEdit(data)
    }

    // handle the Alert DIV
    const handleAlertDiv = (event) => {
        // show the alert div
        setAlertDiv(event)

        // turn off after 3 seconds
        setTimeout(() => {
            // turn off
            setAlertDiv(event => !event)
        },3000)
    }

    // handle the Alert message
    const handleAlertMess = (event) => {
        // set the alert message state
        setAlert(event)
    }

    // JS media query for framer motion inline animation style
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)'})

    useEffect(() => {
        // Keep the current logged in user state
        auth.onAuthStateChanged(function(user) {
            
            if(user){

                //query the current logged in user
                const q = query(collection(firebase_db,"users"), where("user_uid", "==", auth.currentUser.uid));
                
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
    let toggleBlckScreen = black_screen? 'contact-black-screen__active' : '';
   
    return(
        <>
            <ContactNavbar func={handleclickEdit} alert_message={handleAlertMess} alert_DIV={handleAlertDiv} />

            <div className="contact-section__wrapper">
           
                <motion.div 
                className="contact-section__container"

                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: isDesktop? "45%" : "100%" }}
                exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
                >

                    <div className={`contact-section__black-screen ${toggleBlckScreen}`}>

                    </div>

                    <ContactScroll>
                        {contact.length > 0 ? 

                            contact.map((contctz) => (
                                <ContactCard 
                                    key={contctz.id}  
                                    contct_id={contctz.id}  
                                    confirmed={contctz.confirmed} 
                                    chatroom_ID={contctz.chatroom_id}
                                    contct_edit={edit}
                                    alert_mess={handleAlertMess}
                                    alert_div={handleAlertDiv}
                                    blck_screen={handleBlackScreen}
                                />   
                            ))
                        :
                            <div className="no-contact__container">
                                <h2 id="no-contact__message">
                                    Add a contact to chatt :)
                                </h2>
                            </div>
                        }
                    </ContactScroll>

                    <div className={`contact-alert__container ${toggleAlertDiv}`}>
                        <span id="contact-alert__span">{alert}</span>
                    </div>

                </motion.div>
            
            </div>
        </>
    )
}

export default ContactSectionContainer;