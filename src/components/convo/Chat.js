import './chat.css';
import Scroll from '../Scroll/Scroll';
import Profile from '../../img/pexels-pixabay-220453.jpg';

const ChatSect = () => {
    return(
        <div className="main-content">
            <div className="chatRoom__container">
                <div className="userProfile__container">
                    <div className="img-name__container">
                        <img src={Profile} alt="*profile card" className="profileImg" />
                        <span className="profileName">Jane Doe</span>
                    </div>
                    <div className="exitConvo__container">
                    <i class="bi bi-box-arrow-right"></i>
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