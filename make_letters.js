class Letter {
    constructor(character, pointsVal, qty) {
        this.character = character;
        this.pointsVal = pointsVal;
        this.qty = qty;
    }
    makeTile() {
        // Method to render the html for a given letter object
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

const tileRack = {
    display: document.querySelector('#tile-rack'),
    letters: [],
    fill: function (numToFill) {
        // Populates the letters array with the specified number of letter objects
        // numToFill should be between 1 and 7
        for (let i = 0; i < numToFill; i++) {
            const randIndex = Math.floor(Math.random() * letterBag.length);
            const randLetter = letterBag[randIndex];
            letterBag.splice(randIndex, 1);
            this.letters.push(randLetter);
        }
    },
    // TODO: Change from showing blank tiles to a separate element for space in the rack
    initialRender: function () {
        // Renders 7 blank tiles to populate the tileRack HTML element
        for (let i = 0; i < 7; i++) {
            this.display.append(blankLetter.makeTile());
        }
    },
    reRender: function () {
        // Updates the display of the tileRack HTML element to show the current contents of the letters array
        for (let i = 0; i < 7; i++) {
            if (i < this.letters.length) {
                this.display.replaceChild(this.letters[i].makeTile(), this.display.children[i]);
            } else {
                this.display.replaceChild(blankLetter.makeTile(), this.display.children[i]);
            }
        }
    },
    remove: function (inds) {
        // inds should be an array of integers from 0 to 6 inclusive.
        // letter objects will be removed from the letters array according to the given indices in inds

        // The following line compensates for the fact that the index of the targeted letter changes each time
        // a letter is removed.
        removalInds = inds.map(ind => ind - inds.indexOf(ind));
        for (let ind of removalInds) {
            console.log(ind)
            this.letters.splice(ind, 1);
        }
    }
};

tileRack.fill(7);
tileRack.initialRender();
tileRack.reRender();