import React, { useEffect, useState } from "react";
import List from "./List";
import { createPost, fetchPosts } from "./Communication";

const Notes = (props: any) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  // Initialize empty notes list
  var initialNotes: Array<{ _id: string; uid: string; note: string }> = [];
  const [notesList, setNotesList] = useState(initialNotes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPosts(props.value);
        setNotesList((notes) => [...notes, ...postData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.value]);

  const addItemToList = () => {
    const newItem = {
      _id: notesList.length + 1 + "",
      uid: props.value,
      note: inputValue,
    };
    createPost(newItem);
    setNotesList([...notesList, newItem]);
  };

  const fetchDataFromServer = async () => {
    const icon = document.getElementById("flash-icon");
    if (icon) {
      icon.style.transition = "transform 0.5s ease-in-out";
      icon.style.transform = "rotate(360deg)";
      setTimeout(() => {
        icon.style.transition = "";
        icon.style.transform = "";
      }, 500);
    }
    try {
      const postData = await fetchPosts(props.value);
      setNotesList(postData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {/* New Lock Section at top center */}
      <div className="lock-top text-center mb-3">
        <img
          src="/src/assets/lock.svg"
          alt="Lock"
          width="40"
          height="30"
          className="d-inline-block align-text-top"
        />
        <p style={{ fontWeight: "light", fontSize: "smaller", color: "grey" }}>
          Lock the Note!
        </p>
      </div>

      {/* Existing Header Section (unchanged) */}
      <div className="top-centered-div4">
        Your
        <img
          src="/src/assets/flash.svg"
          id="flash-icon"
          alt="Logo"
          width="40"
          height="30"
          className="d-inline-block align-text-top"
          onClick={fetchDataFromServer}
        ></img>
        Id is <p className="flashid-p">{props.value}</p>
        <p style={{ fontWeight: "light", fontSize: "smaller", color: "grey" }}>
          To refresh, click the flash icon!
        </p>
      </div>

      {/* Notes Input Section */}
      <div className="mb-3 top-centered-div3">
        <div className="input-group">
          <textarea
            className="form-control fixed-size-textarea"
            aria-label="With textarea"
            style={{ marginBottom: "5px", marginLeft: "5px" }}
            value={inputValue}
            onChange={handleChange}
          ></textarea>
          <button
            className="btn btn-outline-success"
            type="button"
            id="button-addon2"
            style={{
              borderColor: "Green",
              marginBottom: "5px",
              marginRight: "5px",
            }}
            onClick={addItemToList}
          >
            Add
          </button>
        </div>
        <List value={notesList}></List>
      </div>
    </div>
  );
};

export default Notes;
