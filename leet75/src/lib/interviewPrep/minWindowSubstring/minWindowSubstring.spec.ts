import {SubStringWindow} from './minWindowSubstring'

describe('min window substring', () => {
  it('should find the min window', () => {
    const s = "ADOBECODEBANC"
    const t = "ABC"
    const w = new SubStringWindow(s, t);
    expect(w.findMinWindowSubstring()).toEqual("BANC")
  })
  
  it('should handle a full string', () => {
    const s = "A"
    const t = "A"
    const w = new SubStringWindow(s, t);
    expect(w.findMinWindowSubstring()).toEqual("A")
  })
  
  it('should handle a non 1 target', () => {
    const s = "A"
    const t = "AA"
    const w = new SubStringWindow(s, t);
    expect(w.findMinWindowSubstring()).toEqual("")
  })
})