import React, { useState } from "react";
import Quote from "./Quote";
import flashLogo from "./assets/flash.svg"

interface InputComponentProps {
  onSubmit: (value: string) => void;
}

const Home: React.FC<InputComponentProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    if (inputValue.length == 0) onSubmit(generateHexadecimal());
    else onSubmit(inputValue);
  };

  function generateHexadecimal() {
    const hexDigits = "0123456789ABCDEF";
    let hexValue = "";

    for (let i = 0; i < 5; i++) {
      hexValue += hexDigits[Math.floor(Math.random() * 16)];
    }
    return hexValue;
  }

  return (
    <div>
      <div className="mb-3 centered-div">
        <blockquote className="blockquote">
          <p>
            Write your Notes in a{" "}
            <img
              src="src/assets/flash.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            ></img>
            !
          </p>
        </blockquote>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="basic-url"
            aria-describedby="basic-addon3 basic-addon4"
            value={inputValue}
            onChange={handleChange}
          ></input>
          <button
            className="btn btn-outline-success"
            type="button"
            id="button-addon2"
            onClick={handleClick}
          >
            Go
          </button>
        </div>
        <div className="form-text" id="basic-addon4">
          <p></p>
          <p>
            Enter your{" "}
            <img
              src="/src/assets/flash.svg"
              alt="Logo"
              width="40"
              height="30"
              className="d-inline-block align-text-top"
            ></img>
            Id and click Go!{" "}
          </p>
          <p style={{ fontWeight: "bold" }}>
            Coming for the first time? Just click Go!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
