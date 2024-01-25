const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("infoDisplay");
const width = 8;

let playerGo = "white";
playerDisplay.textContent = "white";

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute("draggable", true);
        square.setAttribute('squareID', i);
    
        const row = Math.floor((63 - i) / 8)+1;

        if (row % 2 === 0 ){
            square.classList.add(i % 2 === 0 ? "beige" : "brown");
        } else {
            square.classList.add(i % 2 === 0 ? "brown" : "beige");
        }

        if (i <= 15) {
            square.firstChild.firstChild.classList.add('black');
        }
        
        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white');
        }
    
        
        gameBoard.append(square);
    })
}
createBoard()



const allSquares = document.querySelectorAll(" .square");

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
})

let startPositionID;
let draggedTarget;

function dragStart(e){ 
    startPositionID = e.target.parentNode.getAttribute('squareID');
    draggedTarget = e.target;
};

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropogation;

    const correctGo = draggedTarget.firstChild && draggedTarget.firstChild.classList.contains(playerGo);
    const taken = e.target.classList.contains('piece');
    const valid = checkIfValid(e.target);
    const opponentGo = playerGo === "black" ? "white" : "black";
    console.log(e.target.firstChild);
    const takenByOpponent = e.target.firstChild && e.target.firstChild?.classList.contains(opponentGo);
    
    if (correctGo) {
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedTarget);
            e.target.remove();
            checkForWin();
            changePlayer();
            return
        }
    
        if (taken && !takenByOpponent) {
            infoDisplay.textContent = "you cannot go here"
            setTimeout(() => infoDisplay.textContent = "", 2000)
            return
        }
        if (valid) {
            e.target.append(draggedTarget);
            checkForWin();
            changePlayer();
            return
        }
    }
}

function changePlayer() {
    if (playerGo === "black"){
        reverseID();
        playerGo = "white";
        playerDisplay.textContent = "white";
    } else {
        revertID();
        playerGo = "black";
        playerDisplay.textContent = "black";
    }
}


function reverseID() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) =>
        square.setAttribute("squareID", (width * width - 1)-i));
}

function revertID() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => square.setAttribute('squareID', i));
}




function checkIfValid(target) {
    const targetID = Number(target.getAttribute('squareID')) || Number(target.parentNode.getAttribute("squareID"));
    const startID = Number(startPositionID);
    const piece = draggedTarget.id


    switch(piece) {
        case 'pawn' :
            const starterRow = [8,9,10,11,12,13,14,15,48,49,50,51,52,53,54,55];
            //const starterRow = [48,49,50,51,52,53,54,55];
            if (
                starterRow.includes(startID) && startID - width * 2 === targetID ||
                starterRow.includes(startID) && startID + width * 2 === targetID ||
                startID + width === targetID ||
                startID - width === targetID ||
                startID - width - 1 === targetID && document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild ||
                startID - width + 1 === targetID && document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild ||
                startID + width - 1 === targetID && document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild ||
                startID + width + 1 === targetID && document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild 
                ) {
                    return true;
                }
                break;
        case 'knight':
            if (
                startID + width * 2 - 1 === targetID ||
                startID + width * 2 + 1 === targetID ||
                startID + width - 2 === targetID ||
                startID + width + 2 === targetID ||
                startID - width * 2 - 1 === targetID ||
                startID - width * 2 - 1 === targetID ||
                startID - width + 2 === targetID ||
                startID - width + 2 === targetID 
            ) {
                return true;
            }
            break;
        case 'bishop':
            if (
                startID + width + 1 === targetID ||
                startID + width * 2 + 2 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild ||
                startID + width * 3 + 3 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild ||
                startID + width * 4 + 4 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild ||
                startID + width * 5 + 5 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 + 4}"]`).firstChild ||
                startID + width * 6 + 6 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 + 5}"]`).firstChild ||
                startID + width * 7 + 7 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 6 + 6}"]`).firstChild ||

                startID - width - 1 === targetID ||
                startID - width * 2 - 2 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild ||
                startID - width * 3 - 3 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild ||
                startID - width * 4 - 4 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild ||
                startID - width * 5 - 5 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 - 4}"]`).firstChild ||
                startID - width * 6 - 6 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 - 5}"]`).firstChild ||
                startID - width * 7 - 7 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 6 - 6}"]`).firstChild ||
                
                startID - width + 1 === targetID ||
                startID - width * 2 + 2 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild ||
                startID - width * 3 + 3 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild ||
                startID - width * 4 + 4 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild ||
                startID - width * 5 + 5 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 + 4}"]`).firstChild ||
                startID - width * 6 + 6 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 + 5}"]`).firstChild ||
                startID - width * 7 + 7 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 6 + 6}"]`).firstChild ||
                
                startID + width - 1 === targetID ||
                startID + width * 2 - 2 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild ||
                startID + width * 3 - 3 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild ||
                startID + width * 4 - 4 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild ||
                startID + width * 5 - 5 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 - 4}"]`).firstChild ||
                startID + width * 6 - 6 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 - 5}"]`).firstChild ||
                startID + width * 7 - 7 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 6 - 6}"]`).firstChild
                

                ) {
                    return true;
                }
                break;
        case 'rook':
            if (
                startID + width === targetID ||
                startID + width * 2 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild ||
                startID + width * 3 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild ||
                startID + width * 4 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild ||
                startID + width * 5 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4}"]`).firstChild ||
                startID + width * 6 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5}"]`).firstChild ||
                startID + width * 7 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 6}"]`).firstChild ||

                startID - width === targetID ||
                startID - width * 2 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild ||
                startID - width * 3 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild ||
                startID - width * 4 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild ||
                startID - width * 5 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4}"]`).firstChild ||
                startID - width * 6 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5}"]`).firstChild ||
                startID - width * 7 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 6}"]`).firstChild ||

                startID + 1 === targetID ||
                startID + 2 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild ||
                startID + 3 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild ||
                startID + 4 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild ||
                startID + 5 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + 4}"]`).firstChild ||
                startID + 6 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + 5}"]`).firstChild ||
                startID + 7 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + 6}"]`).firstChild ||

                startID - 1 === targetID ||
                startID - 2 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild ||
                startID - 3 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild ||
                startID - 4 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild ||
                startID - 5 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - 4}"]`).firstChild ||
                startID - 6 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - 5}"]`).firstChild ||
                startID - 7 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - 6}"]`).firstChild 

            ) {
                return true;
            }
            break;
    
        case 'queen':
            if (
                startID + width + 1 === targetID ||
                startID + width * 2 + 2 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild ||
                startID + width * 3 + 3 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild ||
                startID + width * 4 + 4 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild ||
                startID + width * 5 + 5 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 + 4}"]`).firstChild ||
                startID + width * 6 + 6 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 + 5}"]`).firstChild ||
                startID + width * 7 + 7 === targetID && !document.querySelector(`[squareID="${startID + width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 6 + 6}"]`).firstChild ||

                startID - width - 1 === targetID ||
                startID - width * 2 - 2 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild ||
                startID - width * 3 - 3 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild ||
                startID - width * 4 - 4 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild ||
                startID - width * 5 - 5 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 - 4}"]`).firstChild ||
                startID - width * 6 - 6 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 - 5}"]`).firstChild ||
                startID - width * 7 - 7 === targetID && !document.querySelector(`[squareID="${startID - width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 6 - 6}"]`).firstChild ||
                
                startID - width + 1 === targetID ||
                startID - width * 2 + 2 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild ||
                startID - width * 3 + 3 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild ||
                startID - width * 4 + 4 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild ||
                startID - width * 5 + 5 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 + 4}"]`).firstChild ||
                startID - width * 6 + 6 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 + 5}"]`).firstChild ||
                startID - width * 7 + 7 === targetID && !document.querySelector(`[squareID="${startID - width + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2 + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3 + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4 + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5 + 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 6 + 6}"]`).firstChild ||
                
                startID + width - 1 === targetID ||
                startID + width * 2 - 2 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild ||
                startID + width * 3 - 3 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild ||
                startID + width * 4 - 4 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild ||
                startID + width * 5 - 5 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 - 4}"]`).firstChild ||
                startID + width * 6 - 6 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 - 5}"]`).firstChild ||
                startID + width * 7 - 7 === targetID && !document.querySelector(`[squareID="${startID + width - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2 - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3 - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4 - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5 - 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 6 - 6}"]`).firstChild ||
                
                startID + width === targetID ||
                startID + width * 2 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild ||
                startID + width * 3 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild ||
                startID + width * 4 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild ||
                startID + width * 5 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4}"]`).firstChild ||
                startID + width * 6 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5}"]`).firstChild ||
                startID + width * 7 === targetID && !document.querySelector(`[squareID="${startID + width}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + width * 6}"]`).firstChild ||

                startID - width === targetID ||
                startID - width * 2 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild ||
                startID - width * 3 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild ||
                startID - width * 4 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild ||
                startID - width * 5 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4}"]`).firstChild ||
                startID - width * 6 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5}"]`).firstChild ||
                startID - width * 7 === targetID && !document.querySelector(`[squareID="${startID - width}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - width * 6}"]`).firstChild ||

                startID + 1 === targetID ||
                startID + 2 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild ||
                startID + 3 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild ||
                startID + 4 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild ||
                startID + 5 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + 4}"]`).firstChild ||
                startID + 6 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + 5}"]`).firstChild ||
                startID + 7 === targetID && !document.querySelector(`[squareID="${startID + 1}"]`).firstChild && !document.querySelector(`[squareID="${startID + 2}"]`).firstChild && !document.querySelector(`[squareID="${startID + 3}"]`).firstChild && !document.querySelector(`[squareID="${startID + 4}"]`).firstChild && !document.querySelector(`[squareID="${startID + 5}"]`).firstChild && !document.querySelector(`[squareID="${startID + 6}"]`).firstChild ||

                startID - 1 === targetID ||
                startID - 2 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild ||
                startID - 3 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild ||
                startID - 4 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild ||
                startID - 5 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - 4}"]`).firstChild ||
                startID - 6 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - 5}"]`).firstChild ||
                startID - 7 === targetID && !document.querySelector(`[squareID="${startID - 1}"]`).firstChild && !document.querySelector(`[squareID="${startID - 2}"]`).firstChild && !document.querySelector(`[squareID="${startID - 3}"]`).firstChild && !document.querySelector(`[squareID="${startID - 4}"]`).firstChild && !document.querySelector(`[squareID="${startID - 5}"]`).firstChild && !document.querySelector(`[squareID="${startID - 6}"]`).firstChild 

            ) {
                return true
            }
            break;
        case 'king': 
            if (
                startID + 1 === targetID ||
                startID - 1 === targetID ||
                startID + width === targetID ||
                startID - width === targetID ||
                startID + width - 1 === targetID ||
                startID + width + 1 === targetID ||
                startID - width - 1 === targetID ||
                startID - width + 1 === targetID 
            ) {
                return true
            }
    }

}


function checkForWin() {
    const kings = Array.from(document.querySelectorAll("#king"));
    if (!kings.some(king => king.firstChild.classList.contains('white'))) {
        infoDisplay.innerHTML = "Black player wins!"
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', flase))
    }

    if (!kings.some(king => king.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML = "White player wins!"
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', flase))
    }
}
