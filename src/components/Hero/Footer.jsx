import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ArrowUpRight,
  MapPin,
  Send,
  Star,
} from "lucide-react";
import Magnetic from "./Magnetic";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedLink = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="group relative flex items-center gap-2 w-fit text-gray-400 hover:text-white transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{children}</span>
      <ArrowUpRight
        className={`w-4 h-4 transition-all duration-300 transform
          ${
            isHovered ? "translate-x-1 -translate-y-1 opacity-100" : "opacity-0"
          }`}
      />
    </a>
  );
};

const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    className="group relative p-2 rounded-full border border-gray-700 hover:border-blue-500 transition-colors duration-300"
  >
    <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
    <div className="absolute inset-0 rounded-full bg-blue-500/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
  </a>
);

const NewsletterInput = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative max-w-sm">
      <input
        type="email"
        placeholder="Enter your email"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2">
        <Send
          className={`w-5 h-5 transition-all duration-300 ${
            focused ? "text-blue-500 translate-x-1" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <motion.div
    initial={{ rotateY: 90, opacity: 0 }}
    animate={{ rotateY: 0, opacity: 1 }}
    exit={{ rotateY: -90, opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold text-white">{review.company}</h3>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < review.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
    <p className="text-gray-300">{review.comment}</p>
  </motion.div>
);

const AnimatedReviews = () => {
  const reviews = [
    {
      company: "SmartHome Inc.",
      rating: 5,
      comment: "The automation system has changed my life!",
    },
    {
      company: "HomeTech Solutions",
      rating: 4,
      comment: "Great integration with existing devices.",
    },
    {
      company: "GadgetSmart",
      rating: 5,
      comment: "Outstanding customer support and functionality!",
    },
    {
      company: "TechNest",
      rating: 4,
      comment: "Easy to set up and use. Highly recommend!",
    },
    {
      company: "HomeEase",
      rating: 5,
      comment: "A seamless experience! Everything works perfectly together.",
    },
    {
      company: "SmartLiving",
      rating: 3,
      comment: "The energy savings are incredible! Highly satisfied!",
    },
    {
      company: "NextGen Homes",
      rating: 4,
      comment: "Great features, but I wish the app was more intuitive.",
    },
    {
      company: "EcoSmart",
      rating: 5,
      comment: "Environmentally friendly solutions that truly work!",
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-12 flex justify-center">
      <AnimatePresence mode="wait">
        <ReviewCard key={currentReview} review={reviews[currentReview]} />
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#20222F] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-gradient" />

      <div className="max-w-7xl mx-auto relative flex-grow w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Smart Home Solutions</h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for innovative home automation solutions.
            </p>
            <div className="flex space-x-4 sm:space-x-8">
              <Magnetic>
                <div className="">
                  <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </Magnetic>
              <Magnetic>
                <div className="">
                  <Twitter className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </Magnetic>
              <Magnetic>
                <div className="">
                  <Facebook className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </Magnetic>
              <Magnetic>
                <div className="">
                  <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </Magnetic>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <AnimatedLink href="#">Our Products</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/about-us">About Us</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">Blog & News</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/contact">Contact</AnimatedLink>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <AnimatedLink href="/support">Support Center</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="/faq">FAQs</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">Warranty Information</AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#">Track Your Order</AnimatedLink>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <NewsletterInput />
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                <AnimatedLink href="#">info@smartnexus.com</AnimatedLink>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                <AnimatedLink href="#">+91 9167969447</AnimatedLink>
              </div>
              <div className="flex items-center space-x-3 group">
                <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                <AnimatedLink href="#">
                  456 Automation Ave, Andheri, Mumbai
                </AnimatedLink>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-16">
          <AnimatedReviews />
          <AnimatedReviews />
          <AnimatedReviews />
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-8">
        <p className="text-center text-gray-500">
          &copy; {currentYear} Smart Home Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
