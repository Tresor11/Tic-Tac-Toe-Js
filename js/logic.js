/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line func-names
const game = (function () {
  const turn = true;
  const running = true;
  const board = ['', '', '', '', '', '', '', '', ''];

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
    board,
    victory,
    turn,
    running,
  };
}());
const player = (name) => ({
  name,
});
const engine = game;

const validMove = (_index, sign) => {
  const id = dom.getId(_index);
  if (engine.board[id] === '') {
    engine.board[id] = sign;
    dom.render(id, engine.board[id]);
    return true;
  }
  return false;
};

let player1 = player('');
let player2 = player('');

function check(bol = engine.turn) {
  if (bol) {
    return player1;
  }
  return player2;
}

function playAgain() {
  engine.board = ['', '', '', '', '', '', '', '', ''];
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
}

function gameEnd() {
  if (engine.victory(engine.board)) {
    engine.running = !engine.running;
    return true;
  }
  if (engine.board.every(el => el !== '')) {
    engine.running = !engine.running;
    return false;
  }
  return 0;
}

function start(id) {
  dom.hide('welcome');
  dom.show('modal');
  dom.show('play');
  player1 = dom.getName('user1');
  player2 = dom.getName('user2');
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

function move(id) {
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
}