import './SearchContcts.css';
import {useState, useEffect} from 'react';
import { auth, db } from "../../../firebase_setup/firebase";
import { doc, arrayUnion, updateDoc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { motion } from 'framer-motion';


const SearchContcts = (props) => {

    const [Active, setActive] = useState(false);
    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [u_uid, setU_uid] = useState({});
    const [errAlert, setErrAlert] = useState("");
    const [editContcts, setEdit] = useState(false);



    const handleClick = (e) => {
        e.preventDefault();
        setActive(active => !active);
        setErrAlert("");
    }

    const handleName = (e) => {
        setName(e.trim())
    }

    const handleEmail = (e) => {
        setEmail(e.trim())
    }

    const handleAddon = async(e) => {

        e.preventDefault();

        try{

            if(name === "" || email === ""){

                setErrAlert("Please enter the info of your new contact")

            } else if(Object.keys(u_uid).length !== 0) {

                let al_added = false;
                
                const docRef = doc(db, "users", auth.currentUser.uid) // current active user ref
                const contctRef = doc(db, 'users', u_uid.user_uid) // the contact that he want to add ref

                const contct_snap = await getDoc(contctRef) // fetching the contact document
                const currentU_snap = await getDoc(docRef) // fetching the current active user document

                // Check the contact if the user is already added to the list
                currentU_snap.data().contact.forEach(cont => {

                    if(cont.id === u_uid.user_uid){

                        al_added = true;

                    }

                })

                if(al_added === true){

                    setErrAlert('User was already added')

                    al_added = false;
                    
                } else if(name === auth.currentUser.displayName || email === auth.currentUser.email){

                    setErrAlert('Do not add yourself')

                } else if (contct_snap.exists()){

                    // Create the contact object 
                    const contct_user ={
                        confirmed: "",
                        chatroom_id: 0,
                        id: contct_snap.data().user_uid
                    }

                    // Add it to the contact list of the current User
                    await updateDoc(docRef, {
                        contact: arrayUnion(contct_user)
                    })
                    
                    // Create the invite object
                    const invite = {
                        id: auth.currentUser.uid,
                        sent_from: auth.currentUser.displayName,
                        sender_email: auth.currentUser.email
                    }

                    // Send an Invite to the Added user
                    await updateDoc(contctRef, {
                        invitations: arrayUnion(invite)
                    })
                }

            } else{
                setErrAlert('User not found')
            } 
        } catch(error){
            console.log(error)
        }

        setName("")
        setEmail("")
        setU_uid("")
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(editContcts => !editContcts)
        props.func(editContcts => !editContcts)  
    }

    useEffect(() => {

        auth.onAuthStateChanged(function(user){

            if(user){
                // query to get the soon to be added contact uid
                const q = query(collection(db, 'users'), where("name", "==", name), where("email","==", email))
                                
                // get the uid 
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    
                    if (querySnapshot.size > 0){

                        querySnapshot.forEach((doc) => {
                       
                            setU_uid(doc.data())  
                        })
                        
                    } 
                })

                return () => unsubscribe
            }
        })

    },[name, email])

    let toggleActive = Active ? 'form_active' : '';

    return(
        <>
            <div className='searchContcts__container'>
                <motion.div 
                    className="plus__container"

                    initial={ { opacity: 0, scale: 1.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 }}}
                >
                    <motion.span onClick={handleEdit}>{editContcts? <i className="bi bi-x-circle"></i> : 'Edit'}</motion.span>
                    <motion.i whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.96 }} className="bi bi-person-plus-fill" onClick={handleClick}></motion.i>
                </motion.div>
            </div>
            <div className="addContcts__container">
                <div className={`addContcts__form ${toggleActive}`}>
                    <form id="addForm" onSubmit={handleAddon}>
                        <div className="closeBtn__container">
                            <i className="bi bi-x-circle" onClick={handleClick}></i>
                        </div>
                        <h2>{errAlert}</h2>
                        <div className="addContcts__Name">
                            <motion.input whileFocus={{ scale: 1.01 }} type="text" id="addContctsName_input" placeholder="Name" value={name} onChange={(e) => handleName(e.target.value)} />
                        </div>
                        <div className="addContcts__Email">
                            <motion.input whileFocus={{ scale: 1.01 }} type="email" id="addContctsEmail_input" placeholder="Email" value={email} onChange={(e) => handleEmail(e.target.value)} />
                        </div>
                        <div className="addContctsBtn__container">
                            <motion.button whileTap={{ scale: 0.95 }} type="submit" id="addContctsBtn">Send</motion.button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}

export default SearchContcts;