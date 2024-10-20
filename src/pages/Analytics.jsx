import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Lightbulb,
  Thermometer,
  Camera,
  BarChart2,
  Shield,
  Wind,
  Bell,
  Lock,
  Unlock,
  AlertTriangle,
  Sun,
  Moon,
  Cloud,
  Power,
  DoorOpen,
  Droplet,
  Zap,
  Activity,
  Mic,
} from "lucide-react";
import Swal from "sweetalert2";

// Mock data
const energyData = [
  { time: "00:00", usage: 2 },
  { time: "04:00", usage: 1 },
  { time: "08:00", usage: 3 },
  { time: "12:00", usage: 5 },
  { time: "16:00", usage: 4 },
  { time: "20:00", usage: 3 },
  { time: "23:59", usage: 2 },
];

const rooms = ["Living Room", "Kitchen", "Bedroom", "Office"];

// Mock environmental data for each room
const generateEnvironmentalData = () => {
  const times = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"];
  return rooms.map((room) => ({
    name: room,
    data: times.map((time) => ({
      time,
      temperature: Math.round(20 + Math.random() * 5),
      humidity: Math.round(40 + Math.random() * 20),
      airQuality: Math.round(80 + Math.random() * 20),
    })),
  }));
};

const environmentalData = generateEnvironmentalData();

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("home");
  const [isLightOn, setIsLightOn] = useState(false);
  const [temperature, setTemperature] = useState(21);
  const [isLocked, setIsLocked] = useState(true);
  const [currentRoom, setCurrentRoom] = useState("Living Room");
  const [notifications, setNotifications] = useState([]);
  const [humidity, setHumidity] = useState(45);
  const [airQuality, setAirQuality] = useState("Good");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [accessLog, setAccessLog] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTemperature(
        (prev) => Math.round((prev + (Math.random() - 0.5)) * 10) / 10
      );
      setHumidity((prev) =>
        Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 3) - 1))
      );
      if (Math.random() > 0.95) {
        const newAlert = `Motion detected in ${
          rooms[Math.floor(Math.random() * rooms.length)]
        }`;
        setNotifications((prev) => [...prev, newAlert]);
        showAlert(newAlert);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const showAlert = (message) => {
    Swal.fire({
      title: "Alert!",
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
      background: "#1F2937",
      color: "#FFFFFF",
      iconColor: "#FCD34D",
    });
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraOn(true);
      } catch (err) {
        console.error("Error accessing the camera:", err);
        showAlert(
          "Failed to access the camera. Please check your permissions."
        );
      }
    }
  };

  const handleTalk = async () => {
    const { value: text } = await Swal.fire({
      input: "text",
      inputLabel: "Who are you?",
      inputPlaceholder: "Enter your response here...",
      showCancelButton: true,
      background: "#1F2937",
      color: "#FFFFFF",
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#EF4444",
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (text) {
      if (text.toLowerCase().includes("family")) {
        Swal.fire({
          title: "Welcome Home!",
          text: "The door has been opened for family.",
          icon: "success",
          confirmButtonText: "OK",
          background: "#1F2937",
          color: "#FFFFFF",
          iconColor: "#10B981",
        });
        setIsLocked(false);
        addAccessLog("Door unlocked - Family member");
      } else {
        Swal.fire({
          title: "Access Denied",
          text: "Sorry, only family members are allowed entry at this time.",
          icon: "error",
          confirmButtonText: "OK",
          background: "#1F2937",
          color: "#FFFFFF",
          iconColor: "#EF4444",
        });
        addAccessLog("Access denied - Non-family member");
      }
    }
  };

  const addAccessLog = (event) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    const newLog = `${dateString} ${timeString} - ${event}`;
    setAccessLog((prev) => [newLog, ...prev.slice(0, 4)]);
  };

  const toggleLock = () => {
    setIsLocked((prev) => !prev);
    addAccessLog(isLocked ? "Door unlocked manually" : "Door locked manually");
  };

  const tabs = [
    { id: "home", icon: Sun, label: "Home" },
    { id: "energy", icon: Zap, label: "Energy" },
    { id: "security", icon: Shield, label: "Security" },
    { id: "environment", icon: Wind, label: "Environment" },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center md:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Smart Home Dashboard
      </motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`p-4 rounded-lg flex items-center justify-center ${
              activeTab === tab.id ? "bg-blue-600" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon className="w-6 h-6 mr-2" />
            <span className="hidden md:inline">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeInVariants}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "home" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">Lighting Control</h2>
                <div className="flex items-center justify-between">
                  <span>Main Light</span>
                  <motion.button
                    className={`w-16 h-8 rounded-full p-1 ${
                      isLightOn ? "bg-yellow-400" : "bg-gray-600"
                    }`}
                    onClick={() => setIsLightOn(!isLightOn)}
                  >
                    <motion.div
                      className="w-6 h-6 bg-white rounded-full"
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30,
                      }}
                    />
                  </motion.button>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Schedule</h3>
                  <div className="flex justify-between items-center">
                    <span>Turn on at sunset</span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Turn off at 23:00</span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Temperature Control
                </h2>
                <div className="flex items-center justify-between">
                  <Thermometer className="w-6 h-6" />
                  <span className="text-2xl">{temperature.toFixed(1)}°C</span>
                  <div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-l"
                      onClick={() =>
                        setTemperature((prev) => Math.max(16, prev - 0.5))
                      }
                    >
                      -
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-r"
                      onClick={() =>
                        setTemperature((prev) => Math.min(30, prev + 0.5))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Schedule</h3>
                  <div className="flex justify-between items-center">
                    <span>Set to 20°C at 22:00</span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span>Set to 22°C at 07:00</span>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">Room Selection</h2>
                <div className="grid grid-cols-2 gap-2">
                  {rooms.map((room) => (
                    <motion.button
                      key={room}
                      className={`p-2 rounded ${
                        currentRoom === room ? "bg-blue-600" : "bg-gray-700"
                      }`}
                      onClick={() => setCurrentRoom(room)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {room}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "energy" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Real-time Energy Usage
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
              <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Energy Consumption by Device
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={[
                      { name: "Lights", value: 30 },
                      { name: "HVAC", value: 45 },
                      { name: "Appliances", value: 25 },
                    ]}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
              <motion.div
                className="bg-gray-800 p-6 rounded-lg col-span-1 md:col-span-2"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Energy Saving Tips
                </h2>
                <ul className="list-disc  pl-5">
                  <li>Turn off lights when not in use</li>
                  <li>Use energy-efficient LED bulbs</li>
                  <li>Adjust thermostat settings for optimal efficiency</li>
                  <li>
                    Unplug devices when not in use to avoid phantom energy
                    consumption
                  </li>
                </ul>
              </motion.div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">Security Camera</h2>
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  {isCameraOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12" />
                  )}
                </div>
                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                  <button
                    className={`${
                      isCameraOn ? "bg-red-500" : "bg-blue-500"
                    } text-white px-4 py-2 rounded w-full sm:w-auto`}
                    onClick={toggleCamera}
                  >
                    {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                    onClick={handleTalk}
                  >
                    <Mic className="inline-block mr-2" />
                    Talk
                  </button>
                </div>
              </motion.div>
              <motion.div
                className="bg-gray-800 p-6 rounded-lg"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">Front Door</h2>
                <div className="flex items-center justify-between">
                  <span>Door Status</span>
                  <motion.button
                    className={`flex items-center justify-center w-16 h-16 rounded-full ${
                      isLocked ? "bg-green-500" : "bg-red-500"
                    }`}
                    onClick={toggleLock}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isLocked ? (
                      <Lock className="w-8 h-8" />
                    ) : (
                      <DoorOpen className="w-8 h-8" />
                    )}
                  </motion.button>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Access Log</h3>
                  <ul className="space-y-2">
                    {accessLog.map((log, index) => (
                      <li key={index}>{log}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <motion.div
                className="bg-gray-800 p-6 rounded-lg col-span-1 md:col-span-2"
                variants={fadeInVariants}
              >
                <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
                <div className="space-y-2">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={index}
                      className="bg-red-500 text-white p-2 rounded-lg flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <span>{notification}</span>
                    </motion.div>
                  ))}
                  {notifications.length === 0 && <p>No recent alerts</p>}
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === "environment" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {environmentalData.map((roomData, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg"
                  variants={fadeInVariants}
                >
                  <h2 className="text-xl font-semibold mb-4">
                    {roomData.name}
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Temperature
                      </h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={roomData.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#ff7300"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Humidity</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={roomData.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="humidity"
                            stroke="#82ca9d"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Air Quality
                      </h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={roomData.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="airQuality"
                            stroke="#8884d8"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setNotifications([])}
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </motion.div>
    </div>
  );
}
