const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let guess = 0;
// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  //create list of HTML element objects
  const correctLetter = document.querySelectorAll(`div.${letter}`)
  //loop through list to catch duplicate correct letters
  for (const letterx of correctLetter) {
    letterx.innerHTML = letter;
  }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  if (numWrong === 5) {
    const ourButtons = document.querySelectorAll('button');
    for (const button of ourButtons) {
      button.disabled = true;
    }
    document.querySelector('#play-again').style.display = '';
  } else {
    numWrong += 1;
    document.querySelector('img').setAttribute('src', `/static/images/guess${numWrong}.png`);
    console.log(numWrong)
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';
  const uniqueCount = new Set(word).size

  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', () => {
      const letter = button.innerHTML;

      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
        guess += 1
        console.log(guess)

        if (guess == uniqueCount) {
          alert('You won! :)');
          document.querySelector('#win').style.display = ''
          }

      } else {
        handleWrongGuess(letter);
      }
  });
  
  
  }
 
  // add an event handler to handle clicking on the Play Again button
  document.querySelector('#play-again').addEventListener('click', () => resetGame());
  document.querySelector('#win').addEventListener('click', () => resetGame());
})();
