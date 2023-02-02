import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase_setup/firebase";




const NavChatApp = () => {

  const navigate = useNavigate();

  const SignOut = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful")
      navigate("/");
    }).catch((err) => {
      console.log(err)
    })
  }

   return(
    <>
      <nav className="nav__container">
        <div className="nav__TitleNtabs">
          <h1 className="nav__title"><Link to="welcome">Chatt <i className="bi bi-chat-square"></i> </Link></h1>
          <ul className="nav__tabs">
              <Link to="contacts" >Contacts</Link>
              <i className='bi bi-box-arrow-right'onClick={SignOut}></i>
          </ul>
        </div>
      </nav>
      <Outlet/>
    </>
   );
};

export default NavChatApp;