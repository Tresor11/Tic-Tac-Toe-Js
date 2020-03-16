/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
const game = (function () {
  let turn = true;
  let running = true;
  const board = ['', '', '', '', '', '', '', '', ''];
  function availabe(_index) {
    return board[_index] == '';
  }

  const full = board.every((el) => el !== '');
  const move = (_index, sign) => {
    const id = dom.getId(_index);
    if (availabe(id)) {
      board[id] = sign;
      dom.render(id, board[id]);
      return true;
    }
    return false;
  };

  const victory = (arr) => {
    [0, 1, 2].forEach((el) => {
      if (
        (arr[el * 3] === arr[el * 3 + 1]
          && arr[el * 3] === arr[el * 3 + 2])
        || (arr[el] === arr[el + 3] && arr[el] === arr[el + 6])
      ) {
        return true;
      }
    });
    if (
      (arr[0] === arr[4] && arr[0] === arr[8])
      || (arr[2] === arr[4] && arr[2] === arr[6])
    ) {
      return true;
    }
    return false;
  };
  function gameEnd() {
    if (full) {
      running = false;
      return false;
    }
    if (victory) {
      running = false;
      return true;
    }

    turn = !turn;
    return 0;
  }
  return {
    board,
    move,
    victory,
    turn,
    full,
    gameEnd,
    running,
  };
}());
const player = (name) => ({
  name,
});
const engine = game;

function start(id) {
  dom.hide('welcome');
  dom.show('play');
  const player1 = dom.getName(1);
  const player2 = dom.getName(2);
  document.getElementById('status').innerText = `${player2},${player1}`;
}

const symbol = bol => {
  if (bol) {
    return 'X';
  }
  return 'O';
};

function move(id) {
  engine.move(id, symbol(engine.turn));
  engine.turn = !engine.turn;
}