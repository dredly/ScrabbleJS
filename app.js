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
    return letterList.filter(letter => letter.character === character)[0];
}

function addPlacementListeners() {
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
            })
        })
    })
}

function placeWord(wordArr, startSquare, direction) {
    // Loops through the array representing a word to be placed
    // Takes an array of letters, a number to represent the square to 
    // start on and a direction, which must be the string 'right' or
    // 'down'
    let current_square = startSquare;
    const increase = direction == 'right' ? 1 : 15;
    for (let letter of wordArr) {
        placeOnBoard(letter, current_square);
        current_square += increase;
    }
};

// ----------------- Testing
// const blankLetter = new Letter('', 0, 2);
// tileRack.append(blankLetter.makeTile());
// ----------------- Testing

function placeOnBoard(letter, placement) {
    const chosenSquare = board.children[placement];
    board.replaceChild(letter.makeTile(), chosenSquare);
}

console.log(tileRack.children[0]);

wordForm = document.querySelector('#wordInputForm');

const wordPlacement = { start: 0, direction: 'right' };

wordForm.addEventListener('submit', evt => {
    evt.preventDefault();
    // Extract data from the word submission form and turn it into a list of 
    // uppercase letters in the same order
    const wordAttempt = wordForm.elements.word.value.toUpperCase().split('');
    console.log(wordAttempt);
    // Likewise, extract a list of uppercase letters from the tilerack so that
    // they can be compared with the attempted word
    const currentLetters = [...tileRack.children].map(tile => {
        return tile.innerText[0] || '';
    });
    if (!hasLetters(wordAttempt, currentLetters)) {
        console.log('You do not have the letters to write that word')
    } else {
        addPlacementListeners();
    }
})

// TESTING ------------------------
// const cTile = cLetter.makeTile();
// cTile.style.gridColumn = '5';
// cTile.style.gridRow = '3';
// board.append(cTile);
// TESTING ------------------------