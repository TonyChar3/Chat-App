import './settingsmodal.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UserAuth } from "../../../../context/AuthContext";
import { auth } from '../../../../../firebase_setup/firebase_setup';

const SettingModal = ({ modal }) => {

    const { SignIn } = UserAuth();// context user sign-in function

    const [showPass, setShow] = useState(false);// show password
    const [passwrd, setPasswrd] = useState('');// password
    const [showModal, setModals] = useState(false);// show the modal
    const [error, setError] = useState('');// error message

    // handle the password state
    const handlePasswrd = (e) => {
        setPasswrd(e)
    }

    // handle show password state
    const handleShowing = () => {
        setShow(showPass => !showPass)
    }

    // handle the cancel of the re-sign in modal
    const handleCancel = (e) => {
        e.preventDefault();
        setModals(showModal => !showModal)
    }

    // handle the re-authentication
    const handleRe_sign = async(e) => {

        e.preventDefault();

        try{
            // re-signin the current user with his credential
            await SignIn(auth.currentUser.email, passwrd)

            // turn off the modal
            setModals(showModal => !showModal)

        // catch error   
        } catch(error){
            // set the error message
            setError(error.code)
        }
    }

    useEffect(() => {

        // if the modal is true (is showing)
        if(modal){
            // set it to his opposite value
            setModals(showModal => !showModal)
        }
        
    },[modal])
    
    let toggleAuthModal = showModal? 'auth-modal_active' : ''// show or not the modal

    return(
        <>
            <div className={`auth-modal__container ${toggleAuthModal}`}>

                <form onSubmit={handleRe_sign}>

                    <h3>Enter password</h3>

                    <div className="modal-password-input__container">
                        <motion.input
                            id="modal-password__input"
                            whileFocus={{ scale: 1.02 }} 
                            type={showPass? 'text' : 'password'} 
                            onChange={(e) => handlePasswrd(e.target.value)} 
                        />
                        
                        <span>
                            <i 
                                id="eye-icon__password" 
                                onClick={handleShowing} 
                                className={`bi bi-eye${showPass? '' : '-slash'}`}
                            ></i>
                        </span>
                    </div>

                    <div className="modal-button__container">
                        <motion.button whileTap={{ scale: 0.90 }} type="submit">
                            Modify
                        </motion.button>

                        <motion.button whileTap={{ scale: 0.90 }} onClick={handleCancel}>
                            Cancel
                        </motion.button>
                    </div>

                </form>

                <div className="modal-error__container">

                    <span id="modal-error__messg">
                        {error}
                    </span>

                </div>

            </div>
        </>
    );
}

export default SettingModal;