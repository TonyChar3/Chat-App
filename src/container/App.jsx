import './App.css';
import {Route, Routes, useLocation } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';
import NavBar from '../components/Navbar/Navbar';
import RegisterForm from '../components/Register/RegisterForm';
import ProtectedRoutes from '../context/ProtectedRoutes';
import { AnimatePresence  } from "framer-motion";
import { AuthContextProvider } from '../context/AuthContext';
import InvitationContainer from '../components/Pages/Invitations/Container/InvitationContainer';
import ContactPage from '../components/Pages/Contact/ContactPage';
import ContactSectionContainer from '../components/Pages/Contact/Container/ContactContainer';
import SettingsPage from '../components/Pages/Settings/SettingsPage';
import ContactProfile from '../components/Pages/Contact/Card/profile/ContactProfile';
import ChatPage from '../components/Pages/Chat/ChatPage';
import ErrorPage from '../components/Pages/Error/404Page';

function App(){
  
  const location = useLocation();// react-route location

  return(
    <AuthContextProvider>

      <AnimatePresence mode='wait'>

        <Routes location={location} key={location.pathname} > 
          <Route path="/" element={<LoginForm />}  />
          <Route path="/register" element={<RegisterForm />} />
            <Route path="/navbar/*" element={ <ProtectedRoutes> <NavBar /> </ProtectedRoutes> }>
                  <Route path="contacts/*" element={<ContactPage />}>
                    <Route path="contct" element={<ContactSectionContainer />} />
                    <Route path="chatpage" element={<ChatPage />} />
                    <Route path="profilepage" element={<ContactProfile />} />
                    <Route path="*" element={<ErrorPage/>} />
                  </Route>
                  <Route path="invitations" element={<InvitationContainer />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="*" element={<ErrorPage/>} />
            </Route>
            <Route path="*" element={<ErrorPage/>} />
        </Routes>

      </AnimatePresence> 
      
    </AuthContextProvider>
  );
}

export default App;

