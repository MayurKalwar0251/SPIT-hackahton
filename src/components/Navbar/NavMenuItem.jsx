import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  url,
  setOpen,
}) => {
  const handleClick = () => {
    if (setOpen !== undefined) {
      setOpen(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setActive(item)}
      className={`relative top-[-308px] left-[-51px] md:top-0 md:left-0 items-center `}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        style={{ fontFamily: "Satoshi" }}
      >
        <a
          href={url}
          onClick={handleClick}
          className="text-neutral-200 hover:text-orange-500"
        >
          {item}
        </a>
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.7rem)] left-1/2 transform -translate-x-1/2">
              <motion.div layoutId="active">
                <motion.div layout className="w-max h-50% p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children, isTransparent = false }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={`z-50 relative rounded-full text-white border border-white/[0.2] ${
        isTransparent ? "bg-transparent" : "bg-[#0a141a]"
      } shadow-input flex justify-evenly space-x-4 px-6 py-6 !important`}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">{title}</h4>
        <p className="text-sm max-w-[10rem] text-neutral-300">{description}</p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <a {...rest} className="text-neutral-200 hover:text-orange-500">
      {children}
    </a>
  );
};
