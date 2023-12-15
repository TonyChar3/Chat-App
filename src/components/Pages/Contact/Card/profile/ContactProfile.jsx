import './contactprofile.css';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const ContactProfile = () => {

    const location = useLocation();

    const { name, email } = location.state

    // JS media query for the framer motion animation inline style
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)'})
    const isTablet = useMediaQuery({ query: '(min-width: 765px)'})

    return(
        <>
            <div 
                className="user-profile-page__wrapper"
            >
                <motion.div 
                    className="user-profile-page__container shadow-drop-2-center"

                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: isDesktop? "30%" : isTablet? "60%" : "80%" }}
                    exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 0.1 } }}
                >
                    <div className="user-profile-page__exit-container">
                        <Link to="/navbar/contacts/contct"><i className="bi bi-x-lg close-icon"></i></Link>
                    </div>

                    <i className="bi bi-person-circle profile-icon"></i>

                    <div className="user-profile-page-name__container">
                        <span id="user-profile-page-name__span">{name}</span>
                    </div>

                    <div className="user-profile-page-email__container">
                        <span id="user-profile-page-email__span">{email}</span>
                    </div>
                </motion.div>
            </div>
        </>
    );
}

export default ContactProfile;