import './setting.css';
import SignupModal from './modal/Modal';
import ReactImg from "../../img/1174949_js_react js_logo_react_react native_icon.png";
import FirebaseImg from "../../img/logo-built_white.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from '../../firebase_setup/firebase';

const Settings = () => {

    // current user & his credentials with the log out function
    const { logOut, user, credential } = UserAuth();
    
    const [door, setDoor] = useState(false);// door icon
    const [edit, setEdit] = useState(false);// edit mode
    const [newName, setName] = useState('');// edited name
    const [newEmail, setEmail] = useState('');// edited email
    const [modal, setModal] = useState(false);// activate the modal

    // navigate with react-router-dom
    const navigate = useNavigate();

    // Log out is clicked
    const SignOut = async () => {

        try{
            // context log out function
            await logOut()
            //navigate to the sign-in form
            navigate('/')

        // catch error
        } catch(e){
            console.log(e)
        }
    }

    // handle the email state
    const handleEmail = (e) => {
        setEmail(e)
    }

    // handle the name state
    const handleName = (e) => {
        setName(e)
    }

    // handle the cancel of the edit mode
    const handleCancelEdit = () => {
        setEdit(false);
        setName('')
        setEmail('')
    }

    // handle the edit mode
    const handleEdit = () => {

        if( credential.length === 0){
            setModal(modal => !modal)
        } else {
            setEdit(true);
        }

    }

    // handle the save of the edited name or email or both
    const handleSaving = async(e) => {

        e.preventDefault();

        // ref of the currently logged in user
        const userRef = doc(db, 'users', user.uid)

        // query
        const checkNewName = query(collection(db,'users'), where('name',"==", newName)) // query the name
        const checkNewEmail = query(collection(db,'users'), where('email',"==", newEmail))// query the email
        const checkBothInfo = query(collection(db,'users'), where('email','==', newEmail), where('name', '==', newName))// query name && email

        try{

            // if nothing is given
            if(newName === "" && newEmail === ""){

                // reset state & close the edit mode
                setEdit(false);
                setName('');
                setEmail('');
            
            // only the email is edited
            } else if(newName === "") {

                // is verified array to verify if the email exist
                let verif= [];

                // query a document with the new email
                const querySnapshot = await getDocs(checkNewEmail)

                // loop through the snapshot document
                querySnapshot.docs.map((doc) => {
                    // push the fetched data in the array
                    return verif.push(doc.data().email)
                });

                // if the array contains an email
                if(verif.length > 0){

                    console.log('Email is taken')

                // if the array is empty
                } else{
                    
                    // get the current logged in user credential
                    const crednts = EmailAuthProvider.credential(auth.currentUser.email, credential)

                    // re-authenticate with the credential of the user
                    let reauth = await reauthenticateWithCredential(user, crednts)

                    // if the user is re-authenticated
                    if(reauth){

                        // update the current user document
                        await updateDoc(userRef, {
                            // change the email
                            email: newEmail
                        })
                        
                        // update the email of the user auth profile
                        await updateEmail(auth.currentUser, newEmail)
                        
                        // reset state
                        setEdit(false);
                        setName('');
                        setEmail('');
                    }
                }
            
            // only the name is edited
            } else if(newEmail === ""){

                // verify the name array
                let verif = [];

                // query a document with the given name
                const querySnapshot = await getDocs(checkNewName);

                // Loop through the Snapshot document
                querySnapshot.docs.map((doc) => {
                    // push in the verify array the name
                    return verif.push(doc.data().name)
                });

                // if the verif array isn't empty
                if(verif.length > 0){

                    console.log('The name already exist')
                
                // if the verif array is empty
                } else {

                    // update the current user document
                    await updateDoc(userRef, {
                        // update the name
                        name: newName
                    });

                    // update the user auth profile name
                    await updateProfile(auth.currentUser, { displayName: newName})

                    // reset the state
                    setEdit(false);
                    setName('');
                    setEmail('');
                }

            } else{
                let verif = [];

                const queryShot = await getDocs(checkBothInfo)

                queryShot.docs.map((doc) => {
                    return verif.push(doc.data())
                });

                if(verif.length > 0){
                    console.log('This name/email already exist')
                } else{
                    console.log('Good profile mod')

                    // update the name
                    await updateDoc(userRef, {
                        name: newName
                    });
                    //db
                    //auth profile
                    await updateProfile(auth.currentUser, { displayName: newName })

                    //update the email
                    const crednts = EmailAuthProvider.credential(auth.currentUser.email, credential)
                    let reauth = await reauthenticateWithCredential(user, crednts)

                    if(reauth){
                        await updateDoc(userRef, {
                            email: newEmail
                        })

                        await updateEmail(auth.currentUser, newEmail)
                    }
                    setEdit(false);
                    setName('');
                    setEmail('');
                }

            }
        } catch(error){
            console.log(error)
        }
    }

    const handleClick = () => {
        setDoor(door => !door);
    }

    useEffect(() => {
        setName(newName)
        setEmail(newEmail)
        setModal(false)
    },[newName, newEmail, modal])

    return(
        <>
        <motion.div 
            className="settings__background"

            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
        >

        <SignupModal modal={modal? true : false} />

            <div className="setting__container">
                <div className="settingProfile__container ">
                    <form onSubmit={handleSaving} className="shadow-drop-2-center">
                        <i className="bi bi-person-circle"></i>
                        <div className="welcomeProfile_Name_container">
                            <input 
                                type="text" 
                                className={edit? 'input__active' : 'input__disabled'}
                                value={newName} 
                                placeholder={user.displayName} disabled={edit? "" : 'disabled'} 
                                onChange={(e) => handleName(e.target.value)} 
                            />
                        </div>
                        <div className="welcomeProfile_Email_container">
                            <input 
                                type="email" 
                                className={edit? 'input__active' : 'input__disabled'} 
                                value={newEmail}
                                placeholder={user.email} 
                                disabled={edit? "" : 'disabled'}
                                onChange={(e) => handleEmail(e.target.value)} 
                            />
                        </div>
                        <div className="logout__container">
                            <motion.h2 whileTap={{ scale: 0.90 }} whileHover={{ scale: 1.1 }} onMouseOver={handleClick} onMouseLeave={handleClick} onClick={SignOut}>
                                Log out <i className={`bi bi-door-${door? "open" : "closed"}-fill`}></i>
                            </motion.h2>
                            <div className="settingEdit__container">
                                {edit ? 
                                <div className="saveOrLeave__container">
                                    <motion.button 
                                        whileHover={{ scale: 1.1 }} 
                                        whileTap={{ scale: 0.90 }} 
                                        id="save__btn"
                                        type="submit"
                                    > save </motion.button> 
                                    <motion.span 
                                        whileHover={{ scale: 1.1 }} 
                                        whileTap={{ scale: 0.90 }} 
                                        id="exit__btn" 
                                        onClick={handleCancelEdit}> cancel </motion.span>
                                </div> 
                                :
                                <motion.span 
                                    whileHover={{ scale: 1.1 }} 
                                    whileTap={{ scale: 0.90 }} 
                                    onClick={handleEdit}> edit profile </motion.span>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                

                <div className="madeWith__container shadow-drop-2-center">
                    <img src={ReactImg} alt="react logo" width="60" height="60" />
                    <span>X</span>
                    <img src={FirebaseImg} alt="firebase logo" width="160" height="60" />
                </div>
            </div>
        </motion.div>
        </>
    );
}

export default Settings;