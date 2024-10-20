import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Home,
  Thermometer,
  Lightbulb,
  Lock,
  Video,
  BarChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const icons = [Home, Thermometer, Lightbulb, Lock, Video, BarChart];

const backgroundColors = [
  "from-purple-400 via-pink-500 to-red-500",
  "from-blue-400 via-green-500 to-yellow-500",
  "from-indigo-400 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-500",
  "from-yellow-400 via-red-500 to-pink-500",
  "from-pink-400 via-purple-500 to-indigo-500",
];

export default function SmartNexusTransitionLoader() {
  const [progress, setProgress] = useState(0);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 2.5; // Slower progress (fills in about 4s)
      });
    }, 50); // Updates every 50ms, slower increments

    const colorTimer = setInterval(() => {
      setCurrentColorIndex(
        (prevIndex) => (prevIndex + 1) % backgroundColors.length
      );
    }, 800); // Change background color every 0.8s

    return () => {
      clearInterval(timer);
      clearInterval(colorTimer);
    };
  }, []);

  // Redirect to "/home" once loading completes
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        navigate("/home"); // Redirect after a slight delay (optional)
      }, 300); // 0.3 second delay before redirecting
    }
  }, [progress, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentColorIndex}
          className={`absolute inset-0 bg-gradient-to-br ${backgroundColors[currentColorIndex]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
      </AnimatePresence>
      <div className="relative z-10 w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 space-y-6 px-4 md:px-8">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          SmartNexus
        </motion.h1>

        {/* Progress Bar */}
        <motion.div
          className="relative h-3 bg-white/30 overflow-hidden rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
          />
        </motion.div>

        {/* Icons with responsive scaling */}
        <div className="flex justify-between">
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: progress >= (index + 1) * (100 / icons.length) ? 1 : 0,
                rotate:
                  progress >= (index + 1) * (100 / icons.length) ? 0 : -180,
              }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Icon
                className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${
                  progress >= (index + 1) * (100 / icons.length)
                    ? "text-white"
                    : "text-white/50"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="flex items-center justify-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-base sm:text-lg lg:text-xl font-medium text-white">
            Entering SmartNexus...
          </span>
        </motion.div>
      </div>
    </div>
  );
}
