import { NavLink, Outlet  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { auth, db } from "../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';


const NavBar = () => {
  
  const [inviteNum, setNum] = useState(0); // invitation counter
  const [contactPage, setContactPage] = useState(false); // Contact page is active
  const [invitePage, setInvitePage] = useState(false); // Invitation page is active
  const [settingPage, setSettingPage] = useState(false); // Setting page is active

  // Contact page is active
  const currentContactStyle = (e) => {
    setContactPage(e)
  }

  // Invitation page is active
  const currentInviteStyle = (e) => {
    setInvitePage(e)
  }

  // Setting page is active
  const currentSettingStyle = (e) => {
    setSettingPage(e)
  }

  useEffect(() => {

    // Keep the current logged in user state
    auth.onAuthStateChanged(function(user) {
            
      if(user){

        // query to get the current logged in user document
        const q = query(collection(db,"users"), where("user_uid", "==", auth.currentUser.uid));

        // query Snapshot
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

          // Loop through the snapshot document
          querySnapshot.forEach((doc) => {

            // set the counter of invitation
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
        <nav className="navbar__container">
          <div className="tabs__container">

            <ul className="navbar__tabs">

              <NavLink 

                to="contacts/contct" 
              >
                <i className={`bi bi-chat-square${toggleContact}`}></i>
              </NavLink>

              <NavLink 

                to="invitations"
              >
                <i className={`bi bi-people${toggleInvite}`}>
                  {inviteNum}
                </i>
              </NavLink>

              <NavLink 
 
                to="settings"
              >
                <i className={`bi bi-gear${toggleSetting}`}></i>
              </NavLink>

            </ul>

          </div>
        </nav>

        <Outlet />
      </>

    );
};

export default NavBar;