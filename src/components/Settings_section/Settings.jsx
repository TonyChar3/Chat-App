import './setting.css';
import InviteFooter from '../Invitation_Section/Invitation_Footer/InviteFooter';
import ReactImg from "../../img/1174949_js_react js_logo_react_react native_icon.png";
import FirebaseImg from "../../img/logo-built_white.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase_setup/firebase';

const Settings = () => {

    const { logOut, user } = UserAuth();

    console.log(user.displayName)
    

    const [door, setDoor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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
        // when edit profile is clicked:
        //      -> Unlock the inputs
    }

    const handleSaving = async(e) => {
        e.preventDefault();

        //const userRef = doc(db, 'users', user.displayName)

        try{
            // update the firebase profile name
            //await updateProfile(user, {displayName: name})

            // update the firebase profile email
            //await updateProfile(user, {email: email})

            //update the db
            
        } catch(error){

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
            <div className="setting__container">
                <div className="settingProfile__container ">
                    <form onSubmit={handleSaving} className="shadow-drop-2-center">
                        <i className="bi bi-person-circle"></i>
                        <div className="welcomeProfile_Name_container">
                            <input 
                                type="text" 
                                className={edit? 'input__active' : 'input__disabled'}
                                value={name} 
                                placeholder={user.displayName} disabled={edit? "" : 'disabled'} 
                                onChange={(e) => handleName(e.target.value)} 
                            />
                        </div>
                        <div className="welcomeProfile_Email_container">
                            <input 
                                type="email" 
                                className={edit? 'input__active' : 'input__disabled'} 
                                value={email}
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