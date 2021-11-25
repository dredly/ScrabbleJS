function isValidStartPlacement(placementList) {
    // Makes sure that the first word covers the starting square
    return placementList.includes(112);
};

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
            window.addEventListener('keydown', function handleKeyPress(evt) {
                if (evt.key === 'ArrowDown' || evt.key === 'ArrowRight') {
                    if (evt.key === 'ArrowDown') {
                        wordPlacement.direction = 'down';
                    } else wordPlacement.direction = 'right';
                    window.removeEventListener('keydown', handleKeyPress);
                }
                console.log(square);
                console.log(wordPlacement);
                let wordLength = wordAttempt.length;
                let placementList = getPlacementList(wordLength, wordPlacement.start, wordPlacement.direction);
                console.log(placementList);
                if (isValidStartPlacement(placementList)) {
                    const wordArr = wordAttempt.map(chr => getLetterObj(chr));
                    placeWord(wordArr, placementList);
                    tileRack.replenish(wordArr);
                } else console.log('Word must cover the start square');
            });
        })
    })
}

const handleWordSubmission = evt => {
    evt.preventDefault();
    // Extract data from the word submission form and turn it into a list of 
    // uppercase letters in the same order
    const wordAttempt = wordForm.elements.word.value.toUpperCase().split('');
    // Try resetting value in text input
    wordForm.elements.word.value = '';
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
}

wordForm = document.querySelector('#wordInputForm');

wordForm.addEventListener('submit', handleWordSubmission);