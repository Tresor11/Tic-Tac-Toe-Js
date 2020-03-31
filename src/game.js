/* eslint-disable func-names */
import dom from './dom';
// eslint-disable-next-line import/no-cycle
import { player, symbol, check } from './player';

import { gameBoard, victory } from './board';

const game = (() => {
  const turn = true;
  const running = true;
  return {
    turn,
    running,
  };
})();

// main variables initialization

const engine = game;
let players = player('', '');

// check if the move if valid

const validMove = (_index, sign) => {
  const id = dom.getId(_index);
  if (gameBoard.board[id] === '' && engine.running) {
    gameBoard.board[id] = sign;
    dom.render(id, gameBoard.board[id]);
    return true;
  }
  return false;
};

// game reinitialization

function playAgain() {
  gameBoard.board = ['', '', '', '', '', '', '', '', ''];
  engine.running = true;
  engine.turn = true;
  dom.show('status');
  dom.render('status', `${check(engine.turn, players)} make a move 🙂 🤓`);
  dom.hide('winner');
  for (let i = 0; i <= 8; i += 1) {
    dom.render(`${i}`, '..');
  }
}

// cancel play again

function cancel() {
  // eslint-disable-next-line no-restricted-globals
  location.reload(true);
  return false;
}

// return true if a player won,return false if it's a tie,return 0 if the game still running

function gameEnd() {
  if (victory(gameBoard.board)) {
    engine.running = false;
    return true;
  }
  if (gameBoard.board.every(el => el !== '')) {
    engine.running = false;
    return false;
  }
  return 0;
}

// game initialization

function start() {
  dom.hide('welcome');
  dom.show('modal');
  dom.show('play');
  players = player(dom.getName('player1'), dom.getName('player2'));
  dom.render('status', `${check(engine.turn, players)} make a move 🙂 🤓`);
}

// check if one player won or if it's a tie

function winMove() {
  if (!engine.running) {
    if (gameEnd()) {
      dom.render('win-msg', `CONGRATULATIONS ${check(engine.turn, players)}🏅🥇👏`);
      dom.show('winner');
      dom.hide('status');
    } else {
      dom.render('win-msg', 'IT\'S a TIE 😇👏');
      dom.show('winner');
      dom.hide('status');
    }
  }
}

// allow current player to only make a move for an available post

window.move = function (id) {
  if (engine.running) {
    if (validMove(id, symbol(engine.turn))) {
      gameEnd();
      winMove();
      engine.turn = !engine.turn;
      dom.render('status', `${check(engine.turn, players)} make a move 🙂 🤓`);
    } else {
      dom.render('status', ` please ${check(engine.turn, players)} make a valid move 🤔 🧐`);
    }
  } else {
    return false;
  }
  return 0;
};

export {
  start, cancel, playAgain,
};