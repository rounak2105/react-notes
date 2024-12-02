import { useState } from "react";
import Home from "./components/Home";
import { NavBar } from "./components/NavBar";
import Quote from "./components/Quote";
import Notes from "./components/Notes";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [showComponent, setShowComponent] = useState(false);

  const handleSubmit = (value: any) => {
    setInputValue(value);
    setShowComponent(true); // Show component based on input
  };

  const handleNavBarClick = () => {
    console.log("YUESSSS");
    setShowComponent(false);
  };

  return (
    <div>
      <NavBar onBrandClick={handleNavBarClick}></NavBar>
      {!showComponent && <Home onSubmit={handleSubmit}></Home>}
      {showComponent && <Notes value={inputValue}></Notes>}
    </div>
  );
}

export default App;
