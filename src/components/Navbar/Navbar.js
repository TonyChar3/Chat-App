import { useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const NavChatApp = () => {
    // declare state hook
    const [isSticky, setSticky ] = useState(false);
    const [isSearch, setSearch ] = useState(false);

    // event listener to set state to true or false
    const ScrollStickyEvent = () => {
      window.scrollY > 5 ? setSticky(true) : setSticky(false);
    }

    const clickOpen = (event) => {
      event.preventDefault();
      setSearch(isSearch => !isSearch);
    }

    // Effect hook
    useEffect(() => {
    // When the user  scroll down toggle on event listener
      window.addEventListener("scroll", ScrollStickyEvent);
    return () => {
      // return it
      window.addEventListener("scroll", ScrollStickyEvent)
    };
    }, []);

    // ternary operator to choose either to close or open
    let toggleSticky = isSticky? 'sticky' : '';
    let toggleSearch = isSearch? 'search' : '';

    
    return(  
    <nav className="nav__container">
      <div className="nav__TitleNtabs">
        <h1 className="nav__title">Chat App</h1>
        <ul className="nav__tabs">
            <li>Sign-out</li>
            <li>Contacts</li>
        </ul>
      </div>
      <div onClick={clickOpen} className="searchIcon__container">
        <i  className="bi bi-search"></i>
      </div>

      <div className={`searchBar__container ${toggleSearch}`}>
        <input type="text" className="searchBar__input" placeholder="Find your friends" />
        <button className="searchBar__button">search</button>
      </div>
    </nav>);
};

export default NavChatApp;