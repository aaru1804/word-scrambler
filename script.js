import requests
import random

# Function to fetch words from GitHub
def fetch_words_from_github(url):
    response = requests.get(url)
    if response.status_code == 200:
        # Assuming the file contains one word per line
        words = response.text.splitlines()
        return words
    else:
        print("Failed to fetch the file.")
        return []

# Function to scramble a word
def scramble_word(word):
    word_list = list(word)
    random.shuffle(word_list)
    return ''.join(word_list)

# Function to find the uncrambled word (e.g., by checking if it exists in the word list)
def find_uncrambled_word(scrambled_word, word_list):
    for word in word_list:
        if sorted(scrambled_word) == sorted(word):
            return word
    return None

# Main function to use the code
def main():
    # GitHub URL to the raw words.txt file
    url = 'https://raw.githubusercontent.com/aaru1804/word-scrambler/main/words.txt'

    # Fetch words from GitHub
    words = fetch_words_from_github(url)
    if not words:
        return

    # Select a random word and scramble it
    original_word = random.choice(words)
    scrambled = scramble_word(original_word)
    
    print(f"Scrambled Word: {scrambled}")

    # Try to find the uncrambled word
    uncrambled_word = find_uncrambled_word(scrambled, words)
    
    if uncrambled_word:
        print(f"Uncrambled Word: {uncrambled_word}")
    else:
        print("No matching uncrambled word found.")

if __name__ == '__main__':
    main()
