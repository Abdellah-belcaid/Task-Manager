import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <main className="flex-1 overflow-y-auto bg-gray-50 text-gray-900">
        <div className="h-full w-full mx-auto px-4 py-4">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
