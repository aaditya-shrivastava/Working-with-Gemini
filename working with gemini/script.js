document.getElementById("generateForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const userPrompt = document.getElementById("userPrompt").value;
    // Show the loader
    document.getElementById("loader").style.display = "block";
    // Create a new div for the request and response
    const historyContainer = document.getElementById("historyContainer");
    const requestResponseDiv = document.createElement("div");
    requestResponseDiv.classList.add("request-response");
    // Add request info
    const requestDiv = document.createElement("div");
    requestDiv.classList.add("request");
    requestDiv.innerHTML = `<strong>Request:</strong><p>${userPrompt}</p>`;
    requestResponseDiv.appendChild(requestDiv);
    try {
      const response = await fetch("http://localhost:8082/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${errorText}`
        );
      }
      const data = await response.json();
      // Filter out stars from the response text
      const filteredText = data.text.replace(/\*/g, "");
      // Add response info
      const responseDiv = document.createElement("div");
      responseDiv.classList.add("response");
      responseDiv.innerHTML = `<strong>Response:</strong><p>${filteredText}</p>`;
      requestResponseDiv.appendChild(responseDiv);
    } catch (error) {
      // Add error info
      const errorDiv = document.createElement("div");
      errorDiv.classList.add("response");
      errorDiv.innerHTML = `<strong>Error:</strong><p>${error.message}</p>`;
      requestResponseDiv.appendChild(errorDiv);
    } finally {
      // Hide the loader
      document.getElementById("loader").style.display = "none";
      // Append the new div to the history container
      historyContainer.appendChild(requestResponseDiv);
      // Scroll to the bottom
      historyContainer.scrollTop = historyContainer.scrollHeight;
    }
  });