// initialize the game board

const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  return { board };
})();

// check of a winning combination

const victory = (arr) => {
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
};

export { gameBoard, victory };