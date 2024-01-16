// Event handler function for form submission
async function newFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve values from form inputs
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="content"]').value;
  const skillLevel = document.querySelector('select[name="skill-level"]').value;

  // Check if title, content, and skill level are provided
  if (title && content && skillLevel) {
    try {
      // Send a POST request to the server to create a new post
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, content, skillLevel }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is successful
      if (response.ok) {
        // Redirect to the dashboard after successful post creation
        document.location.replace("/dashboard");
      } else {
        // Display an alert with the error status text if the response is not okay
        alert(`Error: ${response.statusText}`);
      }
    } catch (err) {
      // Log and display an alert for unexpected errors during the fetch operation
      console.error("An error occurred:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  } else {
    // Display an alert if either title, content, or skill level is missing
    alert("Please provide title, content, and select a skill level for the new post.");
  }
}

// Attach the event listener to the form's submit event
document.querySelector("#add-post-form").addEventListener("submit", newFormHandler);
