import './top_bar.css'
import { motion } from 'framer-motion';

const InviteTopBar = () => {

    return(
        <>
            <div className='footer__container'>
                <motion.div 
                    className="icon__container"
                    
                    initial={ { opacity: 0, scale: 1.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 }}}
                >
                    <i className="bi bi-chat-square-heart square-chat-bubble-icon"></i>
                </motion.div>
            </div>
        </>

    );
}

export default InviteTopBar;