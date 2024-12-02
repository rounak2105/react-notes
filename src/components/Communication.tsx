import React, { useEffect, useState } from "react";

export async function fetchPosts(id: number) {
  try {
    const response = await fetch(`https://notes-app-flash.onrender.com/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching posts:", err);
    return []; // Handle error gracefully, return empty array or throw error as needed
  }
}

export async function createPost(newPostData: any) {
  try {
    const response = await fetch("https://notes-app-flash.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(newPostData), // Convert object to JSON string
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Assuming server responds with the created post data
  } catch (err) {
    console.error("Error creating post:", err);
    throw err; // Re-throw error to handle it further up the call stack if needed
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
