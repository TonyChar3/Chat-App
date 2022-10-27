import './chat.css';
import Scroll from '../Scroll/Scroll';
import { Link } from 'react-router-dom';

const ChatSect = () => {
    return(
        <div className="main-content">
            <div className="chatRoom__container">
                <div className="userProfile__container">
                    <div className="img-name__container">
                        <i className="bi bi-chat"></i>
                        <span className="profileName">Jane Doe</span>
                    </div>
                    <div className="exitConvo__container">
                       <Link to="/navbar/contacts"><i className="bi bi-x-circle"></i></Link> 
                    </div>
                </div>
                <Scroll>
                    <div className="chatSent__container">
                        <div></div>
                        <div className="message__container">
                            <span>A sent message</span>
                        </div>
                        <div className="message__container_Received">
                            <span>A received message</span>
                        </div>
                        <div></div>
                        <div></div>
                        <div className="message__container">
                            <span>A sent message</span>
                        </div>
                        <div className="message__container_Received">
                            <span>A received message</span>
                        </div>
                    </div>
                </Scroll>
            </div>
        </div>
    );
}

export default ChatSect;