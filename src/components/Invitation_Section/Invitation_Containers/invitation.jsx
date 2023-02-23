import './invite.css';
import ContctsScroll from '../../Contact_Section/Contact_scroll/ContctsScroll';
import InviteTopBar from '../Invitation_top_bar/Invite_upper_bar';
import InviteCard from '../Invitation_Cards/inviteCard';
import {useState, useEffect} from 'react';
import { auth, db } from "../../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { motion } from 'framer-motion';



const InviteSect = () => {

    const [invite, setInvite] = useState([]); // Invitation array

    useEffect(() => {
        // Keep the current logged in user state
        auth.onAuthStateChanged(function(user) {
            
            if(user){
                // query the current user document
                const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));

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
            <InviteTopBar />

            <motion.div 
                className="invitation-section__wrapper"

                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <div className="invitation-section__container">

                    <ContctsScroll>
                        {
                        !invite.length ? 

                            <div className="no-invitation__container">

                                <h2 id="no-invitation__message">
                                    You have no invitation :(
                                </h2> 

                            </div>
                        :

                        invite?.map((invites) => (

                                <InviteCard 
                                    key={invites.id} 
                                    sender_name={invites.sent_from} 
                                    sender_email={invites.sender_email} 
                                    sender_uid={invites.id} 
                                />

                            ))
                        }
                    </ContctsScroll>

                </div>
            </motion.div> 
        </>
    );
}

export default InviteSect;