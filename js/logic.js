/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

const PLAYER_ONE = 'x';
const PLAYER_TWO = 'o';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const gameElements = document.querySelectorAll('[cell-btn]')
const board = document.getElementById('board')
const winner= document.getElementById('win-message')
const restartGame = document.getElementById('restart')
const winnerMessage = document.querySelector('[win-message-response]')
let playerTWoTurn

startGame()

function startGame(){
  gameTurn = false
  gameElements.forEach(cell => {
    cell.classList.remove(PLAYER_ONE)
    cell.classList.remove(PLAYER_TWO)
    cell.removeEventListener('click', playerTurn)
    cell.addEventListener('click', playerTurn, { once: true })
  })
  setTurn()
  winner.classList.remove('show')
}

function playerTurn(e) {
  const cell = e.target
  const currentClass = playerTwoTurn ? CIRCLE_CLASS : X_CLASS
  currentPosition(cell, currentClass)
  if (checkWinner(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    setTurn()
  }
}

function isDraw() {
  return [...gameElements].every(cell => {
    return cell.classList.contains(PLAYER_TWO) || cell.classList.contains(PLAYER_TWO)
  })
}

function endGame(draw) {
  if (draw) {
    winnerMessage.innerText = 'Draw!'
  } else {
    winnerMessage.innerText = `${playerTwoTurn ? "O" : "X"} Wins!`
  }
  winner.classList.add('show')
}

function isDraw() {
  return [...gameElements].every(cell => {
    return cell.classList.contains(PLAYER_ONE) || cell.classList.contains(PLAYER_TWO)
  })
}

function currentPosition(cell, currentClass) {
  cell.classList.add(currentClass)
}

function setTurn() {
  playerTwoTurn = !playerTwoTurn
}

function checkWinnner(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return gameElements[index].classList.contains(currentClass)
    })
  })
}

restartGame.addEventListener(click, startGame);
