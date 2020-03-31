import {
  gameBoard, engine, gameEnd, symbol, player,
} from './game';

const validMoveMock = jest.fn((index, sign) => {
  if (gameBoard.board[index] === '' && engine.running) {
    gameBoard.board[index] = sign;
    return true;
  }
  return false;
});

const playAgainMock = jest.fn(() => {
  gameBoard.board = ['', '', '', '', '', '', '', '', ''];
  engine.running = true;
  engine.turn = true;
});

const moveMock = jest.fn((index) => {
  if (engine.running) {
    if (validMoveMock(index, symbol(engine.turn))) {
      engine.turn = !engine.turn;
      return true;
    }
  }
  return false;
});

test('check for a valid move', () => {
  expect(validMoveMock(8, 'o')).toBe(true);
  expect(validMoveMock(8, 'x')).toBe(false);
  expect(validMoveMock(5, 'o')).toBe(true);
});

test('check for winning combination', () => {
  expect(engine.victory(gameBoard.board)).toBe(false);
  expect(validMoveMock(0, 'o')).toBe(true);
  expect(validMoveMock(1, 'o')).toBe(false);
  expect(validMoveMock(2, 'o')).toBe(true);
  expect(engine.victory(gameBoard.board)).toBe(true);
});


test('reinitialize the game', () => {
  playAgainMock();
  expect(gameBoard.board[0]).toBe('');
  expect(engine.running).toBe(true);
  expect(engine.turn).toBe(true);
});

test('check if the game end', () => {
  expect(gameEnd()).toBe(0);
  validMoveMock(0, 'x');
  validMoveMock(1, 'x');
  validMoveMock(2, 'x');
  expect(gameEnd()).toBe(true);
});

test('change the symbol after a move', () => {
  expect(symbol()).toBe('X');
});

test('change the turn after a move', () => {
  playAgainMock();
  expect(engine.turn).toBe(true);
  moveMock(1);
  expect(engine.turn).toBe(false);
});

test('check if the move is valid before making it', () => {
  expect(moveMock(1)).toBe(false);
  expect(moveMock(2)).toBe(true);
});

test('create players', () => {
  const players = player('jest', 'test');
  expect(players.player1).toBe('jest');
  expect(players.player2).toBe('test');
});
