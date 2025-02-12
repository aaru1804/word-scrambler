// Function to fetch words from GitHub
async function fetchWordsFromGithub(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const text = await response.text();
            return text.split('\n'); // Corrected to split the text by newlines
        } else {
            console.error("Failed to fetch the file.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching the file: ", error);
        return [];
    }
}

// Function to scramble a word
function scrambleWord(word) {
    const wordList = word.split('');
    for (let i = wordList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordList[i], wordList[j]] = [wordList[j], wordList[i]];  // Swap letters
    }
    return wordList.join('');
}

// Function to compare the scrambled input with all words and find a match
function unscramble(input, wordList) {
    const sortedInput = input.split('').sort().join('');
    return wordList.find(word => sortedInput === word.split('').sort().join(''));
}

// Main function to load words, scramble one, and try to validate it
async function main() {
    const url = 'https://raw.githubusercontent.com/aaru1804/word-scrambler/main/words.txt';
    const words = await fetchWordsFromGithub(url);
    if (words.length === 0) return;

    // Select a random word from the list and scramble it
    const originalWord = words[Math.floor(Math.random() * words.length)];
    const scrambled = scrambleWord(originalWord);

    // Display the scrambled word
    document.getElementById('scrambledWord').innerText = `Scrambled Word: ${scrambled}`;

    // Store the original word for later validation
    window.wordList = words; // Store the word list globally
    window.originalWord = originalWord;
}

// Function to validate the word when the button is clicked
function validateWord() {
    const inputWord = document.getElementById('unscrambledInput').value.trim();

    // Check if the input matches the original word by unscrambling
    const correctWord = unscramble(inputWord, window.wordList);

    if (correctWord) {
        document.getElementById('uncrambledWord').innerText = `Uncrambled Word: ${correctWord} (Correct!)`;
    } else {
        document.getElementById('uncrambledWord').innerText = `Uncrambled Word: ${inputWord} (Incorrect)`;
    }

    // Clear the input field after validation
    document.getElementById('unscrambledInput').value = '';
}

// Load the game when the page loads
window.onload = main;
