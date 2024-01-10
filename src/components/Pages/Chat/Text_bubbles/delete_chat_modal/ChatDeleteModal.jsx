import './deletemodal.css'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const  ChatDeleteModal = ({ active, chat_message, delete_chat, close_modal }) => {

    const [active_modal, setModal] = useState(false);// show the delete modal

    // handle the cancel button
    const handleCancel = () => {
        // turn off the modal
        setModal(active_modal => !active_modal);
        // set the parent
        close_modal(active_modal => !active_modal);
    }

    // handle the delete of the chat
    const handleDeleteChat = () => {
        //delete the chat
        delete_chat(chat_message)
        // close the modal
        setModal(active_modal => !active_modal);
        // set the parent
        close_modal(active_modal => !active_modal);
    }

    useEffect(() => {
        // set the delete modal
        setModal(active)
    },[active])

    let toggleModal = active_modal ? 'delete-chat-modal__container-active' : '';

    return(
        <>
            <div className={`delete-chat-modal__wrapper`}>

                <div className={`delete-chat-modal__container ${toggleModal}`}>
                    <h2>Are you sure ?</h2>
                    <div className="delete-chat-modal-button__container">
                        <motion.button 
                            whileTap={{ scale: 0.90 }} 
                            id="delete-chat-modal__delete-button"
                            onClick={handleDeleteChat}
                        >
                            Delete
                        </motion.button>
                        <motion.button 
                            whileTap={{ scale: 0.90 }} 
                            id="delete-chat-modal__cancel-button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </motion.button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChatDeleteModal;