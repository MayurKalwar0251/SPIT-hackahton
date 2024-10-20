import React from "react";
import { FloatingNav } from "./Navbar/Navbar";
import SideBar from "./ui/sidebar/Sidebar";
import Footer from "./Hero/Footer";

const Dashboard = ({ children }) => {
  return (
    <div>
      <div className="relative flex    [&::-webkit-scrollbar]:hidden overflow-hidden">
        <SideBar />
        <div className="flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden w-full dark:bg-[#09090b] -z-0">
          <div className="  overflow-y-hidden">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React from "react";
// import { FloatingNav } from "./Navbar/Navbar";
// import SideBar from "./ui/sidebar/Sidebar";

// const Dashboard = ({ children }) => {
//   return (
//     <div>
//       <div className=" w-full ">{children}</div>
//     </div>
//   );
// };

// export default Dashboard;
