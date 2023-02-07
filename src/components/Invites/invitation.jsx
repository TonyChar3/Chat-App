import './invite.css';
import ContctsScroll from '../Scroll/ContctsScroll';
import SearchContcts from '../Search&Add/SearchContcts';
import InviteCard from './inviteCard';
import {useState, useEffect} from 'react';
import { auth, db } from "../../firebase_setup/firebase";
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
                            console.log(inv)
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
                    {invite?.map((invitez) => (
                            <InviteCard key={invitez.id} sender_name={invitez.sent_from} sender_email={invitez.sender_email} sender_uid={invitez.id} />
                        ))}
                </ContctsScroll>
            </div>
        </div>
        <SearchContcts />
    </>
    );
}

export default InviteSect;