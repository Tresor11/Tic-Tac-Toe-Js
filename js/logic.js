/* eslint-disable no-unused-expressions */
const game = (function () {
  const turn = true;
  const board = ['', '', '', '', '', '', '', '', ''];
  function availabe(_index) {
    return board[_index] == '';
  }
  const full = board.every((el) => el != '');
  const move = (_index, symbol = 'X') => {
    const id = dom.getId(_index);
    if (availabe(id)) {
      board[id] = symbol;
      dom.render(id, board[id]);
    }
  };
  const currentPlayer = (player1, player2) => {
    turn ? player1 : player2;
  };
  const win = () => {
    [0, 1, 2].forEach((el) => {
      if (
        (board[el * 3] == board[el * 3 + 1]
          && board[el * 3] == board[el * 3 + 2])
        || (board[el] == board[el + 3] && board[el] == board[el + 6])
      ) {
        return turn;
      }
      if (
        (board[0] == board[4] && board[0] == board[8])
        || (board[2] == board[4] && board[2] == board[6])
      ) {
        return true;
      }
      return false;
    });
  };
  return {
    move,
    currentPlayer,
    turn,
    win,
    full,
  };
}());
const player = (name) => ({ name });
const engine = game;
