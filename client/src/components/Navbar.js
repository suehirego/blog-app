import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Navbar() {

   const { currentUser, logout } = useContext(AuthContext);
   const [click, setClick] = useState(false);

   const handleClick = () => setClick(!click);
   const closeMobileMenu = () => setClick(false);

   return (
      <>
         <IconContext.Provider value={{ color: "purple" }}>
            <nav className="navbar">
               <div className="navbar-container container">

                  <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>

                     <img src={logo} alt="" className="logo" />


                     {currentUser ?
                        <span> hi, {currentUser?.username}</span>
                        :
                        <span style={{ display: 'none' }}>{currentUser?.username}</span>
                     }
                  </Link>

                  <div className="menu-icon" onClick={handleClick}>
                     {click ? <FaTimes /> : <FaBars />}
                  </div>



                  <ul className={click ? "nav-menu active" : "nav-menu"}>


                     <li className="nav-item">
                        <NavLink
                           to="/"
                           className={({ isActive }) =>
                              "nav-links" + (isActive ? " activated" : "")
                           }
                           onClick={closeMobileMenu}
                        >
                           Home
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           to="/exercise"
                           className={({ isActive }) =>
                              "nav-links" + (isActive ? " activated" : "")
                           }
                           onClick={closeMobileMenu}
                        >
                           Fitness
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           to="/meals"
                           className={({ isActive }) =>
                              "nav-links" + (isActive ? " activated" : "")
                           }
                           onClick={closeMobileMenu}
                        >
                           Meals
                        </NavLink>
                     </li>

                     {currentUser ?

                        <li className="nav-btn1">
                           <NavLink
                              to="/write"
                              className={({ isActive }) =>
                                 "nav-links" + (isActive ? " activated" : "")
                              }
                              onClick={closeMobileMenu}
                           >
                              Write
                           </NavLink>
                        </li>

                        :
                        <li className="nav-btn1" style={{ display: 'none' }}>
                           <NavLink
                              to="/write"
                              className={({ isActive }) =>
                                 "nav-links" + (isActive ? " activated" : "")
                              }
                              onClick={closeMobileMenu}
                           >
                              Write
                           </NavLink>
                        </li>
                     }

                     {currentUser ?
                        <li className="nav-btn2" onClick={logout} >
                           <NavLink
                              to="/"
                              className={({ isActive }) =>
                                 "nav-links" + (isActive ? " activated" : "")
                              }
                              onClick={closeMobileMenu}
                           >
                              Logout
                           </NavLink>
                        </li>

                        :
                        <li className="nav-btn2">
                           <NavLink
                              to="/login"
                              className={({ isActive }) =>
                                 "nav-links" + (isActive ? " activated" : "")
                              }
                              onClick={closeMobileMenu}
                           >
                              Login
                           </NavLink>
                        </li>
                     }
                  </ul>
               </div>

            </nav>
         </IconContext.Provider>
      </>
   );
}

export default Navbar;