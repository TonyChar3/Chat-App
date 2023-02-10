import ChatSect from './chat_room/Chat';
import MsgInput from './chat_input/MsgInput';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {

    const location = useLocation();
    const { room_name, cntct_id, chatroomID } = location.state;

    return(
        <>
            <ChatSect convo_name={ room_name } room_id={chatroomID} />
            <MsgInput chat_id={ chatroomID } contct_id={cntct_id} />
        </>
    );
}

export default ChatPage;