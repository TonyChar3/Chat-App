import '../../Contact_Section/Contact_scroll/ContctsScroll.css';
import { motion } from 'framer-motion';
 
const Scroll = (props) => {
    return (
        <motion.div 
            className="Scroll__container"

            initial={{ scale: 1 }}
            animated={{ scale: 0.95 }}
            exit={{ scale: 0.01, transition: { duration: 0.2 } }}
        >
            {props.children}
        </motion.div>
    );
}

export default Scroll;