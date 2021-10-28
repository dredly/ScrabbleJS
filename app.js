const board = document.querySelector('#board');
const tileRack = document.querySelector('#tile-rack');

for (let i = 0; i < 15 ** 2; i++) {
    const boardSquare = document.createElement('div');
    boardSquare.classList.add('board-square');
    board.append(boardSquare);
}

const squaresArray = [...document.querySelector('#board').children];

function hasLetters(attemptedWord, availableLetters) {
    // Takes two arrays, attemptedWord and availableLetters,
    // and checks that the attemptedWord can be written with 
    // the available letters. 

    //Returns a boolean value

    //TODO: Add functionality for a blank tile
    let numBlanks = availableLetters.filter(item => item === '').length;
    console.log(availableLetters);
    console.log(numBlanks);

    for (let letter of attemptedWord) {
        const numInAttempt = attemptedWord.filter(item => item === letter).length;
        const numInAvailable = availableLetters.filter(item => item === letter).length;
        if (numBlanks === 0) {
            if (numInAttempt > numInAvailable) return false;
        } else {
            console.log(`There are ${numBlanks} blank tiles`);
        }
    }
    return true;
}

function applyBonusSquares(squareList, squareClass) {
    const filteredSquares = squaresArray.filter(square => squareList.includes(squaresArray.indexOf(square)));
    filteredSquares.map(square => {
        square.classList.add(squareClass)
        square.innerText = squareClass.replace('-', ' ');
    });
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

const dlSquareList = [3, 11, 36, 38, 45, 52, 59, 92, 96, 98, 102, 122, 126, 128, 132, 165, 172, 179, 186, 188, 213, 221];
const tlSquareList = [20, 24, 76, , 80, 84, 88, 136, 140, 144, 148, 200, 204];
const dwSquareList = [16, 28, 32, 42, 48, 56, 64, 70, 112, 154, 160, 168, 176, 182, 192, 196, 208];
const twSquareList = [0, 7, 14, 105, 119, 210, 217, 224];

applyBonusSquares(dlSquareList, 'double-letter');
applyBonusSquares(tlSquareList, 'triple-letter');
applyBonusSquares(twSquareList, 'triple-word');
applyBonusSquares(dwSquareList, 'double-word');

const startImage = document.createElement('img');
startImage.src = 'media/star.png';
startImage.classList.add('start-square');
squaresArray[112].innerText = '';
squaresArray[112].append(startImage);

class Letter {
    constructor(character, pointsVal, qty) {
        this.character = character;
        this.pointsVal = pointsVal;
        this.qty = qty;
    }
    makeTile() {
        const { character, pointsVal } = this;
        console.log(character);
        const tile = document.createElement('div');
        // Make sure the 0 for value is not displayed for blank tiles
        if (pointsVal !== 0) {
            tile.innerHTML = `${character}<sub>${pointsVal}</sub>`;
        }
        tile.classList.add('tile');
        return tile;
    }
}

// ----------------- Testing
// const blankLetter = new Letter('', 0, 2);
// tileRack.append(blankLetter.makeTile());
// ----------------- Testing

const createLetters = () => {
    aLetter = new Letter('A', 1, 9);
    bLetter = new Letter('B', 3, 2);
    cLetter = new Letter('C', 3, 2);
    dLetter = new Letter('D', 2, 4);
    eLetter = new Letter('E', 1, 12);
    fLetter = new Letter('F', 4, 2);
    gLetter = new Letter('G', 2, 3);
    hLetter = new Letter('H', 4, 2);
    iLetter = new Letter('I', 1, 9);
    jLetter = new Letter('J', 8, 1);
    kLetter = new Letter('K', 5, 1);
    lLetter = new Letter('L', 1, 4);
    mLetter = new Letter('M', 3, 2);
    nLetter = new Letter('N', 1, 6);
    oLetter = new Letter('O', 1, 8);
    pLetter = new Letter('P', 3, 2);
    qLetter = new Letter('Q', 10, 1);
    rLetter = new Letter('R', 1, 6);
    sLetter = new Letter('S', 1, 4);
    tLetter = new Letter('T', 1, 6);
    uLetter = new Letter('U', 1, 4);
    vLetter = new Letter('V', 4, 2);
    wLetter = new Letter('W', 4, 2);
    xLetter = new Letter('X', 8, 1);
    yLetter = new Letter('Y', 4, 2);
    zLetter = new Letter('Z', 10, 1);
    blankLetter = new Letter('', 0, 2);
    return [aLetter, bLetter, cLetter, dLetter, eLetter, fLetter, gLetter, hLetter, iLetter, jLetter, kLetter, lLetter, mLetter, nLetter,
        oLetter, pLetter, qLetter, rLetter, sLetter, tLetter, uLetter, vLetter, wLetter, xLetter, yLetter, zLetter, blankLetter];
};

const letterList = createLetters();
const letterBag = [];
letterList.forEach(letter => {
    for (i = 0; i < letter.qty; i++) {
        letterBag.push(letter);
    }
})

function fillRack() {
    const numToFill = 7; // HARDCODED FOR TESTING
    for (let i = 0; i < numToFill; i++) {
        const randIndex = Math.floor(Math.random() * letterBag.length);
        const randLetter = letterBag[randIndex];
        letterBag.splice(randIndex, 1);
        tileRack.append(randLetter.makeTile());
    }
}

function placeOnBoard(letter, placement) {
    const chosenSquare = board.children[placement];
    board.replaceChild(letter.makeTile(), chosenSquare);
}

fillRack();
console.log(tileRack.children[0]);
tileRack.children[0].addEventListener('drag', () => {
    console.log('Dragging Element');
});
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