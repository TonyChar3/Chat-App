import './App.css';
import {Route, Routes } from 'react-router-dom';
import SignIn from '../components/SignInForm/SignInForm';
import Navbar from '../components/Navbar/Navbar';
import ContctsSect from '../components/ContctsSect/ContctsSect';
import ChatPage from '../components/ChatRoom/ChatPage';
import Welcome from '../components/Welcome/Welcome';
import Register from '../components/RegisterForm/Register';
import InviteSect from '../components/Invites/invitation';

function App(){
  return(
    <Routes>
      <Route path="/" element={<SignIn/>}  />
      <Route path="/register" element={<Register />} />
      <Route path="/navbar/*" element={<Navbar />}>
        <Route path="welcome" element={<Welcome />} />
        <Route path="contacts" element={<ContctsSect />}  />
        <Route path="chatpage" element={<ChatPage />} />
        <Route path="invitations" element={<InviteSect />} />
      </Route>
    </Routes>
  )
}

export default App;
