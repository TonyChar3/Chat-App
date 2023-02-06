import './invitCard.css';


const InviteCard = ({ sender_name, sender_email }) => {
    return(
        <div className="invitationCard__container">
            <div className="senderInfo__container">
                <select className="sender__name" name={sender_name}>
                    <option className="sender__email" value={sender_email}>{sender_email}</option>
                </select>
            </div>
            <div className="requestBtn__container">
                <button>Accept<i className="bi bi-check"></i></button>
                <button>Decline<i className="bi bi-x"></i></button>
            </div>
        </div>
    );
}

export default InviteCard;