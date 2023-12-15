import './contactnavbar.css';
import {useState, useEffect} from 'react';
import { doc, arrayUnion, updateDoc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { motion } from 'framer-motion';
import { auth, firebase_db } from '../../../../firebase_setup/firebase';


const ContactNavbar = (props) => {

    const [Active, setActive] = useState(false); // active form state
    const [name, setName ] = useState(""); // name of the contact state
    const [email, setEmail ] = useState(""); // email of the contact state
    const [added_contact, setAdded_Contact] = useState({}); // user object state
    const [errAlert, setErrAlert] = useState(""); // error message
    const [editContcts, setEdit] = useState(false); // active edit contact list


    // click event to activate the form
    const handleClick = (e) => {
        e.preventDefault();
        setActive(active => !active);
        setErrAlert("");
    }

    // event to set state of the name
    const handleName = (e) => {
        setName(e.trim())
    }

    // event to set state of the email
    const handleEmail = (e) => {
        setEmail(e.trim())
    }

    // when adding a contact
    const handleAddon = async(e) => {

        e.preventDefault();

        try{

            // if nothing was given
            if(name === "" || email === ""){

                // set error message
                setErrAlert("Please enter the info of your new contact")
             
                // if the added contact object isn't empty
            } else if(Object.keys(added_contact).length !== 0) {

                let flag = false;
                
                const current_user_Ref = doc(firebase_db, "users", auth.currentUser.uid) // current logged in active user ref

                const contact_Ref = doc(firebase_db, 'users', added_contact.user_uid) // the contact that he want to add ref

                const contact_snap = await getDoc(contact_Ref) // fetching the contact document

                const current_user_snap = await getDoc(current_user_Ref) // fetching the current active user document

                // Check the contact if the user is already added to the list
                current_user_snap.data().contact.forEach(cont => {

                    // if found
                    if(cont.id === added_contact.user_uid){
                        // flag it to true
                        flag = true;
                    }

                })

                // if flag true
                if(flag === true){

                    // error to notify the user
                    setErrAlert('User was already added')

                    // reset the flag value
                    flag = false;
                  
                    // check to not let the user add himself
                } else if(name === auth.currentUser.displayName || email === auth.currentUser.email){

                    // notify the user with error message
                    setErrAlert('Do not add yourself')
                
                // check if the added contact is registered for the chat app
                } else if (contact_snap.exists()){

                    // Create the contact object 
                    const contct_user ={
                        confirmed: "",
                        chatroom_id: 0,
                        id: contact_snap.data().user_uid
                    }

                    // update the current user document
                    await updateDoc(current_user_Ref, {
                        // add the contact to his contact array
                        contact: arrayUnion(contct_user)
                    })
                    
                    // Create the invite object
                    const invite = {
                        id: auth.currentUser.uid,
                        sent_from: auth.currentUser.displayName,
                        sender_email: auth.currentUser.email
                    }

                    // update the added contact document
                    await updateDoc(contact_Ref, {
                        // add an invitation to his invitations array
                        invitations: arrayUnion(invite)
                    })

                    // turn off the form
                    setActive(Active => !Active)
                    // turn on the alert div
                    props.alert_DIV(true)
                    // with the message
                    props.alert_message('New contact added')
                }

            } else{
                // notify the user with an error message if nothing is found
                setErrAlert('User not found')
            } 
        // catch error
        } catch(error){
            console.log(error)
        }

        // reset state
        setName("")
        setEmail("")
        setAdded_Contact("")
    }

    // event to handle when the 'Edit' is clicked on
    const handleEdit = (e) => {
        e.preventDefault();
        // set the state to true
        setEdit(editContcts => !editContcts)
        // send the value of the state to the parent component
        props.func(editContcts => !editContcts)  
    }

    useEffect(() => {

        // Keep the current logged in user state
        auth.onAuthStateChanged(function(user){

            if(user){
                // query to get the soon to be added contact
                const q = query(collection(firebase_db, 'users'), where("name", "==", name), where("email","==", email))
                                
                // query Snapshot
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    
                    // if the snapshot document isn't empty
                    if (querySnapshot.size > 0){

                        querySnapshot.forEach((doc) => {
                            
                            // the added contact object state
                            setAdded_Contact(doc.data())  
                        }) 
                    } 
                })
                return () => unsubscribe
            }
        })

    },[name, email])

    let toggleActive = Active ? 'form_active' : ''; // to active or not the form to add a contact

    let toggleFill = Active ? '-fill' : ''; // to set the icon to bi-person-plus-fill instead of bi-person-plus

    return(
        <>
            <div className="upper-navbar__container">

                <motion.div 
                    className="add-contact-icon__container"

                    initial={ { opacity: 0, scale: 1.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 }}}
                >
                    <motion.span 
                        onClick={handleEdit}
                    >
                        {
                        editContcts ? 
                            'Cancel'
                            : 
                            'Edit'
                        }
                    </motion.span>

                    <motion.i 
                        whileHover={{ scale: 1.2 }} 
                        whileTap={{ scale: 0.96 }} 
                        className={`bi bi-plus-circle${toggleFill} person-plus__icon`} 
                        onClick={handleClick}
                    ></motion.i>

                </motion.div>
            </div>

            <div className={`add-a-contact__container ${toggleActive}`}>

                <form onSubmit={handleAddon}>

                    <div className="close-btn__container">
                        <i className="bi bi-x-circle" onClick={handleClick}></i>
                    </div>

                    <h2>{errAlert}</h2>

                    <div className="name-input__container">

                        <motion.input 
                            whileFocus={{ scale: 1.01 }} 
                            type="text" 
                            id="contact-name__input" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => handleName(e.target.value)} 
                        />

                    </div>
                    <div className="addContcts__Email">

                        <motion.input 
                            whileFocus={{ scale: 1.01 }} 
                            type="email" 
                            id="contact-email__input" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => handleEmail(e.target.value)} 
                        />

                    </div>
                    <div className="add-btn__container">
                        <motion.button 
                            whileTap={{ scale: 0.95 }} 
                            type="submit" 
                            id="form-add-button"
                        >
                            Send
                        </motion.button>
                    </div>

                </form>

            </div>
        </>

    );
}

export default ContactNavbar;