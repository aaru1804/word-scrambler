<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Unscrambler</title>
    <style>
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

        /* Loading state styles */
        .loading {
            font-style: italic;
            color: gray;
        }
    </style>
</head>
<body>

    <h1>Word Unscrambler</h1>

    <!-- User Input Section -->
    <label for="scrambledInput">Enter an unsorted word:</label>
    <input type="text" id="scrambledInput" placeholder="Type an unsorted word here" />
    <button id="submitBtn">Find Correct Word</button>

    <!-- Suggested Correct Words -->
    <div class="suggestions">
        <h3>Possible Correct Words:</h3>
        <ul id="suggestionsList"></ul>
    </div>

    <script>
        let wordList = []; // To store the fetched word list

        // Fetch the words list from GitHub
        async function fetchWordList() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/aaru1804/word-scrambler/main/words.txt');
                if (!response.ok) {
                    throw new Error('Failed to fetch the word list');
                }
                const text = await response.text();
                wordList = text.split('\n').map(word => word.trim().toLowerCase());  // Return as an array of words
            } catch (error) {
                console.error("Error fetching word list:", error);
            }
        }

        // Function to find possible correct words based on scrambled input
        async function findCorrectWords() {
            const scrambledWord = document.getElementById('scrambledInput').value.trim().toLowerCase();
            if (scrambledWord === "") return;  // Avoid processing empty input

            // Check if the word list is available, if not, fetch it
            if (wordList.length === 0) {
                await fetchWordList();
            }

            const suggestionsList = document.getElementById('suggestionsList');
            suggestionsList.innerHTML = ''; // Clear previous suggestions

            // Helper function to check if a word can be formed from scrambled letters
            function canFormWord(word, scrambled) {
                const wordChars = word.split('').sort().join('');
                const scrambledChars = scrambled.split('').sort().join('');
                return wordChars === scrambledChars;
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

        // Fetch word list initially
        fetchWordList();
    </script>

</body>
</html>
