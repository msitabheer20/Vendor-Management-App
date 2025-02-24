import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import './layout.css'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div style={{ display: "flex" }}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} fn={ toggleSidebar }  />
      <main className={`main-content ${isOpen ? "shifted" : ""}`} style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;