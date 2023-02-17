import { Link, Outlet  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { auth, db } from "../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';


const NavChatApp = () => {
  
  const [inviteNum, setNum] = useState(0);

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

   return (
    <>
      <nav className="nav__container">
        <div className="nav__TitleNtabs">
          <ul className="nav__tabs">
            <Link to="contacts/contct"><i className="bi bi-chat-square"></i></Link>
            <Link to="invitations"><i className="bi bi-people-fill">{inviteNum}</i></Link>
            <Link to="settings"><i className='bi bi-gear'></i></Link>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
    );
};

export default NavChatApp;