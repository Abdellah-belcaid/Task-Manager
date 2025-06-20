import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import RootLayout from "./layouts/RootLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>      
      <RootLayout>
        <AppRouter />
      </RootLayout>
    </BrowserRouter>
  );
};

export default App;
