document.getElementById('generateForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const userPrompt = document.getElementById('userPrompt').value;

  // Show the loader
  document.getElementById('loader').style.display = 'block';

  // Create a new div for the request and response
  const historyContainer = document.getElementById('historyContainer');
  const requestResponseDiv = document.createElement('div');
  requestResponseDiv.classList.add('request-response');

  // Add request info
  const requestDiv = document.createElement('div');
  requestDiv.classList.add('request');
  requestDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="black">
    <path d="M4.80823 9.44118L6.77353 7.46899C8.18956 6.04799 8.74462 5.28357 9.51139 5.55381C10.4675 5.89077 10.1528 8.01692 10.1528 8.73471C11.6393 8.73471 13.1848 8.60259 14.6502 8.87787C19.4874 9.78664 21 13.7153 21 18C19.6309 17.0302 18.2632 15.997 16.6177 15.5476C14.5636 14.9865 12.2696 15.2542 10.1528 15.2542C10.1528 15.972 10.4675 18.0982 9.51139 18.4351C8.64251 18.7413 8.18956 17.9409 6.77353 16.5199L4.80823 14.5477C3.60275 13.338 3 12.7332 3 11.9945C3 11.2558 3.60275 10.6509 4.80823 9.44118Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg><p>${userPrompt}</p>`;
  requestResponseDiv.appendChild(requestDiv);

  // Append the new div to the history container immediately
  historyContainer.appendChild(requestResponseDiv);

  try {
      const response = await fetch('http://localhost:8082/generate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: userPrompt })
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} ${errorText}`);
      }

      const data = await response.json();

      // Filter out stars from the response text
      const filteredText = data.text.replace(/\*/g, "");

      // Add response info
      const responseDiv = document.createElement('div');
      responseDiv.classList.add('response');
      responseDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="black">
    <path d="M19.1918 9.44118L17.2265 7.46899C15.8104 6.04799 15.2554 5.28357 14.4886 5.55381C13.5325 5.89077 13.8472 8.01692 13.8472 8.73471C12.3607 8.73471 10.8152 8.60259 9.34985 8.87787C4.51259 9.78664 3 13.7153 3 18C4.3691 17.0302 5.73683 15.997 7.38233 15.5476C9.43637 14.9865 11.7304 15.2542 13.8472 15.2542C13.8472 15.972 13.5325 18.0982 14.4886 18.4351C15.3575 18.7413 15.8104 17.9409 17.2265 16.5199L19.1918 14.5477C20.3973 13.338 21 12.7332 21 11.9945C21 11.2558 20.3973 10.6509 19.1918 9.44118Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg><p>${filteredText}</p>`;
      requestResponseDiv.appendChild(responseDiv);

      // Ensure focus on the latest response
      responseDiv.scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
      // Add error info
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('response');
      errorDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="black">
    <path d="M19.1918 9.44118L17.2265 7.46899C15.8104 6.04799 15.2554 5.28357 14.4886 5.55381C13.5325 5.89077 13.8472 8.01692 13.8472 8.73471C12.3607 8.73471 10.8152 8.60259 9.34985 8.87787C4.51259 9.78664 3 13.7153 3 18C4.3691 17.0302 5.73683 15.997 7.38233 15.5476C9.43637 14.9865 11.7304 15.2542 13.8472 15.2542C13.8472 15.972 13.5325 18.0982 14.4886 18.4351C15.3575 18.7413 15.8104 17.9409 17.2265 16.5199L19.1918 14.5477C20.3973 13.338 21 12.7332 21 11.9945C21 11.2558 20.3973 10.6509 19.1918 9.44118Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg><p>${error.message}</p>`;
      requestResponseDiv.appendChild(errorDiv);

      // Ensure focus on the error
      errorDiv.scrollIntoView({ behavior: 'smooth' });
  } finally {
      // Hide the loader
      document.getElementById('loader').style.display = 'none';
  }
});