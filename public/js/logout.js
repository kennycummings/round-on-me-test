// Asynchronous function for handling member logout
async function logout(event) {
  try {
    event.preventDefault()
    // Send a POST request to the server to log out the member
    const response = await fetch("/api/members/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // Check if the response is successful
    if (response.ok) {
      // Redirect to the home page after successful logout
      document.location.replace("/");
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

// Attach the event listener to the logout button's click event
document.querySelector("#logout").addEventListener("click", logout);