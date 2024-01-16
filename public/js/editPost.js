// Event handler function for editing a post
async function editFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve values from the edit form inputs
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();

  // Extract the postId from the current URL
  const postId = window.location.pathname.split("/").pop();

  // Check if both title and content are provided
  if (title && content) {
    try {
      // Send a PUT request to the server to update the specified post
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful
      if (response.ok) {
        // Redirect to the dashboard after successful post update
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
}

// Attach the event listener to the edit post form's submit event
document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);