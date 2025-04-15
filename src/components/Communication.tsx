import React, { useEffect, useState } from "react";

const BASE_URL = "https://notes-app-flash.onrender.com";

export async function fetchPosts(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return []; // Return empty array on error or re-throw as needed
  }
}

export async function createPost(newPostData: any) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(newPostData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error creating post:", err);
    throw err;
  }
}

/* Additional API calls */

// DELETE note API call
export async function deleteNote(uid: string) {
  try {
    const response = await fetch(BASE_URL + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

// Lock note API call
export async function lockNote(uid: string, password: string) {
  try {
    const response = await fetch(BASE_URL + "/lock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, password }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error locking note:", error);
    throw error;
  }
}

// Unlock note API call
export async function unlockNote(uid: string, password: string) {
  try {
    const response = await fetch(`${BASE_URL}/unlock/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error unlocking note:", error);
    throw error;
  }
}

export default function Communication() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(10).then((data) => {
      console.log(data);
      setPosts(data);
    });
  }, []);

  return <div>{/* Render your component as needed */}</div>;
}
