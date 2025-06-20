import React from "react";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* <Navbar /> */}

      <main className="flex-grow container mx-auto px-4 py-6">{children}</main>

      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
