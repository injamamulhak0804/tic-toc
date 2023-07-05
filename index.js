const boxs = document.querySelectorAll(".box")
const statusTxt = document.getElementById("status")
const btnReset = document.querySelector("#reset")

// let x = "<img style='width:100px;' src = '../images/x.png'>";
// let o = "<img style='width:100%;' src = '../images/o.png'>";

let x = "X"
let o = "O"

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


let option = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = 'x';
let running = false;

init()
function init() {
    boxs.forEach((box) => {
        box.addEventListener('click', boxClick)
        btnReset.addEventListener('click', restartGame);
        running = true;
        statusTxt.textContent = `${player} Your Turn`
    });
}

function boxClick() {
    const index = this.dataset.index;
    if (option[index] != '' || !running) {
        return
    }
    UpdateBox(this, index);
    checkWinner();
}


function UpdateBox(box, index) {
    option[index] = player
    box.innerHTML = currentPlayer
}


function changePlayer() {
    player = (player == 'x') ? 'o' : 'x';
    currentPlayer = (currentPlayer == x) ? o : x;
    statusTxt.textContent = `${player} Your Turn`;
}


function checkWinner() {
    let isWon = false;
    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const box1 = option[condition[0]]
        const box2 = option[condition[1]]
        const box3 = option[condition[2]]
        if (box1 == '' || box2 == '' || box3 == '') {
            continue;
            
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;
            boxs[condition[0]].classList.add('win')
            boxs[condition[1]].classList.add('win')
            boxs[condition[2]].classList.add('win')
        }
    }
    if (isWon) {
        statusTxt.textContent = `${player} Won..!`
        running = false
    } else if (!option.includes("")) {
        statusTxt.textContent = `Game Draw..!`
        running = false
    }
    else {
        changePlayer()
    }

}



function restartGame() {
    option = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = x;
    player = 'x';
    running = true;
    statusTxt.textContent = `${player} Your Turn`;
    boxs.forEach(box=>{
        box.innerHTML = '';
        box.classList.remove('win')
    })
}



