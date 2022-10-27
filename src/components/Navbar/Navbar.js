
import './Navbar.css';
import { Link } from 'react-router-dom';

const NavChatApp = () => {
    return(  
    <nav className="nav__container">
      <div className="nav__TitleNtabs">
        <h1 className="nav__title"><Link to="/">Chat App</Link></h1>
        <ul className="nav__tabs">
            <Link><i className="bi bi-box-arrow-right">Sign-out</i></Link>
            <Link to="/contacts">Contacts</Link>
        </ul>
      </div>
    </nav>);
};

export default NavChatApp;