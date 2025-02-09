async function isValidWord(word) {
    const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=1`);
    const data = await response.json();
    
    return data.length > 0 ? data[0].word : "No valid word found";
}

async function unscramble() {
    let scrambledWord = document.getElementById("scrambledWord").value.toLowerCase();
    let sortedWord = scrambledWord.split("").sort().join(""); // Sort scrambled letters

    let result = await isValidWord(sortedWord);
    document.getElementById("result").innerText = `Unscrambled Word: ${result}`;
}
