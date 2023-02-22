import { NavLink, Outlet  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { auth, db } from "../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';


const NavChatApp = () => {
  
  const [inviteNum, setNum] = useState(0);
  const [contactPage, setContactPage] = useState();
  const [invitePage, setInvitePage] = useState();
  const [settingPage, setSettingPage] = useState();

  const currentContactStyle = ({ isActive }) => {
    isActive? setContactPage(true) : setContactPage(false)
  }

  const currentInviteStyle = ({ isActive }) => {
    isActive? setInvitePage(true) : setInvitePage(false)
  }

  const currentSettingStyle = ({ isActive }) => {
    isActive? setSettingPage(true) : setSettingPage(false)
  }

  useEffect(() => {

    auth.onAuthStateChanged(function(user) {
            
      if(user){
          const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));

          const unsubscribe = onSnapshot(q, (querySnapshot) => {

              querySnapshot.forEach((doc) => {
                setNum(doc.data().invitations.length)
              })
          })

          return () => unsubscribe
      } 
    })

  },[])

  let toggleContact = contactPage ? '-fill' : '';
  let toggleInvite = invitePage ? '-fill' : '';
  let toggleSetting = settingPage ? '-fill' : '';

   return (
            <>
            <nav className="nav__container">
              <div className="nav__TitleNtabs">
                <ul className="nav__tabs">
                  <NavLink style={currentContactStyle} to="contacts/contct" ><i className={`bi bi-chat-square${toggleContact}`}></i></NavLink>
                  <NavLink style={currentInviteStyle} to="invitations"><i className={`bi bi-people${toggleInvite}`}>{inviteNum}</i></NavLink>
                  <NavLink style={currentSettingStyle} to="settings"><i className={`bi bi-gear${toggleSetting}`}></i></NavLink>
                </ul>
              </div>
            </nav>
            <Outlet />
          </>

    );
};

export default NavChatApp;