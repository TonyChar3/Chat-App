import { NavLink, Outlet  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, firebase_db } from '../../firebase_setup/firebase';

const NavBar = () => {
  
  const [inviteNum, setNum] = useState(0); // invitation counter

  useEffect(() => {
    // Keep the current logged in user state
    auth.onAuthStateChanged(function(user) {     
      if(user){
        // query to get the current logged in user document
        const q = query(collection(firebase_db,"users"), where("user_uid", "==", auth.currentUser.uid));
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


return (
    <>
        <nav className="navbar__container">
          <div className="tabs__container">

            <ul className="navbar__tabs">

              <NavLink to="contacts/contct">

                {({isActive}) => (
                  <i className={`bi bi-chat-square${isActive? '-fill' : ''}`}></i>
                )}

              </NavLink>

              <NavLink to="invitations">

                {({isActive}) => (
                  <i className={`bi bi-people${isActive? '-fill' : ''}`}>
                    {inviteNum}
                  </i>
                )}

              </NavLink>

              <NavLink to="settings">

                {({isActive}) => (
                  <i className={`bi bi-gear${isActive? '-fill' : ''}`}></i>
                )}

              </NavLink>

            </ul>

          </div>
        </nav>
        <Outlet />
    </>

    );
};

export default NavBar;