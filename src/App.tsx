import { useState } from "react";
import Home from "./components/Home";
import { NavBar } from "./components/NavBar";
import Notes from "./components/Notes";
import AboutUs from "./components/AboutUs";
import Help from "./components/Help";
import Footer from "./components/Footer";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState("home");

  const handleSubmit = (value: any) => {
    setInputValue(value);
    setCurrentPage("notes");
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar onBrandClick={() => handleNavigation("home")} onNavigate={handleNavigation} />
      <div className="flex-grow-1">
        {currentPage === "home" && <Home onSubmit={handleSubmit} />}
        {currentPage === "notes" && <Notes value={inputValue} />}
        {currentPage === "about" && <AboutUs />}
        {currentPage === "help" && <Help />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
