import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaDumbbell, FaUserFriends, FaTrophy, FaBars, FaTimes } from 'react-icons/fa';
import './SideNavbar.css';

const SideNavbar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const closeSidebar = () => {
    if (window.innerWidth < 992) {
      toggleSidebar();
    }
  };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaHome /> },
    { path: '/find-match', name: 'Find a Match', icon: <FaSearch /> },
    { path: '/practice', name: 'Practice', icon: <FaDumbbell /> },
    { path: '/play-with-friend', name: 'Play With Friend', icon: <FaUserFriends /> },
    { path: '/leaderboard', name: 'Leaderboard', icon: <FaTrophy /> },
  ];

  return (
    <>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      
      <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <h3>HectoClash</h3>
        </div>
        
        <nav className="nav-menu">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''} 
                  onClick={closeSidebar}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div 
        className={`content-overlay ${isOpen && window.innerWidth < 992 ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default SideNavbar;