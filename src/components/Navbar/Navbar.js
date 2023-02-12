import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase_setup/firebase";
import {collection, query, where, onSnapshot} from 'firebase/firestore';

const NavChatApp = () => {

  const [inviteNum, setNum] = useState(0);

  const navigate = useNavigate();

  const SignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((err) => {
      console.log(err)
    })
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

   return(
      auth.currentUser ? 
        <>
          <nav className="nav__container">
            <div className="nav__TitleNtabs">
              <h1 className="nav__title"><Link to="welcome">Chatt <i className="bi bi-chat-square"></i> </Link></h1>
              <ul className="nav__tabs">
                  <Link to="contacts">Contacts</Link>
                  <Link to="invitations"><i className="bi bi-people-fill">{inviteNum}</i></Link>
                  <i className='bi bi-box-arrow-right' onClick={SignOut}></i>
              </ul>
            </div>
          </nav>
          <Outlet />
        </>
      : 
      <Navigate to="/" /> 

   );
};

export default NavChatApp;