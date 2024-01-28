export function sumOfTwoInts(a: number, b: number) {
  
  let carry = a&b
  let result = a^b

  while(carry != 0) {
    const shift = carry<<1
    carry = result & shift
    result = result^shift
  }
  
  return result;
}