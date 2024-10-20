import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaHome, FaHospitalSymbol, FaUser } from "react-icons/fa";
import {
  BiAnalyse,
  BiBot,
  BiLogIn,
  BiRegistered,
  BiSolidContact,
  BiUser,
} from "react-icons/bi";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Slider.css";
import SidebarMenu from "./SidebarMenuItem";
import Logo from "../../../assets/logo.png";

const routes = [
  { path: "/home", name: "Home", icon: <FaHome /> },
  { path: "/about-us", name: "About Us", icon: <FaUser /> },
  { path: "/contact-us", name: "Contact Us", icon: <BiSolidContact /> },
  { path: "/analytics", name: "Analytics", icon: <BiAnalyse /> },
  { path: "/chatbot", name: "Chatbot", icon: <BiBot /> },
];

const profileRoutes = [
  { path: "/login", name: "Login", icon: <BiLogIn /> },
  { path: "/signup", name: "Sign Up", icon: <BiRegistered /> },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [activeRoute, setActiveRoute] = useState(""); // Track active route
  const location = useLocation(); // React Router hook to get current location

  // Update active route on location change
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: { duration: 0.5 },
    },
  };

  const logoAnimation = {
    hidden: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
    show: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="main-container bg-[#23252F]">
      <motion.div
        animate={{
          width: isOpen ? "200px" : "45px",
          transition: { duration: 0.5, type: "spring", damping: 10 },
        }}
        className={`sidebar h-full flex flex-col bg-black sticky top-0`}
        onMouseEnter={toggle}
        onMouseLeave={toggle}
      >
        <div className="top_section my-10">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={logoAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                <img
                  src={Logo}
                  style={{ mixBlendMode: "multiply" }}
                  className="w-[130px]"
                  alt="Logo"
                />
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="bars">
            <FaBars />
          </div>
        </div>

        <div className="h-full overflow-x-hidden flex flex-col justify-between">
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className={`link ${
                    activeRoute === route.path ? "active" : ""
                  }`} // Apply active class if route matches
                  onClick={() => setActiveRoute(route.path)} // Update active state
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>

          <section className="routes">
            {profileRoutes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className={`link ${
                    activeRoute === route.path ? "active" : ""
                  }`} // Apply active class if route matches
                  onClick={() => setActiveRoute(route.path)} // Update active state
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </div>
      </motion.div>

      <main>{children}</main>
    </div>
  );
};

export default SideBar;
