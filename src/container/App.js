import NavChatApp from '../components/Navbar/Navbar';
import ContctsSect from '../components/ContctsSect/ContctsSect';
import ChatPage from '../components/ChatRoom/ChatPage';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavChatApp />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/contacts" element={<ContctsSect />} />
        </Routes>
    </>
  );
}

export default App;
