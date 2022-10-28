import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';


const NavChatApp = () => {
   return(
    <>
      <nav className="nav__container">
        <div className="nav__TitleNtabs">
          <h1 className="nav__title"><Link to="welcome">Chat App</Link></h1>
          <ul className="nav__tabs">
              <Link to="/"><i className='bi bi-box-arrow-right'>Sign-out</i></Link>
              <Link to="contacts" >Contacts</Link>
          </ul>
        </div>
      </nav>
      <Outlet/>
    </>
   );
};

export default NavChatApp;