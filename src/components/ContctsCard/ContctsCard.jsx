import './contctsCard.css';
import { Link } from 'react-router-dom';

const ContctsCard = ({ contct_name }) => {

    
    return(
        <div className="contctsCard__container">
            <span className="contcts__name">{contct_name}</span>
            <div className="chatIcon__container">
                <Link to="/navbar/chatpage"><i className="bi bi-chat"></i></Link>
            </div>
            <div className="deleteIcon__container">
                <i className="bi bi-trash"></i>
            </div>
        </div>
    );
}

export default ContctsCard;