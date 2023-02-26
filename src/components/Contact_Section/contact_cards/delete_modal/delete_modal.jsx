
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const DeleteModal = ({ activate, contact_id, chatroom_id, contct_confirmed, delete_c, close_modal }) => {
    
    const [active, setModal] = useState(false); // activate the modal
    
    // handle the cancel button click
    const handleCancel = () => {

        // close the modal
        setModal(active => !active)

        // set the parent value
        close_modal(active => !active)
    }

    // handle the delete of the contact
    const handleDelete = () => {
        // run the handledelete function of the parent
        delete_c(contact_id, contct_confirmed, chatroom_id )

        // close the modal
        setModal(active => !active)

        // set the parent value
        close_modal(active => !active)
    }

    useEffect(() => {
        // set the modal with the prop value
        setModal(activate)
    },[activate])
    
    let toggleContainer = active? 'delete-contact-modal__container-active' : '';
    
    return(
        <>
            <div className={`delete-contact-modal__container ${toggleContainer}`}>
                <h2>Are you sure ?</h2>
                <div className="delete-contact-modal-button__container">
                    <motion.button 
                        whileTap={{ scale: 0.90 }} 
                        id="delete-contact-modal__delete-button"
                        onClick={handleDelete}
                    >
                        Delete
                    </motion.button>
                    <motion.button 
                        whileTap={{ scale: 0.90 }} 
                        id="delete-contact-modal__cancel-button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </motion.button>
                </div>
            </div>
        </>
    );
}

export default DeleteModal;