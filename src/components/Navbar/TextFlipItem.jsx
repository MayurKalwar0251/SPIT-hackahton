import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Note: Ensure you are using motion if needed
import "./style.css";

export const TextFlipItem = ({
  setActive,
  active,
  item,
  url,
  setOpen,
  color = "white",
}) => {
  const handleClick = () => {
    if (setOpen !== undefined) {
      setOpen(false);
    }
  };

  const linkRef = useRef(null);

  useEffect(() => {
    if (linkRef.current) {
      const span = linkRef.current.querySelector("span");
      if (span) {
        // Set data attribute for animation effect
        span.setAttribute("data-title", span.textContent || "");
      }
    }
  }, []);

  return (
    <a href={url} onClick={handleClick} className="roll-link">
      <div ref={linkRef}>
        <span className={`nav-item-text text-${color}`}>{item}</span>
      </div>
    </a>
  );
};

export default TextFlipItem;
