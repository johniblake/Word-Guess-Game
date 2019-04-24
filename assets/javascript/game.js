class Game {
  counter;
  guessesLeft;
  words;
  wordArray;
  guessArray;
  lettersGuessed;
  wins;
  losses;
  typeable;
  touched = false;
  stopLetters = [
    "meta",
    "alt",
    "control",
    "shift",
    "enter",
    "capsLock",
    "tab",
    "backspace",
    " "
  ];

  constructor() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("start-container").style.display = "flex";
    this.lettersGuessed = [];
    this.guessesLeft = 10;
    this.counter = 0;
    this.wins = 0;
    this.losses = 0;
    this.words = [
      "hello",
      "goodbye",
      "name",
      "cool",
      "cat",
      "green",
      "porpoise",
      "fountain",
      "flounder",
      "platypus",
      "bamboozle",
      "rambunctious",
      "scallywag",
      "rapscallion",
      "druid",
      "fun"
    ];
    this.wordArray = this.getRandomWord();
    this.guessArray = this.getGuessArray(this.wordArray);
    this.typeable = true;

    //register keydown events
    document.addEventListener("keydown", event => {
      if (!this.touched) {
        this.touched = true;
        this.startGame();
      } else {
        //only allow typing when typeable set to true
        if (this.typeable) {
          this.guess(event);
        }
      }
    });
  }

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
    document.getElementById("num-guesses").style.color = "blue";
    this.updateDOM();
  };

  guess = e => {
    let letter = e.key.toLowerCase();

    //filter out characters that were already guessed or not a letter
    if (
      this.lettersGuessed.includes(letter) ||
      !this.isLetter(letter) ||
      this.stopLetters.includes(letter)
    ) {
      return;
    }

    //perform guess
    this.lettersGuessed.push(letter);

    //if correct, insert letter into the proper spots in the guess array
    if (this.wordArray.includes(letter)) {
      for (let i = 0; i < this.wordArray.length; i++) {
        if (this.wordArray[i] === letter) {
          this.guessArray[i] = letter;
        }
      }
    } else {
      this.guessesLeft -= 1;
    }
    //if guesses get too low make their indicator red
    if (this.guessesLeft <= 3) {
      document.getElementById("num-guesses").style.color = "red";
    }

    //show changes
    this.updateDOM();

    //win condition
    if (this.areEqual(this.guessArray, this.wordArray)) {
      this.wins += 1;
      this.displayEndScreen("You Won!");
      this.resetGame();
      return;
    }

    //lose condition
    if (this.guessesLeft == 0) {
      this.losses += 1;
      this.displayEndScreen("You Lost :(");
      this.resetGame();
      return;
    }
    return;
  };

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

  //check that all elements of two arrays are equal (i.e. wordArray and guessArray)
  areEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (var i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  displayEndScreen = message => {
    //don't allow typing when end screen is showing
    this.typeable = false;
    let screenContent =
      "<h1>" +
      message +
      "</h1><div id='end-message'> The word was: <div id='word'>" +
      this.word +
      "</div></div>";

    //display end screen for 2 seconds, then revert back to game screen
    document.getElementById("word-was").innerHTML = screenContent;
    document.getElementById("end-screen").style.display = "flex";
    document.getElementById("game-container").style.display = "none";

    window.setTimeout(() => {
      document.getElementById("end-screen").style.display = "none";
      document.getElementById("game-container").style.display = "flex";
      this.typeable = true;
    }, 2000);
  };

  isLetter = c => {
    return c.toLowerCase() != c.toUpperCase();
  };

  getFormattedOutput = array => {
    let outputString = "";
    for (var item in array) {
      if (array[item] == " ") {
        outputString = outputString + "_";
      } else {
        outputString = outputString + array[item];
      }
      outputString = outputString + "   ";
    }
    return outputString;
  };

  updateDOM = () => {
    document.getElementById("guess").innerHTML = this.getFormattedOutput(
      this.guessArray
    );
    document.getElementById("wins").innerHTML = this.wins;
    document.getElementById("losses").innerHTML = this.losses;
    document.getElementById("letters").innerHTML = this.getFormattedOutput(
      this.lettersGuessed
    ).toUpperCase();
    document.getElementById("num-guesses").innerHTML = this.guessesLeft;
  };
}

let game = new Game();
