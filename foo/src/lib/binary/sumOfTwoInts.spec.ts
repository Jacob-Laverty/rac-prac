import {sumOfTwoInts} from './sumOfTwoInts'

describe('sumOfTwoInts', () => {
  it('should solve example 1', () => {
    expect(sumOfTwoInts(1,2)).toEqual(3)
  })
  
  it('should solve example 2', () => {
    expect(sumOfTwoInts(2,3)).toEqual(5)
  })
})