import './setting.css';
import InviteFooter from '../Invitation_Section/Invitation_Footer/InviteFooter';
import ReactImg from "../../img/1174949_js_react js_logo_react_react native_icon.png";
import FirebaseImg from "../../img/logo-built_white.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';

const Settings = () => {

    const { logOut, user } = UserAuth();

    const [door, setDoor] = useState(false);

    const navigate = useNavigate();

    const SignOut = async () => {
        try{
            await logOut()
            navigate('/')
        } catch(e){
            console.log(e)
        }
    }

    const handleEdit = () => {
        
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
                <div className="settingProfile__container shadow-drop-2-center">
                    <i className="bi bi-person-circle"></i>

                    <div className="welcomeProfile_Name_container">
                        <input type="text" className="input__active" placeholder={user.displayName} />
                    </div>
                    <div className="welcomeProfile_Email_container">
                        <input type="email" className="input__disabled" placeholder={user.email} />
                    </div>
                    <div className="logout__container">
                        <motion.h2 whileTap={{ scale: 0.90 }} whileHover={{ scale: 1.1 }} onMouseOver={handleClick} onMouseLeave={handleClick} onClick={SignOut}>
                            Log out <i className={`bi bi-door-${door? "open" : "closed"}-fill`}></i>
                        </motion.h2>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} className="settingEdit__container">
                            <span >edit profile</span>
                        </motion.div>
                    </div>
  
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