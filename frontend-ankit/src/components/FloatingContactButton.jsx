import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";

const FloatingContactButton = ({isBottomNavVisible}) => {
  const navigate = useNavigate();

  // Adjust the bottom position if the bottom nav bar is visible
  // Assume a prop or context value `isBottomNavVisible` indicates this
  // For demonstration, let's use a prop (you can adapt as needed)
  // Usage: <FloatingContactButton isBottomNavVisible={true} />

  // Add this prop to your component definition:
  // const FloatingContactButton = ({ isBottomNavVisible }) => { ... }

  // Set the bottom offset based on the nav bar visibility
  const bottomOffset = (typeof isBottomNavVisible !== "undefined" && isBottomNavVisible) ? '4.5rem' : '2rem';

  return (
    <div
      onClick={() => navigate("/patient/contact-us")}
      title="Contact Support"
      className="fixed z-50 flex flex-col items-center justify-center transition-all duration-300 
      bg-gradient-to-r from-[#0A4D68] to-[#088395] rounded-full cursor-pointer shadow-lg 
      hover:shadow-2xl hover:scale-105 hover:from-[#088395] hover:to-[#0A4D68]"
      style={{
        bottom: bottomOffset,
        right: '2rem',
        width: '4rem',
        height: '4rem',
      }}
    >
      <FaHeadset className="text-white text-2xl animate-pulse" />
      <span className="text-white text-[10px] font-medium mt-1">
        Support
      </span>
    </div>
  );
};

export default FloatingContactButton;
