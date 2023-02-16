import './setting.css';
import SignupModal from './modal/Modal';
import InviteFooter from '../Invitation_Section/Invitation_Footer/InviteFooter';
import ReactImg from "../../img/1174949_js_react js_logo_react_react native_icon.png";
import FirebaseImg from "../../img/logo-built_white.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from '../../firebase_setup/firebase';

const Settings = () => {

    const { logOut, user, credential } = UserAuth();

    console.log(credential)
    
    const [door, setDoor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [newName, setName] = useState('');
    const [newEmail, setEmail] = useState('');

    const navigate = useNavigate();

    const SignOut = async () => {
        try{
            await logOut()
            navigate('/')
        } catch(e){
            console.log(e)
        }
    }

    const handleEmail = (e) => {
        setEmail(e)
    }

    const handleName = (e) => {
        setName(e)
    }

    const handleCancelEdit = () => {
        setEdit(false);
        setName('')
        setEmail('')
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleSaving = async(e) => {
        e.preventDefault();

        const userRef = doc(db, 'users', user.uid)
        const checkNewName = query(collection(db,'users'), where('name',"==", newName))
        const checkNewEmail = query(collection(db,'users'), where('email',"==", newEmail))
        const checkBothInfo = query(collection(db,'users'), where('email','==', newEmail), where('name', '==', newName))

        try{

            if(newName === "" && newEmail === ""){
                setEdit(false);
                setName('')
                setEmail('')
                console.log('Nothing was changed (save)')

            } else if(newName === "") {

                let verif= [];

                const querySnapshot = await getDocs(checkNewEmail)

                querySnapshot.docs.map((doc) => {
                    return verif.push(doc.data().email)
                });

                if(verif.length > 0){
                    console.log('Email is taken')
                } else{
                    console.log('Email is not taken')
                    const crednts = EmailAuthProvider.credential(auth.currentUser.email, credential)
                    let reauth = await reauthenticateWithCredential(user, crednts)
                    // update the users DB
                    if(reauth){
                        await updateDoc(userRef, {
                            email: newEmail
                        })

                        await updateEmail(auth.currentUser, newEmail)

                        setEdit(false);
                        setName('');
                        setEmail('');
                    }
                }

            } else if(newEmail === ""){
                let verif = [];

                const querySnapshot = await getDocs(checkNewName);

                querySnapshot.docs.map((doc) => {
                    return verif.push(doc.data().name)
                });

                if(verif.length > 0){
                    console.log('The name already exist')
                } else {
                    console.log('The name is not already used')

                    await updateDoc(userRef, {
                        name: newName
                    });

                    await updateProfile(auth.currentUser, { displayName: newName})

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

    return(
        <>
        <motion.div 
            className="settings__background"

            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
        >
        <SignupModal />
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
        <InviteFooter />
        </>
    );
}

export default Settings;