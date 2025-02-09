// Function to validate if a scrambled word exists
function validateWord() {
  const scrambledWord = document.getElementById("scrambled-word").value.trim();

  // Validate input
  if (!scrambledWord) {
    document.getElementById("result").innerHTML = "Please enter a scrambled word!";
    return;
  }

  // Call Datamuse API to check if the word exists
  const apiUrl = `https://api.datamuse.com/words?sp=${scrambledWord}`;

  fetch(apiUrl)
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
      if (data.length > 0) {
        // If the word is valid, show success message
        document.getElementById("result").innerHTML = `"${scrambledWord}" is a valid word!`;
        getMeaning(scrambledWord);  // Optionally, get and display meaning
      } else {
        // If the word is invalid
        document.getElementById("result").innerHTML = `"${scrambledWord}" is NOT a valid word.`;
        document.getElementById("meaning").innerHTML = ""; // Clear any meaning
      }
    })
    .catch(error => {
      console.error("Error with API request:", error);
      document.getElementById("result").innerHTML = "There was an error checking the word.";
    });
}

// Function to get word meaning (for example purposes)
function getMeaning(word) {
  document.getElementById("meaning").innerHTML = `Meaning of "${word}": A valid English word!`;
}
