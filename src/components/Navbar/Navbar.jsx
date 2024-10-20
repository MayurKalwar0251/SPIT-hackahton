import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { HoveredLink, Menu, MenuItem } from "./NavMenuItem";
import TextFlipItem from "./TextFlipItem";
import { TbMessageChatbotFilled, TbUsers } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

export const FloatingNav = ({ className, bgFix = false }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [navbarBg, setNavbarBg] = useState("bg-transparent");

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setNavbarBg(
        scrollPosition > window.innerHeight ? "bg-black" : "bg-transparent"
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      const node = event.target;
      if (
        !node ||
        !node.parentElement ||
        (!node.parentElement.closest(".navbar-container") &&
          !node.parentElement?.classList.contains("navbar-button"))
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const topVariants = {
    closed: { rotate: 0 },
    opened: { rotate: 45, backgroundColor: "rgb(255,255,255)" },
  };

  const centerVariants = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };

  const bottomVariants = {
    closed: { rotate: 0 },
    opened: { rotate: -45, backgroundColor: "rgb(255,255,255)" },
  };

  const listVariants = {
    closed: { x: "100vw" },
    opened: {
      x: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const listItemVariants = {
    closed: { x: -10, opacity: 0 },
    opened: { x: 0, opacity: 1 },
  };

  const menuItems = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Manav", url: "/manav" },
    { title: "Chutiya", url: "/chu" },
  ];

  const servicesMenuItems = [
    { title: "IVM", url: "/" },
    { title: "CRM", url: "/crm" },
    { title: "Admission", url: "/" },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={
          " flex fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black w-[70vw] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[50] items-center justify-center space-x-4"
        }
      >
        <div className="relative inset-x-0 w-full mx-auto z-50">
          <div
            className={`hidden md:block navbar-container w-full rounded-full transition-all duration-300 ${
              !bgFix ? navbarBg : "bg-black"
            }`}
          >
            <Menu setActive={setActive} isTransparent={true}>
              <div className="absolute left-3 top-1 sm:top-0 ">
                <img
                  src="https://res.cloudinary.com/dcn9t5qfr/image/upload/v1725277362/vgs_kjinxd.png"
                  alt="Company Logo"
                  width={70}
                  height={70}
                />
              </div>
              <TextFlipItem
                setActive={setActive}
                active={active}
                item="Home"
                url="/"
              />
              <TextFlipItem
                setActive={setActive}
                active={active}
                item="About"
                url="/about"
              />
              <TextFlipItem
                setActive={setActive}
                active={active}
                item="Contact"
                url="/contact"
              />
              <div className="flex gap-9 ">
                <Link to="/chatbot">
                  <TbMessageChatbotFilled className="size-7" />
                </Link>
                <Link to="/profile">
                  <Avatar className="size-16 border-gray-400">
                    <AvatarImage
                      className="w-[30px] h-[30px] rounded-full"
                      src={
                        "https://c8.alamy.com/comp/2J3B2T7/3d-illustration-of-smiling-businessman-close-up-portrait-cute-cartoon-man-avatar-character-face-isolated-on-white-background-2J3B2T7.jpg"
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </Menu>
          </div>
          <div className="relative md:hidden bg-black">
            <button
              className="w-10 h-6 flex flex-col justify-between z-50 absolute top-[20px] right-[20px] not-sr-only navbar-button"
              onClick={toggleMenu}
            >
              <motion.div
                variants={topVariants}
                animate={open ? "opened" : "closed"}
                className="w-8 h-1 bg-white rounded origin-left"
              />
              <motion.div
                variants={centerVariants}
                animate={open ? "opened" : "closed"}
                className="w-8 h-1 bg-white rounded"
              />
              <motion.div
                variants={bottomVariants}
                animate={open ? "opened" : "closed"}
                className="w-8 h-1 bg-white rounded origin-left"
              />
            </button>
            {open && (
              <motion.div
                variants={listVariants}
                initial="closed"
                animate="opened"
                className="absolute right-0 w-1/2 h-10% bg-black text-white flex flex-col items-center justify-center gap-8 z-40 sm:mt-0 border border-gray-700 rounded-xl h-80"
              >
                <div className="mt-[600px] ml-20 p-8 flex flex-col gap-4">
                  {menuItems.map((menuItem, index) => (
                    <MenuItem
                      key={index}
                      setActive={setActive}
                      active={active}
                      item={menuItem.title}
                      url={menuItem.url}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
