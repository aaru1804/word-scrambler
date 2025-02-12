<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Scrambler</title>
    <!-- Optional: Add a favicon -->
    <!-- Make sure to place a favicon in the correct directory or remove this line if you don't need a favicon -->
    <link rel="icon" href="path/to/favicon.ico" />
</head>
<body>

    <h1>Word Scrambler Game</h1>
    
    <!-- Button to trigger word validation -->
    <button onclick="validateWord()">Validate Word</button>

    <p id="scrambledWord">Scrambled Word: </p>
    <p id="uncrambledWord">Uncrambled Word: </p>

    <script type="module">
        // Function to fetch words from GitHub
        async function fetchWordsFromGithub(url) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const text = await response.text();
                    return text.splitlines();
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

        // Function to find the uncrambled word by matching sorted characters
        function findUncrambledWord(scrambledWord, wordList) {
            return wordList.find(word => word.split('').sort().join('') === scrambledWord.split('').sort().join(''));
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
            window.originalWord = originalWord;
        }

        // Function to validate the word when the button is clicked
        function validateWord() {
            const inputWord = prompt("Enter the uncrambled word:");

            // Check if the input matches the original word
            if (inputWord === window.originalWord) {
                document.getElementById('uncrambledWord').innerText = `Uncrambled Word: ${inputWord} (Correct!)`;
            } else {
                document.getElementById('uncrambledWord').innerText = `Uncrambled Word: ${inputWord} (Incorrect)`;
            }
        }

        // Load the game when the page loads
        window.onload = main;
    </script>

</body>
</html>
