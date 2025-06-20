import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Task Manager
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Organize your tasks efficiently
        </p>
      </header>
      <main className="mt-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Get Started
        </button>
      </main>
    </div>
  );
};

export default HomePage;
