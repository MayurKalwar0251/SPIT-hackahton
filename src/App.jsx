import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatBot from "./pages/ChatBot";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import Contact from "./pages/ContactPage";
import Aboutus from "./pages/AboutUsPage";
import SmartNexusTransitionLoader from "./Loader";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SmartNexusTransitionLoader />} />
          <Route
            path="/home"
            element={
              <Dashboard>
                <HomePage />
              </Dashboard>
            }
          />
          <Route
            path="/chatbot"
            element={
              <Dashboard>
                <ChatBot />
              </Dashboard>
            }
          />
          <Route
            path="/about-us"
            element={
              <Dashboard>
                <Aboutus />
              </Dashboard>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Dashboard>
                <Contact />
              </Dashboard>
            }
          />
          <Route
            path="/about-us"
            element={
              <Dashboard>
                <div className="text-white">About</div>
              </Dashboard>
            }
          />
          <Route
            path="/analytics"
            element={
              <Dashboard>
                <Analytics />
              </Dashboard>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
