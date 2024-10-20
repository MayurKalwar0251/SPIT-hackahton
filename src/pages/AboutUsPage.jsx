import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ChevronRight,
  Star,
  Zap,
  Globe,
  Shield,
  MessageCircle,
  Users,
  Lightbulb,
} from "lucide-react";

function Aboutus() {
  const [activeSection, setActiveSection] = useState("mission");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const sections = [
    { id: "mission", title: "Our Mission", icon: Zap },
    { id: "vision", title: "Our Vision", icon: Globe },
    { id: "reviews", title: "Customer Reviews", icon: Star },
    { id: "ai-assistant", title: "AI Assistant", icon: MessageCircle },
    { id: "team", title: "Our Team", icon: Users },
  ];

  const content = {
    mission:
      "At SmartNexus, our mission is to revolutionize home living through cutting-edge smart home technology. We are committed to creating intuitive, efficient, and secure solutions that enhance the quality of life for our users while promoting energy conservation and environmental responsibility. Our goal is to empower homeowners with the tools they need to create comfortable, safe, and sustainable living spaces. Through continuous innovation and user-centric design, we strive to make smart home technology accessible and beneficial for everyone, regardless of their technical expertise.",
    vision:
      "We envision a future where every home is a smart home, seamlessly integrating technology to create harmonious, efficient, and sustainable living spaces. SmartNexus aims to be at the forefront of this transformation, continually innovating and setting new standards in the smart home industry. We see a world where homes anticipate and adapt to their occupants' needs, where energy waste is minimized, and where technology enhances rather than complicates daily life. Our vision extends beyond individual homes to encompass entire communities, fostering a global network of interconnected, intelligent living spaces that contribute to a more sustainable and comfortable world for all.",
    reviews: [
      {
        name: "Sarah L.",
        rating: 5,
        text: "SmartNexus has completely transformed my home. The intuitive interface and energy-saving features are game-changers! I've seen a significant reduction in my energy bills, and the AI assistant feels like a personal home manager.",
      },
      {
        name: "Michael R.",
        rating: 4,
        text: "Impressive system overall. The security features give me peace of mind, and I love how easily I can monitor my home remotely. The only reason it's not a full five stars is that I'd love to see more customization options for power users.",
      },
      {
        name: "Emily T.",
        rating: 5,
        text: "The AI assistant is incredibly helpful. It's like having a personal home manager! It learns my preferences quickly and makes proactive suggestions that genuinely improve my daily life. Highly recommend SmartNexus to anyone looking to upgrade their home.",
      },
      {
        name: "David K.",
        rating: 5,
        text: "As someone who's not very tech-savvy, I was hesitant about smart home systems. SmartNexus surprised me with its user-friendly interface and helpful customer support. It's made my life so much easier!",
      },
    ],
    "ai-assistant":
      "Our AI Assistant is your personal home optimization expert. It learns from your habits and preferences to suggest energy-saving routines, enhance security measures, and create the perfect ambiance for any occasion. Just ask, and watch your home adapt to your needs! The AI continuously analyzes data from various sensors and devices in your home, providing insights and automations that make your living space more efficient and comfortable. It can predict your needs based on historical data and external factors like weather forecasts, ensuring your home is always one step ahead.",
    team: "Our team at SmartNexus is a diverse group of passionate innovators, engineers, and designers. We're united by our commitment to creating smarter, more sustainable homes for everyone. From AI specialists to UX designers, each team member brings unique expertise to the table, ensuring that SmartNexus remains at the cutting edge of smart home technology.",
  };

  useEffect(() => {
    const suggestions = [
      "Would you like me to optimize your home's energy usage based on your daily routine?",
      "I've noticed unusual activity near your front door. Should I enable enhanced security measures?",
      "The weather forecast suggests rain. Shall I close the windows and adjust the indoor humidity?",
      "Your favorite show is about to start. Would you like me to dim the lights and set the perfect viewing atmosphere?",
      "I've detected a potential water leak in the basement. Should I shut off the main water supply as a precaution?",
      "Your air quality index is dropping. Shall I activate the air purifiers and increase ventilation?",
    ];
    const interval = setInterval(() => {
      setAiSuggestion(
        suggestions[Math.floor(Math.random() * suggestions.length)]
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      // Simulating an API call to fetch team members
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                name: "Alex Johnson",
                role: "CEO & Founder",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Samantha Lee",
                role: "Chief Technology Officer",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Marcus Chen",
                role: "Lead AI Engineer",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Olivia Rodriguez",
                role: "UX Design Lead",
                image: "/placeholder.svg?height=100&width=100",
              },
            ]),
          1000
        )
      );
      setTeamMembers(response);
    };
    fetchTeamMembers();
  }, []);

  const FadeInSection = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <motion.h1
        className="text-5xl font-bold mb-12 text-center sticky top-0 py-4 bg-gray-900 z-10"
        style={{ opacity: headerOpacity }}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        About SmartNexus
      </motion.h1>
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          className="md:col-span-1 space-y-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              className={`w-full text-left p-4 rounded-lg flex items-center justify-between ${
                activeSection === section.id ? "bg-blue-600" : "bg-gray-800"
              }`}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <section.icon className="w-6 h-6 mr-3" />
                {section.title}
              </div>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className="md:col-span-2 bg-gray-800 p-6 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              className="text-2xl font-semibold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {sections.find((s) => s.id === activeSection)?.title}
            </motion.h2>
            {activeSection === "reviews" ? (
              <div className="space-y-4">
                {content.reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="font-semibold mr-2">{review.name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                          >
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {review.text}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            ) : activeSection === "team" ? (
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <motion.h3
                        className="font-semibold"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {member.name}
                      </motion.h3>
                      <motion.p
                        className="text-sm text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {member.role}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {content[activeSection]}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <FadeInSection>
        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">SmartNexus Impact</h2>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              >
                50%
              </motion.div>
              <p>Average Energy Savings</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              >
                10,000+
              </motion.div>
              <p>Homes Smartified</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
              >
                24/7
              </motion.div>
              <p>AI-Powered Support</p>
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <motion.div
          className="mt-12 bg-blue-600 p-6 rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            AI Assistant Suggestion
          </h2>
          <motion.p
            className="text-lg"
            key={aiSuggestion}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {aiSuggestion}
          </motion.p>
        </motion.div>
      </FadeInSection>
      <FadeInSection>
        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl  font-semibold mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Innovation Lab
          </h2>
          <p className="mb-4">
            At SmartNexus, we're always pushing the boundaries of what's
            possible in smart home technology. Our Innovation Lab is where we
            experiment with cutting-edge ideas and technologies to shape the
            future of home living.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Quantum-Secured IoT",
                description:
                  "Exploring quantum encryption to make your smart home unhackable.",
              },
              {
                title: "Neuro-Adaptive Interfaces",
                description:
                  "Developing brain-computer interfaces for effortless smart home control.",
              },
              {
                title: "Holographic Displays",
                description:
                  "Creating 3D holographic interfaces for immersive home management.",
              },
              {
                title: "Eco-Generating Materials",
                description:
                  "Researching materials that generate energy from ambient heat and light.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}

export default Aboutus;
