function placeWord(wordArr, placementList) {
    // Loops through the array representing a word to be placed
    // Takes an array of letter objects and an array of integers
    // which represent where to place the letters
    for (let i = 0; i < wordArr.length; i++) {
        placeOnBoard(wordArr[i], placementList[i]);
    }
    // Update the squares array to include the newly placed tiles 
    squaresArray = [...document.querySelector('#board').children];
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

function checkNeighbours(coordArr) {

}