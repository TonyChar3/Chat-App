import './invite.css';
import ContctsScroll from '../../Contact_Section/Contact_scroll/ContctsScroll';
import InviteFooter from '../Invitation_Footer/InviteFooter';
import InviteCard from '../Invitation_Cards/inviteCard';
import {useState, useEffect} from 'react';
import { auth, db } from "../../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';



const InviteSect = () => {
    const [invite, setInvite] = useState([]);

    useEffect(() => {

        auth.onAuthStateChanged(function(user) {
            
            if(user){

                const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));

                const unsubscribe = onSnapshot(q, (querySnapshot) => {

                    const invitation = [];

                    querySnapshot.forEach((doc) => {

                        doc.data().invitations.forEach(inv => {
                            
                            invitation.push(inv); 
                        })
                        
                        setInvite(invitation)
                    })
                })
                return () => unsubscribe
            }
        })

    },[])
    return(
    <>
        <div className="invites__firstContainer">
            <div className="invites__secndContainer">
                <ContctsScroll>
                    {!invite.length ? 
                    <div className="emptyMessage__container">
                        <h2 id="empty__message">You have no invitation :(</h2> 
                    </div>
                    : 
                    invite?.map((invitez) => (
                            <InviteCard key={invitez.id} sender_name={invitez.sent_from} sender_email={invitez.sender_email} sender_uid={invitez.id} />
                        ))}
                </ContctsScroll>
            </div>
        </div>
        <InviteFooter />
    </>
    );
}

export default InviteSect;