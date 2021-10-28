const board = document.querySelector('#board');

for (let i = 0; i < 15 ** 2; i++) {
    const boardSquare = document.createElement('div');
    boardSquare.classList.add('board-square');
    board.append(boardSquare);
}

const tileRack = document.querySelector('#tile-rack');
const squaresArray = [...document.querySelector('#board').children];

const startImage = document.createElement('img');
startImage.src = 'media/star.png';
startImage.classList.add('start-square');
squaresArray[112].innerText = '';
squaresArray[112].append(startImage);

const dlSquareList = [3, 11, 36, 38, 45, 52, 59, 92, 96, 98, 102, 122, 126, 128, 132, 165, 172, 179, 186, 188, 213, 221];
const tlSquareList = [20, 24, 76, , 80, 84, 88, 136, 140, 144, 148, 200, 204];
const dwSquareList = [16, 28, 32, 42, 48, 56, 64, 70, 112, 154, 160, 168, 176, 182, 192, 196, 208];
const twSquareList = [0, 7, 14, 105, 119, 210, 217, 224];

function applyBonusSquares(squareList, squareClass) {
    const filteredSquares = squaresArray.filter(square => squareList.includes(squaresArray.indexOf(square)));
    filteredSquares.map(square => {
        square.classList.add(squareClass)
        square.innerText = squareClass.replace('-', ' ');
    });
}

applyBonusSquares(dlSquareList, 'double-letter');
applyBonusSquares(tlSquareList, 'triple-letter');
applyBonusSquares(twSquareList, 'triple-word');
applyBonusSquares(dwSquareList, 'double-word');