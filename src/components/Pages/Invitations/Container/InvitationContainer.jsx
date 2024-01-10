import './invitationcontainer.css';
import InvitationCard from '../Cards/InvitationCards';
import InvitationNavbar from '../Invatitions_navbar/InvitationNavbar';
import ContactScroll from '../../../../container/scroll/contact_scroll/ContactScroll';
import {useState, useEffect} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { auth, firebase_db } from '../../../../../firebase_setup/firebase_setup';

const InvitationContainer = () => {

    const [invite, setInvite] = useState([]); // Invitation array

    //JS media query for the framer motion animation inline style
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)'})

    useEffect(() => {
        // Keep the current logged in user state
        auth.onAuthStateChanged(function(user) {
            
            if(user){
                // query the current user document
                const q = query(collection(firebase_db,"users"), where("user_uid", "==", auth.currentUser.uid));

                // query Snapshot
                const unsubscribe = onSnapshot(q, (querySnapshot) => {

                    // invite data array
                    const invitation = [];

                    // loop through the snapshot document
                    querySnapshot.forEach((doc) => {

                        // loop through the 'invitations' array
                        doc.data().invitations.forEach(inv => {
                            // push in the array the invite object
                            invitation.push(inv); 
                        })
                        // set the invitation array state
                        setInvite(invitation)
                    })
                })
                return () => unsubscribe
            }
        })
    },[])

    return(
        <>
            <InvitationNavbar />

            <div className="invitation-section__wrapper">
                <motion.div 
                    className="invitation-section__container"

                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: isDesktop? "45%" : "100%" }}
                    exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
                >

                    <ContactScroll>
                        {
                        !invite.length ? 

                            <div className="no-invitation__container">

                                <h2 id="no-invitation__message">
                                    You have no invitation :(
                                </h2> 

                            </div>
                        :

                        invite?.map((invites) => (

                                <InvitationCard
                                    key={invites.id} 
                                    sender_name={invites.sent_from} 
                                    sender_email={invites.sender_email} 
                                    sender_uid={invites.id} 
                                />

                            ))
                        }
                    </ContactScroll>

                </motion.div>
            </div> 
        </>
    );
}

export default InvitationContainer;