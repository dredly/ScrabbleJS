function placeWord(wordArr, placementList) {
    // Loops through the array representing a word to be placed
    // Takes an array of letter objects and an array of integers
    // which represent where to place the letters
    for (let i = 0; i < wordArr.length; i++) {
        placeOnBoard(wordArr[i], placementList[i]);
    }
};

function placeOnBoard(letter, placement) {
    // A function to render a letter tile on a specific square of the board
    // Takes a letter object and an integer
    const chosenSquare = board.children[placement];
    board.replaceChild(letter.makeTile(), chosenSquare);
}

function getPlacementList(wordLength, startSquare, direction) {
    // Takes an integer for the length of the word, an integer to 
    // represent the starting square position and a string to represent
    // direction. This will be either 'right' or 'down'
    // Returns an array of squares that a letter would be placed on
    const placementList = [startSquare];
    const increase = direction === 'right' ? 1 : 15;
    let current_square = startSquare;
    for (let i = 1; i < wordLength; i++) {
        current_square += increase;
        placementList.push(current_square);
    }
    return placementList;
};

function isValidStartPlacement(placementList) {
    // Makes sure that the first word covers the starting square
    return placementList.includes(112);
};

function hasLetters(attemptedWord, availableLetters) {
    // Takes two arrays, attemptedWord and availableLetters,
    // and checks that the attemptedWord can be written with 
    // the available letters. 

    //Returns a boolean value

    let numBlanks = availableLetters.filter(item => item === '').length;

    for (let letter of attemptedWord) {
        const numInAttempt = attemptedWord.filter(item => item === letter).length;
        const numInAvailable = availableLetters.filter(item => item === letter).length;
        if (numBlanks === 0) {
            if (numInAttempt > numInAvailable) return false;
        } else {
            // Check if blank is being used
            if (!availableLetters.includes(letter)) {
                numBlanks -= 1;
                console.log('Used one blank');
            }
        }
    }
    return true;
}

function getLetterObj(character) {
    // Takes a single character, and returns the letter object associated with it
    return letterList.filter(letter => letter.character === character)[0];
}

// Initialise an object to store direction and starting square for placing words
const wordPlacement = { start: 0, direction: 'right' };

// Initialise the tile rack
setupTileRack();

function addPlacementListeners(wordAttempt) {
    // Add a click event listener on each square.
    // Once the square has been clicked, listen for a keyboard event
    // to determine the direction of word placement
    squaresArray.forEach(square => {
        square.addEventListener('click', () => {
            wordPlacement.start = squaresArray.indexOf(square);
            console.log(`Clicked on square number ${squaresArray.indexOf(square)}`);
            window.addEventListener('keydown', evt => {
                if (evt.key === 'ArrowDown' || evt.key === 'ArrowRight')
                    if (evt.key === 'ArrowDown') {
                        wordPlacement.direction = 'down';
                    } else wordPlacement.direction = 'right';
                console.log(square);
                console.log(wordPlacement);
                let wordLength = wordAttempt.length;
                let placementList = getPlacementList(wordLength, wordPlacement.start, wordPlacement.direction);
                console.log(placementList);
                if (isValidStartPlacement(placementList)) {
                    const wordArr = wordAttempt.map(chr => getLetterObj(chr));
                    placeWord(wordArr, placementList);
                } else console.log('Word must cover the start square');
            })
        })
    })
}

wordForm = document.querySelector('#wordInputForm');

wordForm.addEventListener('submit', evt => {
    evt.preventDefault();
    // Extract data from the word submission form and turn it into a list of 
    // uppercase letters in the same order
    const wordAttempt = wordForm.elements.word.value.toUpperCase().split('');
    console.log(wordAttempt);
    // Likewise, extract a list of uppercase letters from the tilerack so that
    // they can be compared with the attempted word
    const currentLetters = tileRack.letters.map(tile => {
        return tile.character;
    });
    if (!hasLetters(wordAttempt, currentLetters)) {
        console.log('You do not have the letters to write that word');
    } else {
        addPlacementListeners(wordAttempt);
    }
})