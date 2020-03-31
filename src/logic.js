/* eslint-disable func-names */
import dom from './dom';

const game = (() => {
  const turn = true;
  const running = true;

  function victory(arr) {
    for (let i = 0; i <= 2; i += 1) {
      if ((arr[i * 3] === arr[(i * 3) + 1]
          && arr[i * 3] === arr[(i * 3) + 2]
          && arr[i * 3] !== '')
         || (arr[i] === arr[i + 3]
          && arr[i] === arr[i + 6]
          && arr[i] !== '')) {
        return true;
      }
    }

    if ((arr[0] === arr[4]
        && arr[0] === arr[8]
        && arr[0] !== '')
       || (arr[2] === arr[4]
        && arr[2] === arr[6]
        && arr[2] !== '')) {
      return true;
    }

    return false;
  }

  return {
    victory,
    turn,
    running,
  };
})();

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  return { board };
})();

const player = (name1, name2) => {
  const player1 = name1;
  const player2 = name2;
  return { player1, player2 };
};

let players = player('', '');
const engine = game;

const validMove = (_index, sign) => {
  const id = dom.getId(_index);
  if (gameBoard.board[id] === '' && engine.running) {
    gameBoard.board[id] = sign;
    dom.render(id, gameBoard.board[id]);
    return true;
  }
  return false;
};

function check(bol = engine.turn) {
  if (bol) {
    return players.player1;
  }
  return players.player2;
}

function playAgain() {
  gameBoard.board = ['', '', '', '', '', '', '', '', ''];
  engine.running = true;
  engine.turn = true;
  dom.show('status');
  dom.render('status', `${check()} make a move 🙂 🤓`);
  dom.hide('winner');
  for (let i = 0; i <= 8; i += 1) {
    dom.render(`${i}`, '..');
  }
}

function cancel() {
  // eslint-disable-next-line no-restricted-globals
  location.reload(true);
  return false;
}

function gameEnd() {
  if (engine.victory(gameBoard.board)) {
    engine.running = false;
    return true;
  }
  if (gameBoard.board.every(el => el !== '')) {
    engine.running = false;
    return false;
  }
  return 0;
}

function start() {
  dom.hide('welcome');
  dom.show('modal');
  dom.show('play');
  players = player(dom.getName('player1'), dom.getName('player2'));
  dom.render('status', `${check()} make a move 🙂 🤓`);
}

function winMove() {
  if (!engine.running) {
    if (gameEnd()) {
      dom.render('win-msg', `CONGRATULATIONS ${check()}🏅🥇👏`);
      dom.show('winner');
      dom.hide('status');
    } else {
      dom.render('win-msg', 'IT\'S a TIE 😇👏');
      dom.show('winner');
      dom.hide('status');
    }
  }
}


const symbol = (bol = engine.turn) => {
  if (bol) {
    return 'X';
  }
  return 'O';
};

window.move = function (id) {
  if (engine.running) {
    if (validMove(id, symbol(engine.turn))) {
      gameEnd();
      winMove();
      engine.turn = !engine.turn;
      dom.render('status', `${check()} make a move 🙂 🤓`);
    } else {
      dom.render('status', ` please ${check()} make a valid move 🤔 🧐`);
    }
  } else {
    return false;
  }
  return 0;
};

export {
  start, cancel, playAgain, gameBoard, validMove, game, engine, gameEnd, symbol, check, player,
};