import './App.css';
import {Route, Routes, useLocation } from 'react-router-dom';
import SignIn from '../components/Log_In_Form/SignInForm';
import Navbar from '../components/Navbar/Navbar';
import Contacts from '../components/Contact_Section/contacts_container/contacts';
import ContctsSect from '../components/Contact_Section/ContctsSect';
import ChatPage from '../components/Chat_Section/ChatPage';
import Register from '../components/Register_Form/Register';
import InviteSect from '../components/Invitation_Section/Invitation_Containers/invitation';
import ProtectedRoutes from '../components/Protected_Route/ProtectedRoutes';
import Settings from '../components/Settings_section/Settings';
import ContactProfile from '../components/Contact_Section/contact_cards/profile_section/ContactProfile';
import { AnimatePresence  } from "framer-motion";
import { AuthContextProvider } from '../context/AuthContext';

function App(){
  
  const location = useLocation();// react-route location

  return(
    <AuthContextProvider>

      <AnimatePresence mode='wait'>

        <Routes location={location} key={location.pathname} > 
          <Route path="/" element={<SignIn/>}  />
          <Route path="/register" element={<Register />} />
            <Route path="/navbar/*" element={ <ProtectedRoutes> <Navbar /> </ProtectedRoutes> }>
                  <Route path="contacts/*" element={<ContctsSect />}>
                    <Route path="contct" element={<Contacts />} />
                    <Route path="chatpage" element={<ChatPage />} />
                    <Route path="profilepage" element={<ContactProfile />} />
                  </Route>
                  <Route path="invitations" element={<InviteSect />} />
                  <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>

      </AnimatePresence> 
      
    </AuthContextProvider>
  );
}

export default App;
