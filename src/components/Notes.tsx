import React, { useEffect, useState } from "react";
import List from "./List";
import { createPost, fetchPosts, lockNote, unlockNote } from "./Communication";

const Notes = (props: any) => {
  const [inputValue, setInputValue] = useState("");
  const [notesList, setNotesList] = useState<
    Array<{ _id: string; uid: string; note: string }>
  >([]);
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockPassword, setLockPassword] = useState("");

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

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
      let postData = null;
      if((lockPassword == null) || (lockPassword == "")) {
        postData = await fetchPosts(props.value); 
      } else {
        postData = await unlockNote(props.value, lockPassword);
      }
      setNotesList(postData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // When Lock section is clicked, show the modal
  const handleLockClick = () => {
    setShowLockModal(true);
  };

  // Handle Done button in the modal
  const handleLockDone = async () => {
    try {
      const result = await lockNote(props.value, lockPassword);
      console.log("Lock API result:", result);
      if (result.success) {
        setShowLockModal(false);
        setLockPassword(lockPassword);
        await fetchDataFromServer();
      } else {
        alert("Failed to lock note");
      }
    } catch (error) {
      console.error("Error locking note:", error);
      alert("Error occurred while locking note");
    }
  };

  return (
    <div>
      {/* Lock Section */}
      <div className="lock-top text-center mb-3" onClick={handleLockClick} style={{ cursor: "pointer" }}>
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

      {/* Modal for entering password */}
      {showLockModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="d-flex flex-column align-items-center">
              <div className="modal-icon-wrapper mb-3">
                <img
                  src="/src/assets/lock.svg"
                  alt="Lock"
                  width="24"
                  height="24"
                />
              </div>
              <h5 className="modal-title">Lock <p className="flashid-p">{props.value}</p></h5>
            </div>
            <div className="modal-body mt-4">
              <input
                type="password"
                value={lockPassword}
                onChange={(e) => setLockPassword(e.target.value)}
                className="form-control form-control-lg mb-4"
                placeholder="Enter your password"
                autoFocus
              />
              <button 
                className="btn btn-success w-100 py-2"
                onClick={handleLockDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Header Section */}
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
        />
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
