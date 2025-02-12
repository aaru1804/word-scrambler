// Function to validate if a scrambled word exists
async function validateWord() {
  const scrambledWord = document.getElementById("scrambled-word").value.trim();

  // Validate input (ensure it's not empty)
  if (!scrambledWord) {
    document.getElementById("result").innerHTML = "Please enter a scrambled word!";
    return;
  }

  // Get words from the GitHub repository's raw words.txt
  const wordsUrl = "https://raw.githubusercontent.com/aaru1804/word-scrambler/main/words.txt";
  
  try {
    // Fetch the word list from GitHub
    const response = await fetch(wordsUrl);
    const data = await response.text(); // Get text content of words.txt
    
    // Split the file content into an array of words
    const wordList = data.split('\n').map(word => word.trim().toLowerCase());
    
    console.log("Word List Loaded:", wordList);

    // Check if the scrambled word exists in the word list
    if (wordList.includes(scrambledWord.toLowerCase())) {
      document.getElementById("result").innerHTML = `"${scrambledWord}" is a valid word!`;
    } else {
      // If not found in the word list, show an error
      document.getElementById("result").innerHTML = `"${scrambledWord}" is not a valid word.`;
    }

  } catch (error) {
    console.error("Error fetching word list:", error);
    document.getElementById("result").innerHTML = "There was an error checking the word.";
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
