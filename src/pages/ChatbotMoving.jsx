import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ChatbotMoving = (isSmall) => {
  const faceRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const eyeContainerRef = useRef(null);
  const svgRef = useRef(null); // Reference for the SVG element

  const [trigger] = useState(true);

  const [, setBoxShadow] = useState("white");

  useEffect(() => {
    const faceElements = faceRef.current;
    const leftEye = leftEyeRef.current;
    const rightEye = rightEyeRef.current;
    const eyeContainer = eyeContainerRef.current;

    if (!faceElements || !leftEye || !rightEye || !eyeContainer || !trigger)
      return;

    const tl = gsap.timeline({ repeat: -1 });

    // Entrance animation
    tl.to([leftEye, rightEye], {
      height: 66,
      width: 46,
      borderRadius: "40%",
      duration: 1,
      ease: "power2.inOut",
    })
      .to(faceElements, {
        x: 30,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        eyeContainer,
        {
          gap: "10px",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(faceElements, {
        x: -30,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(faceElements, {
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        eyeContainer,
        {
          gap: "24px",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      )
      .to([leftEye, rightEye], {
        height: 50,
        width: 50,
        borderRadius: "50%",
        duration: 1,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className="bg-amber-800"
      style={{
        position: "relative",
        width: "256px",
        height: "256px",
        background: "linear-gradient(90deg, #93B4F6 22.32%, #9747FF 100%)",
        borderRadius: "50%",
        boxShadow: `0px 0px 100px 20px rgba(86, 108, 255, 0.5)`,
      }}
    >
      <div
        ref={faceRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div ref={eyeContainerRef} style={{ display: "flex", gap: "24px" }}>
          {/* Left Eye */}
          <div
            ref={leftEyeRef}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          ></div>
          {/* Right Eye */}
          <div
            ref={rightEyeRef}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
          ></div>
        </div>
        {/* Semi Circle (Mouth) */}
        <div ref={svgRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="30"
            viewBox="0 0 60 30"
            fill="none"
          >
            <path
              d="M51.95 0C54.6456 0 55.9933 0 57.2129 0.766209C58.0843 1.31365 59.0437 2.57244 59.3405 3.55778C59.756 4.93687 59.4794 5.94251 58.9264 7.95379C58.5973 9.15082 58.1935 10.3287 57.7164 11.4805C56.2087 15.1203 53.999 18.4274 51.2132 21.2132C48.4274 23.999 45.1203 26.2087 41.4805 27.7164C37.8407 29.224 33.9397 30 30 30C26.0603 30 22.1593 29.224 18.5195 27.7164C14.8797 26.2087 11.5726 23.999 8.7868 21.2132C6.00104 18.4274 3.79125 15.1203 2.28361 11.4805C1.80654 10.3287 1.40273 9.15082 1.07359 7.95378C0.520555 5.9425 0.244039 4.93686 0.659484 3.55778C0.956315 2.57244 1.9157 1.31365 2.78708 0.766207C4.00667 -1.90735e-06 5.35444 -1.90735e-06 8.05 -1.90735e-06L30 0H51.95Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatbotMoving;
