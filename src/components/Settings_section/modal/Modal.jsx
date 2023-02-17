import './modal.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { auth } from '../../../firebase_setup/firebase';


const SignupModal = ({ modal }) => {

    const { SignIn } = UserAuth();

    const [showPass, setShow] = useState(false);
    const [passwrd, setPasswrd] = useState('');
    const [showModal, setModals] = useState(false);
    const [error, setError] = useState('');

    const handlePasswrd = (e) => {
        setPasswrd(e)
    }

    const handleShowing = () => {
        setShow(showPass => !showPass)
    }

    const handleRe_sign = async(e) => {
        e.preventDefault();

        try{

            await SignIn(auth.currentUser.email, passwrd)

            setModals(showModal => !showModal)
            
        } catch(error){
            setError(error.code)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setModals(showModal => !showModal)
    }

    useEffect(() => {

        if(modal){
            setModals(showModal => !showModal)
        }
        
    },[modal])


    return(
        <div className={`Modal__wrapper ${showModal? 'modal_Active' : ''}`}>
            <form onSubmit={handleRe_sign}>
                <h3>Enter password</h3>
                <div className="passwordInput__container">
                    <motion.input whileFocus={{ scale: 1.02 }} type={showPass? 'text' : 'password'} onChange={(e) => handlePasswrd(e.target.value)} />
                    <span><i id="eye__password" onClick={handleShowing} className={`bi bi-eye${showPass? '' : '-slash'}`}></i></span>
                </div>
                <div className="modalBtn__container">
                    <motion.button whileTap={{ scale: 0.90 }} type="submit">Modify</motion.button>
                    <motion.button whileTap={{ scale: 0.90 }} onClick={handleCancel}>Cancel</motion.button>
                </div>
            </form>
            <div className="error__container">
                <span id="error__messg">{error}</span>
            </div>
        </div>
    );
}

export default SignupModal;