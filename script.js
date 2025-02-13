// Fetch the words list from GitHub (Updated to use words_lowercase.txt)
async function fetchWordList() {
    try {
        const response = await fetch('https://aaru1804.github.io/word-scrambler/words_lowercase.txt');
        if (!response.ok) {
            throw new Error('Failed to fetch word list');
        }
        const text = await response.text();
        return text.split('\n').map(word => word.trim().toLowerCase()); // Convert into an array of words
    } catch (error) {
        console.error('Error fetching words list:', error);
        return [];
    }
}

// Function to find valid words that contain all letters of scrambled input
async function findCorrectWords() {
    const scrambledWord = document.getElementById('scrambledInput').value.trim().toLowerCase();
    if (scrambledWord === "") return; // Avoid processing empty input

    const wordList = await fetchWordList();
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    // Function to sort letters of a word (to check for anagrams)
    function sortLetters(word) {
        return word.split('').sort().join('');
    }

    const sortedScrambled = sortLetters(scrambledWord);

    // Filter word list for valid words (same sorted letters)
    const possibleWords = wordList.filter(word => sortLetters(word) === sortedScrambled);

    // Display suggestions
    if (possibleWords.length > 0) {
        possibleWords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            suggestionsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = "No valid words found.";
        suggestionsList.appendChild(li);
    }

    // Clear the input field for new entries
    document.getElementById('scrambledInput').value = '';
}

// Submit button listener
document.getElementById('submitBtn').addEventListener('click', findCorrectWords);
