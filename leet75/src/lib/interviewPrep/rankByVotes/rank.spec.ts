import {rank} from './voteRanker';

describe('rank test', () => {
  it('should rank', () => {
    const input = ["ABC", "ACB", "ABC", "ACB", "ACB"]
    expect(rank(input)).toEqual("ACB");
  })
  
  it('should break ties', () => {
    const input = ["WXYZ","XYZW"];
    expect(rank(input)).toEqual("XWYZ")
  })
})