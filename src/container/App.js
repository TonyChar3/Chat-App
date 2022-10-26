import NavChatApp from '../components/Navbar/Navbar';
import Contacts from '../components/contacts/contacts';
import ChatSect from '../components/convo/Chat';
import MsgInput from '../components/Message/MsgInput';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavChatApp />
      <div>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
        <ChatSect />
        <MsgInput />
      </div>
    </>
  );
}

export default App;
