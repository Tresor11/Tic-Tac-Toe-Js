import { player, symbol, check } from './player';

const playersMock = player('jest', 'test');

describe('change current player according to the game status', () => {
  test('return player1 if turn is true', () => {
    expect(check(true, playersMock)).toBe('jest');
  });

  test('return player2 if turn is false', () => {
    expect(check(false, playersMock)).toBe('test');
  });
});

describe('change the symbol according to the game status', () => {
  test('return X if game status is true', () => {
    expect(symbol(true)).toBe('X');
  });

  test('return O if game status is false', () => {
    expect(symbol(false)).toBe('O');
  });
});