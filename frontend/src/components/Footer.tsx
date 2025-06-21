import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
