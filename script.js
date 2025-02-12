<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Unscrambler</title>
    <style>
        /* Add your styles here */
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .suggestions {
            margin-top: 20px;
        }

        .suggestions ul {
            list-style-type: none;
            padding: 0;
        }

        .suggestions li {
            color: blue;
        }
    </style>
</head>
<body>

    <h1>Word Unscrambler</h1>

    <!-- User Input Section -->
    <label for="scrambledInput">Enter a scrambled word:</label>
    <input type="text" id="scrambledInput" placeholder="Type a scrambled word here" />
    <button id="submitBtn">Find Correct Word</button>

    <!-- Suggested Correct Words -->
    <div class="suggestions">
        <h3>Possible Correct Words:</h3>
        <ul id="suggestionsList"></ul>
    </div>

    <script>
        // Fetch the words list from GitHub
        async function fetchWordList() {
            const response = await fetch('https://raw.githubusercontent.com/aaru1804/word-scrambler/main/words.txt');
            const text = await response.text();
            return text.split('\n').map(word => word.trim().toLowerCase());  // Return as an array of words
        }

        // Function to find possible correct words based on scrambled input
        async function findCorrectWords() {
            const scrambledWord = document.getElementById('scrambledInput').value.trim().toLowerCase();
            if (scrambledWord === "") return;  // Avoid processing empty input

            const wordList = await fetchWordList();
            const suggestionsList = document.getElementById('suggestionsList');
            suggestionsList.innerHTML = ''; // Clear previous suggestions

            // Helper function to check if a word can be formed from scrambled letters
            function canFormWord(word, scrambled) {
                const wordChars = word.split('');
                const scrambledChars = scrambled.split('');
                return wordChars.every(char => {
                    const index = scrambledChars.indexOf(char);
                    if (index === -1) return false;
                    scrambledChars.splice(index, 1); // Remove used character
                    return true;
                });
            }

            // Loop through word list and suggest possible correct words
            const possibleWords = wordList.filter(word => canFormWord(word, scrambledWord));

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
    </script>

</body>
</html>
