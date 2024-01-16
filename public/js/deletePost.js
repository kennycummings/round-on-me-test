// Event handler function for deleting a post
async function deleteFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Extract the postId from the current URL
  const postId = window.location.pathname.split("/").pop();

  try {
    // Send a DELETE request to the server to delete the specified post
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      body: JSON.stringify({ post_id: postId }), // Body includes the post_id
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Redirect to the dashboard after successful post deletion
      document.location.replace("/dashboard/");
    } else {
      // Display an alert with the error status text if the response is not okay
      alert(`Error: ${response.statusText}`);
    }
  } catch (error) {
    // Log and display an alert for unexpected errors during the fetch operation
    console.error("An error occurred:", error);
    alert("An unexpected error occurred. Please try again.");
  }
}

// Attach the event listener to the delete post button's click event
document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);