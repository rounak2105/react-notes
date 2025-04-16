import React, { useEffect, useState } from "react";
import List from "./List";
import { createPost, fetchPosts, lockNote, unlockNote, deleteNote } from "./Communication";
import flashLogo from "../assets/flash.svg"
import deleteLogo from "../assets/delete.svg"
import lockLogo from "../assets/lock.svg"


const Notes = (props: any) => {
  const [inputValue, setInputValue] = useState("");
  const [notesList, setNotesList] = useState<
    Array<{ _id: string; uid: string; note: string; locked: boolean }>
  >([]);
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [showInitialUnlockModal, setShowInitialUnlockModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPosts(props.value);
        // Check if the note is locked
        if (postData && postData.length > 0 && postData[0].locked) {
          setShowInitialUnlockModal(true);
        }
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
      locked: lockPassword ? true : false,
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
    }
  };

  // Handle Done button in the initial unlock modal
  const handleInitialUnlockDone = async () => {
    try {
      const result = await unlockNote(props.value, lockPassword);
      if (result) {
        setShowInitialUnlockModal(false);
        setLockPassword(lockPassword);
        setPasswordError("");
        await fetchDataFromServer();
      } else {
        setPasswordError("Incorrect password");
      }
    } catch (error) {
      console.error("Error unlocking note:", error);
      setPasswordError("Incorrect Password :(");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteNote(props.value);
      if (result.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      {/* Lock Section */}
      <div className="lock-top text-center mb-3">
        {notesList.length > 0 && notesList[0].locked ? (
          <span 
            className="badge badge-primary badge-pill" 
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
          >
            <img
              src={deleteLogo}
              alt="Delete"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            <p style={{ fontWeight: "light", fontSize: "smaller", color: "grey", padding: "5px" }}>
              Delete the Note Forever!
            </p>
          </span>
        ) : (
          <div onClick={handleLockClick} style={{ cursor: "pointer" }}>
            <img
              src={lockLogo}
              alt="Lock"
              width="40"
              height="30"
              className="d-inline-block align-text-top"
            />
            <p style={{ fontWeight: "light", fontSize: "smaller", color: "grey" }}>
              Lock the Note!
            </p>
          </div>
        )}
      </div>

      {/* Lock Modal */}
      {showLockModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="d-flex justify-content-end mb-2">
              <button 
                className="btn-close" 
                onClick={() => {
                  setShowLockModal(false);
                  setLockPassword("");
                }}
                aria-label="Close"
              />
            </div>
            <div className="d-flex flex-column align-items-center">
              <div className="modal-icon-wrapper mb-3">
                <img
                  src={lockLogo}
                  alt="Lock"
                  width="24"
                  height="24"
                />
              </div>
              <p className="modal-title">Lock <span className="flashid-p">{props.value}</span></p>
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
                className="btn btn-outline-success w-100 py-2"
                onClick={handleLockDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Initial Unlock Modal */}
      {showInitialUnlockModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="d-flex justify-content-end mb-2">
              <button 
                className="btn-close" 
                onClick={() => {
                  setShowInitialUnlockModal(false);
                  setPasswordError("");
                  window.location.reload(); // This will refresh the page
                }}
                aria-label="Close"
              />
            </div>
            <div className="d-flex flex-column align-items-center">
              <div className="modal-icon-wrapper mb-3">
                <img
                  src={lockLogo}
                  alt="Lock"
                  width="24"
                  height="24"
                />
              </div>
              <p className="modal-title">Unlock <span className="flashid-p">{props.value}</span></p>
            </div>
            <div className="modal-body mt-4">
              <input
                type="password"
                value={lockPassword}
                onChange={(e) => {
                  setLockPassword(e.target.value);
                  setPasswordError("");
                }}
                className={`form-control form-control-lg mb-2 ${passwordError ? 'is-invalid' : ''}`}
                placeholder="Enter your password"
                autoFocus
              />
              {passwordError && (
                <div className="text-danger mb-3 small">
                  {passwordError}
                </div>
              )}
              <button 
                className="btn btn-outline-success w-100 py-2"
                onClick={handleInitialUnlockDone}
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
          src={flashLogo}
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
