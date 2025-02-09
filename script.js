let originalWord = '';

function scrambleWord() {
    const inputWord = document.getElementById('inputWord').value;
    originalWord = inputWord;  // Store the original word
    let scrambled = inputWord.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById('scrambledWord').innerText = scrambled;
}

function unscrambleWord() {
    document.getElementById('scrambledWord').innerText = originalWord;
}
