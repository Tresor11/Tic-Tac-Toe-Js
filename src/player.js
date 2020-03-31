const player = (name1, name2) => {
  const player1 = name1;
  const player2 = name2;
  return { player1, player2 };
};

// change the symbol according to the current player

const symbol = (bol) => {
  if (bol) {
    return 'X';
  }
  return 'O';
};

// change the current player

function check(bol, obj) {
  if (bol) {
    return obj.player1;
  }
  return obj.player2;
}
export { player, symbol, check };