import { twoSum } from './twoSum';

describe('twoSum test', () => {
  it('should solve example 1', () => {
    const input = [2,7,11,15]
    const target = 9;

    expect(twoSum(input, target)).toEqual([0, 1])
  });
  
  it('should solve example 2', () => {
    const input = [3,2,4,6]
    const target = 6;

    expect(twoSum(input, target)).toEqual([1, 2])
  });
  
  it('should solve example 3', () => {
    const input = [3,3]
    const target = 6;

    expect(twoSum(input, target)).toEqual([0, 1])
  });
})