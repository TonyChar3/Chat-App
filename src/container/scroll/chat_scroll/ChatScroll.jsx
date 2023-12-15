import './chatscroll.css';
import { motion } from 'framer-motion';
 
const ChatScrollContainer = (props) => {

    // a container that will activate scroll when its
    //  content overflow its height

    return (
        <>
            <motion.div 
                className="scroll__container"

                initial={{ scale: 1 }}
                animated={{ scale: 0.95 }}
                exit={{ scale: 0.01, transition: { duration: 0.2 } }}
            >
                {props.children}
            </motion.div>
        </>
    );
}

export default ChatScrollContainer;