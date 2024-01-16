// Event handler function for comment form submission
async function commentFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve comment text from the form input
  const comment_text = document.querySelector('input[name="comment-body"]').value.trim();

  // Extract the post_id from the current URL
  const post_id = window.location.pathname.split("/").pop();

  // Check if comment_text is provided
  if (comment_text) {
    try {
      // Send a POST request to the server to create a new comment
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ post_id, comment_text }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful
      if (response.ok) {
        // Reload the page after successful comment submission
        document.location.reload();
      } else {
        // Display an alert with the error status text if the response is not okay
        alert(`Error: ${response.statusText}`);
        // Show the comment form again in case of an error
        document.querySelector("#comment-form").style.display = "block";
      }
    } catch (err) {
      // Log and display an alert for unexpected errors during the fetch operation
      console.error("An error occurred:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  } else {
    // Display an alert if comment_text is missing
    alert("Please provide a comment before submitting.");
  }
}

// Attach the event listener to the comment form's submit event
document.querySelector("#comment-form").addEventListener("submit", commentFormHandler);