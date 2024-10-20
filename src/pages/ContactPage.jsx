import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Send,
  Home,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

const FadeInWhenVisible = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      text: "+91 9167969447",
      label: "Call us",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      text: "support@smartnexus.com",
      label: "Email us",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      text: "456 Automation Ave, Andheri",
      label: "Visit us",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Mon-Fri: 9AM-6PM",
      label: "Working hours",
    },
  ];

  const features = [
    "24/7 Smart Home Support",
    "Professional Installation",
    "Remote Troubleshooting",
    "System Updates & Maintenance",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <motion.div
        className="relative h-[300px] bg-gradient-to-b from-blue-600 to-blue-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="text-xl text-center text-gray-200 max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Experience the future of smart home automation. Our experts are here
            to help you create the perfect connected living space.
          </motion.p>
        </div>
      </motion.div>

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
          <FadeInWhenVisible>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl h-fit">
              <div className="flex items-center gap-3 mb-6">
                <Home className="w-8 h-8 text-blue-500" />
                <h2 className="text-3xl font-bold">Contact Us</h2>
              </div>

              {submitStatus === "success" && (
                <motion.div
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <p>Thank you for reaching out! We'll contact you soon.</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1.5 text-sm font-medium"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg 
                               text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-blue-500 transition duration-200"
                      placeholder="Kush Jain"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1.5 text-sm font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg 
                               text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                               focus:ring-blue-500 transition duration-200"
                      placeholder="kush@gmail.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1.5 text-sm font-medium"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 transition duration-200"
                    placeholder="+91 9167969447"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1.5 text-sm font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500 transition duration-200 resize-none"
                    placeholder="Tell us about your smart home needs..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 
                           bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg 
                           transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </FadeInWhenVisible>
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {contactInfo.map((item, idx) => (
                <FadeInWhenVisible key={idx}>
                  <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg h-fit transition-transform duration-300"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(31, 41, 55, 0.8)",
                    }} // Hover effect
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-blue-500">{item.icon}</div>
                      <h3 className="text-lg font-semibold">{item.label}</h3>
                    </div>
                    <p className="text-gray-300">{item.text}</p>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>
            <FadeInWhenVisible>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Why Choose Us</h3>
                <ul className="space-y-2 text-gray-300">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="text-blue-500 w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
