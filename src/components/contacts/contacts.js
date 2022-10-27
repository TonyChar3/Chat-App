import './contacts.css';
import ProfilePic from '../../img/pexels-pixabay-220453.jpg';
import ContctsScroll from '../Scroll/ContctsScroll';
import { Link } from 'react-router-dom';

const Contacts = () => {
    return(
        <div className="contcts__firstContainer">
            <div className="contcts__secndContainer">
                <ContctsScroll>
                        <div className="contctsCard__container">
                            <img src={`${ProfilePic}`} alt="profl pic" className="Profl__pic" />
                            <span className="contcts__name">Jane Doe</span>
                            <div className="chatIcon__container">
                                <Link to="/navbar/chatpage"><i className="bi bi-chat"></i></Link>
                            </div>
                            <div className="deleteIcon__container">
                                <i className="bi bi-trash"></i>
                            </div>
                        </div>
                </ContctsScroll>
            </div>
        </div>
    );
}

export default Contacts;