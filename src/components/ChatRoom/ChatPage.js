import ChatSect from '../convo/Chat';
import MsgInput from '../Message/MsgInput';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {

    const location = useLocation();
    const { room_name, cntct_id } = location.state;

    return(
        <>
            <ChatSect convo_name={ room_name } contct_id={cntct_id} />
            <MsgInput chat_name={ room_name } />
        </>
    );
}

export default ChatPage;