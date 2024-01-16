// Asynchronous function for handling signup form submission
async function signupFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  try {
    // Retrieve values from the signup form inputs
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // Check if both username and password are provided
    if (username && password) {
      // Send a POST request to the server to create a new member
      const response = await fetch("/api/members", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // Check if the response is successful
      if (response.ok) {
        // Log success message and redirect to the dashboard after successful signup
        console.log("Sign-up successful");
        document.location.replace("/dashboard");
      } else {
        // Display an alert with the error status text if the response is not okay
        alert(`Error: ${response.statusText}`);
      }
    } else {
      // Display an alert if either username or password is missing
      alert("Please provide both username and password.");
    }
  } catch (error) {
    // Log and display an alert for unexpected errors during the fetch operation
    console.error("An error occurred:", error);
    alert("An unexpected error occurred. Please try again.");
  }
}

// Attach the event listener to the signup form's submit event
document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);