import './App.css';
import {Route, Routes, useLocation } from 'react-router-dom';
import SignIn from '../components/Log_In_Form/SignInForm';
import Navbar from '../components/Navbar/Navbar';
import ContctsSect from '../components/Contact_Section/ContctsSect';
import ChatPage from '../components/Chat_Section/ChatPage';
import Welcome from '../components/Welcome_Section/Welcome';
import Register from '../components/Register_Form/Register';
import InviteSect from '../components/Invitation_Section/Invitation_Containers/invitation';
import { AnimatePresence  } from "framer-motion";

function App(){
  
  const location = useLocation();

  return(
      <AnimatePresence mode='wait' >
        <Routes location={location} key={location.pathname} >
          <Route path="/" element={<SignIn/>}  />
          <Route path="/register" element={<Register />} />
            <Route path="/navbar/*" element={<Navbar />}>
                  <Route path="welcome" element={<Welcome />} />
                  <Route path="contacts" element={<ContctsSect />}  />
                  <Route path="chatpage" element={<ChatPage />} />
                  <Route path="invitations" element={<InviteSect />} />
            </Route>
        </Routes>
      </AnimatePresence> 
  );
}

export default App;
