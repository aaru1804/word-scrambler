// Function to validate if a scrambled word exists
async function validateWord() {
  const scrambledWord = document.getElementById("scrambled-word").value.trim();

  // Validate input (ensure it's not empty)
  if (!scrambledWord) {
    document.getElementById("result").innerHTML = "Please enter a scrambled word!";
    return;
  }

  // Use a CORS proxy to avoid CORS issues
  const corsProxy = "https://api.allorigins.win/get?url=";
  const apiUrl = `https://api.datamuse.com/words?sp=${scrambledWord}`;
  const proxiedUrl = `${corsProxy}${encodeURIComponent(apiUrl)}`;

  console.log("API URL (Proxied):", proxiedUrl);  // Debugging log

  try {
    // Make the fetch request
    const response = await fetch(proxiedUrl);
    
    // Parse the JSON response
    const data = await response.json();
    console.log("API Response:", data);

    // Check if 'contents' exist and parse the response
    const words = JSON.parse(data.contents);  // Parse the 'contents' field from the response
    console.log("Valid words found:", words);

    if (words && words.length > 0) {
      // If the word is valid, show a success message
      document.getElementById("result").innerHTML = `"${scrambledWord}" is a valid word!`;
      getMeaning(scrambledWord);  // Optionally, get and display meaning
    } else {
      // If the word is invalid, try permutations
      await findCorrectWord(scrambledWord);
    }
  } catch (error) {
    console.error("Error with API request:", error);
    document.getElementById("result").innerHTML = "There was an error checking the word.";
  }
}

// Function to find the correct word by generating permutations
async function findCorrectWord(scrambledWord) {
  const permutations = getPermutations(scrambledWord);
  let foundWord = null;

  // Loop through all permutations to check if any is a valid word
  for (let i = 0; i < permutations.length; i++) {
    const word = permutations[i];
    const apiUrl = `https://api.datamuse.com/words?sp=${word}`;
    const proxiedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

    console.log("Checking permutation:", word);  // Debugging log

    try {
      const response = await fetch(proxiedUrl);
      const data = await response.json();

      // Log API response for debugging
      console.log("API Response for permutation:", data);

      // Parse the contents and check if a valid word is found
      const words = JSON.parse(data.contents);
      if (words && words.length > 0) {
        foundWord = word; // A valid word has been found
        document.getElementById("result").innerHTML = `"${scrambledWord}" was unscrambled to "${foundWord}"!`;
        getMeaning(foundWord);  // Optionally, get and display meaning
        return;
      }
    } catch (error) {
      console.error("Error with API request for permutation:", error);
    }
  }

  // If no valid word was found
  if (!foundWord) {
    document.getElementById("result").innerHTML = `"${scrambledWord}" does not form a valid word.`;
    document.getElementById("meaning").innerHTML = "";
  }
}

// Function to generate all permutations of a string (optimized version)
function getPermutations(str) {
  let results = [];
  if (str.length === 1) {
    results.push(str);
  } else {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const remainingChars = str.slice(0, i) + str.slice(i + 1);
      const subPermutations = getPermutations(remainingChars);
      for (let j = 0; j < subPermutations.length; j++) {
        results.push(char + subPermutations[j]);
      }
    }
  }

  // Limit the number of permutations if necessary (optional)
  return results.slice(0, 100); // Limit to first 100 permutations for efficiency
}

// Function to get word meaning from an API (define this function)
async function getMeaning(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data[0] && data[0].meanings) {
      const meaning = data[0].meanings[0].definitions[0].definition;
      document.getElementById("meaning").innerHTML = `Meaning of "${word}": ${meaning}`;
    } else {
      document.getElementById("meaning").innerHTML = `No meaning found for "${word}".`;
    }
  } catch (error) {
    console.error("Error fetching word meaning:", error);
    document.getElementById("meaning").innerHTML = `Unable to fetch meaning for "${word}".`;
  }
}
