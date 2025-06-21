import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-100 via-white to-blue-50">
      <header className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-md">
          Welcome to Task Manager
        </h1>
        <p className="text-xl text-gray-700 mt-4">
          Organize your tasks efficiently and effortlessly
        </p>
      </header>
      <main className="mt-12">
        <button className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
          Get Started
        </button>
      </main>
    </div>
  );
};

export default HomePage;
