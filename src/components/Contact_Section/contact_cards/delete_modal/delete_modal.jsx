import './deleteModal.css';
import { motion } from 'framer-motion';

const Delete_Modal = () => {
    return(
        <>
            <motion.div 
                className="delete-contact-modal__wrapper"

                
            
            >

                <div className="delete-contact-modal__container">
                    <h2>Are you sure ?</h2>
                    <div className="delete-contact-modal-button__container">
                        <button id="delete-contact-modal__delete-button">Delete</button>
                        <button id="delete-contact-modal__cancel-button">Cancel</button>
                    </div>
                </div>

            </motion.div>
        </>
    );
}

export default Delete_Modal;