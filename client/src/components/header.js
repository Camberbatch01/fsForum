import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';

library.add(faBars);

const showNav = () => {
    const menu = document.getElementById('toggleOpt');
    if(menu.className === 'small-screen') {
        menu.className = 'small-screen-on';
    } else {
        menu.className = 'small-screen';
    }
}

const Header = () => (
    <header className="navbar">
        <div className="topBar">
            <Link id="navTitle" to="/user/dashboard">fsForum</Link>
            <ul>
                <li><Link to="/user/dashboard">Home</Link></li>
                <li><Link to="/user/profile">Profile</Link></li>
                <li><a href="http://localhost:3001/auth/logout">Logout</a></li>
            </ul>
            <button className="menuBars" onClick={() => showNav()}><FontAwesomeIcon icon={faBars}/></button>
        </div>
        <div className="small-screen" id="toggleOpt">
            <ul>
                <li><Link to="/user/dashboard">Home</Link></li>
                <li><Link to="/user/profile">Profile</Link></li>
                <li><a href="http://localhost:3001/auth/logout">Logout</a></li>
            </ul>
        </div>
    </header>
)

export default Header;