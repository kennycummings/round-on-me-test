// Event handler function for handling login form submission
async function loginFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve values from the login form inputs
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Check if both username and password are provided
  if (username && password) {
    try {
      // Send a POST request to the server to log in the member
      const response = await fetch("/api/members/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // Check if the response is successful
      if (response.ok) {
        // Redirect to the dashboard after successful login
        document.location.replace("/dashboard");
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

// Attach the event listener to the login form's submit event
document.querySelector("#login-form").addEventListener("submit", loginFormHandler);