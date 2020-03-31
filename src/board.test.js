import { gameBoard, victory } from './board';

describe('inititialise the game board', () => {
  test('the board must contain empty strings', () => {
    expect(gameBoard.board[0]).toBe('');
    expect(gameBoard.board[8]).toBe('');
  });
});

describe('check for a winning combination', () => {
  test('return fase if there is no winning combination', () => {
    expect(victory([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(false);
  });

  test('return true if there is a  winnig combination', () => {
    expect(victory([1, 1, 1, 4, 5, 6, 7, 8, 9])).toBe(true);
  });
});