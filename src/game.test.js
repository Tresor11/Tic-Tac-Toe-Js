import {
  engine,
} from './game';

let boardMock = ['', '', '', '', '', '', '', '', ''];

const validMoveMock = jest.fn((index, sign) => {
  if (boardMock[index] === '' && engine.running) {
    boardMock[index] = sign;
    return true;
  }
  return false;
});

const playAgainMock = jest.fn(() => {
  boardMock = ['', '', '', '', '', '', '', '', ''];
  engine.running = true;
  engine.turn = true;
});

const moveMock = jest.fn((index) => {
  if (engine.running) {
    if (validMoveMock(index, 'X')) {
      engine.turn = !engine.turn;
      return true;
    }
  }
  return false;
});

describe('check of valid move', () => {
  test('check if the post is availabe', () => {
    expect(validMoveMock(0, 'o')).toBe(true);
  });
  test('check if the post is not available', () => {
    expect(validMoveMock(0, 'x')).toBe(false);
  });

  test('check if the post is valid', () => {
    expect(validMoveMock(20, 'x')).toBe(false);
  });
});

describe('reinitialize the game', () => {
  test('reinitialise the board', () => {
    playAgainMock();
    expect(boardMock[0]).toBe('');
  });

  test('reinitialize the payer turn', () => {
    expect(engine.turn).toBe(true);
  });
});

describe('make a move and change the current player', () => {
  test('check if the move is valid before making it', () => {
    expect(moveMock(10)).toBe(false);
    expect(moveMock(5)).toBe(true);
  });

  test('cange the current player after a move', () => {
    expect(engine.turn).toBe(false);
    moveMock(7);
    expect(engine.turn).toBe(true);
  });
});
