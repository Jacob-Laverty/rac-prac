import {SnakeGame} from './snake';

describe("snake", () => {
  it("should play snake", () => {
    const game = new SnakeGame(2,3, [[1,2], [0,1]])
    expect(game.playGame(["R", "D", "R", "U", "L", "U"])).toEqual([undefined, 0, 0, 1, 1, 2, -1])
  })
})