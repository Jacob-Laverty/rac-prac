/**
 * Two Sum Problem
 * 
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
*/

export function twoSum(input: number[], target: number): number[] {
  const pairMap = {};   
  
  for( const [index, value] of input.entries()) {
    const pair = target - value;

    // If we've entered an entry for our pair then return the two pairs
    if(pair in pairMap) {
      return [pairMap[pair], index]
    } else {
      pairMap[value] = index;
    }
  }
}
