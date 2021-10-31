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

        //BUG TO FIX: only works when removed in order they appear in the tileRack
        removalInds = inds.map(ind => ind - inds.indexOf(ind));
        for (let ind of removalInds) {
            console.log(ind)
            this.letters.splice(ind, 1);
        }
    },
    replenish: function (usedLetters) {
        const usedInds = usedLetters.map(lett => this.letters.indexOf(lett));
        this.remove(usedInds);
        this.fill(7 - usedLetters.length);
        this.reRender();
    }
};

function setupTileRack() {
    tileRack.fill(7);
    tileRack.initialRender();
    tileRack.reRender();
}