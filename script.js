// Function to validate if a scrambled word exists
async function validateWord() {
  const scrambledWord = document.getElementById("scrambled-word").value.trim();

  // Validate input (ensure it's not empty)
  if (!scrambledWord) {
    document.getElementById("result").innerHTML = "Please enter a scrambled word!";
    return;
  }

  // Fetch the words list from GitHub
  const wordsListUrl = "https://raw.githubusercontent.com/aaru1804/word-scrambler/main/words.txt";
  
  try {
    const response = await fetch(wordsListUrl);
    const wordsList = await response.text();
    const wordsArray = wordsList.split("\n").map(word => word.trim().toLowerCase());

    console.log("Words List:", wordsArray); // Debugging log

    if (wordsArray.includes(scrambledWord.toLowerCase())) {
      // If the word is valid
      document.getElementById("result").innerHTML = `"${scrambledWord}" is a valid word!`;
      getMeaning(scrambledWord);  // Optionally, get and display meaning
    } else {
      // If the word is invalid, try permutations
      await findCorrectWord(scrambledWord, wordsArray);
    }
  } catch (error) {
    console.error("Error fetching words list:", error);
    document.getElementById("result").innerHTML = "There was an error checking the word.";
  }
}

// Function to find the correct word by generating permutations
async function findCorrectWord(scrambledWord, wordsArray) {
  const permutations = getPermutations(scrambledWord.toLowerCase());
  let foundWord = null;

  // Loop through all permutations to check if any is a valid word
  for (let i = 0; i < permutations.length; i++) {
    const word = permutations[i];
    
    if (wordsArray.includes(word)) {
      foundWord = word; // A valid word has been found
      document.getElementById("result").innerHTML = `"${scrambledWord}" was unscrambled to "${foundWord}"!`;
      getMeaning(foundWord);  // Optionally, get and display meaning
      return;
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
