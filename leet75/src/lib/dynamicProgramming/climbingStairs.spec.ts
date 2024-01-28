import {climbStairs} from './climbingStairs'

describe('climbStairs test', () => {
  it('should solve example 1', () => {
    expect(climbStairs(4)).toEqual(5)
    expect(climbStairs(3)).toEqual(3)
    expect(climbStairs(2)).toEqual(2);
    expect(climbStairs(1)).toEqual(1);
    expect(climbStairs(5)).toEqual(8);
    
    // 1,1,1,1,1
    // 2,1,1,1
    // 1,2,1,1
    // 1,1,2,1
    // 1,1,1,2
    // 2,2,1
    // 2,1,2
    // 1,2,2
  })
})