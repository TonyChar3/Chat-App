import './invitCard.css';
import {useState} from 'react';


const InviteCard = ({ sender_name, sender_email }) => {

    const [arrow, setArrow] = useState(false);

    const handleArrowClick = (e) =>{
        e.preventDefault();
        setArrow(arrow => !arrow);
    }

    return(
        <div className="invitationCard__container">
            <div className="Info__wrapper">
                <div className="senderInfo__container">
                    <span className="sender__name">{sender_name}</span>
                    <div className={`arrow_wrapper ${arrow? "" : "down"}`}>
                        <i onClick={(e) => handleArrowClick(e)} class={`bi bi-caret-up `}></i>
                    </div>
                </div>
                <div className={`email__wrapper ${arrow? "show-email" : ""}`}>
                    <span className="sender__email">{sender_email}</span>
                </div>
                
            </div>
            <div className="requestBtn__container">
                <button className="accept__btn"><i className="bi bi-check"></i></button>
                <button className="decline__btn"><i className="bi bi-x"></i></button>
            </div>
        </div>
    );
}

export default InviteCard;