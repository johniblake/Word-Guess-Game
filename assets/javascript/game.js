class Game {
  counter;
  guessesLeft;
  words;
  wordArray;
  guessArray;
  lettersGuessed;
  wins;
  losses;
  touched = false;
  stopLetters = ["Meta", "Alt", "Control", "Shift", "Enter", "CapsLock", "Tab"];

  constructor() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("start-container").style.display = "flex";
    this.lettersGuessed = [];
    this.guessesLeft = 10;
    this.counter = 0;
    this.wins = 0;
    this.losses = 0;
    this.words = ["hello", "goodbye", "name", "cool"];
    this.wordArray = this.getRandomWord();
    this.guessArray = this.getGuessArray(this.wordArray);

    //register keydown events
    document.addEventListener("keydown", event => {
      if (!this.touched) {
        this.touched = true;
        this.startGame();
      } else {
        this.guess(event);
      }
    });
  }

  //returns a random word from words as an array of its characters
  getRandomWord = () => {
    let index = Math.floor(Math.random() * this.words.length);
    this.word = this.words[index];
    return this.words[index].split("");
  };

  // returns an empty array of the same length as the wordArray
  getGuessArray = wordArray => {
    let emptyGuesses = [];
    for (let i = 0; i < wordArray.length; i++) {
      emptyGuesses.push(" ");
    }
    return emptyGuesses;
  };

  guess = e => {
    let letter = e.key;

    //check if letter was already guessed
    if (
      this.lettersGuessed.includes(letter) ||
      this.stopLetters.includes(letter)
    ) {
      return;
    }

    //perform guess
    this.guessesLeft -= 1;
    this.lettersGuessed.push(letter);
    this.updateDOM();

    //if correct, insert letter into the proper spots in the guess array
    if (this.wordArray.includes(letter)) {
      for (let i = 0; i < this.wordArray.length; i++) {
        if (this.wordArray[i] === letter) {
          this.guessArray[i] = letter;
        }
      }
      this.updateDOM();
    }

    //win condition
    if (this.areEqual(this.guessArray, this.wordArray)) {
      this.wins += 1;
      this.resetGame();
      console.log("You Win!");
      return;
    }

    //lose condition
    if (this.guessesLeft == 0) {
      this.losses += 1;
      this.resetGame();
      console.log("You Lose!");
      return;
    }
    return;
  };

  //check that all elements of two arrays are equal (i.e. wordArray and guessArray)
  areEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (var i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  //start game
  startGame = () => {
    document.getElementById("game-container").style.display = "flex";
    document.getElementById("start-container").style.display = "none";
    this.updateDOM();
  };

  //reset all values except for wins and losses and re-renders the game board
  resetGame = () => {
    this.guessesLeft = 10;
    this.counter = 0;
    this.wordArray = this.getRandomWord();
    this.guessArray = this.getGuessArray(this.wordArray);
    this.lettersGuessed = [];
    this.updateDOM();
  };

  updateDOM = () => {
    document.getElementById("guess").innerHTML = this.guessArray;
    document.getElementById("wins").innerHTML = this.wins;
    document.getElementById("losses").innerHTML = this.losses;
    document.getElementById("letters").innerHTML = this.lettersGuessed;
    document.getElementById("num-guesses").innerHTML = this.guessesLeft;
  };
}

let game = new Game();
