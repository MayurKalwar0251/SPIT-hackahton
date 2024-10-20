import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const Magnetic = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magneticRef.current, "x", {
      duration: 1,
      ease: "elastic.out(1,0,3)",
    });
    const yTo = gsap.quickTo(magneticRef.current, "y", {
      duration: 1,
      ease: "elastic.out(1,0,3)",
    });

    const handleMouseMove = (e) => {
      const { width, height, left, top } =
        magneticRef.current.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) * 0.5;
      const y = (e.clientY - (top + height / 2)) * 0.5;
      xTo(x);
      yTo(y);
    };
    const handleMouseLeave = (e) => {
      xTo(0);
      yTo(0);
    };

    magneticRef.current.addEventListener("mousemove", handleMouseMove);
    magneticRef.current.addEventListener("mouseleave", handleMouseLeave);
  }, []);

  return React.cloneElement(children, { ref: magneticRef });
};

export default Magnetic;
