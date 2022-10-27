import './MsgInput.css';


const MsgInput = () => {
    return(
        <div className="msgInput__container">
            <input type="text" id="send__message" placeholder="send a message..." />
            <div className="sendBtn__container">
                <i className="bi bi-send"></i>
            </div>
        </div>
    );
}

export default MsgInput;