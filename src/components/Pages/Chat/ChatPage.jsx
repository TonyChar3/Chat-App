import { useLocation } from 'react-router-dom';
import ChatInput from './Input/ChatInput';
import ChatRoom from './Room/ChatRoom';

const ChatPage = () => {

    /**
     * Chat section main component
     */

    const location = useLocation(); // get the react-router routes location

    const { room_name, cntct_id, chatroomID } = location.state;// de-constructed location.state

    return(
        <>
            <ChatRoom convo_name={ room_name } room_id={chatroomID} />
            
            <ChatInput chat_id={ chatroomID } contct_id={cntct_id} />
        </>
    );
}

export default ChatPage;