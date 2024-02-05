interface CharWindowTarget {
  targetValue: number
  currentWindowValue: number
}

interface CharWindow {
  [key: string]: CharWindowTarget
}


export class SubStringWindow {
  private leftWindowIndex = 0;
  private rightWindowIndex = -1;
  private subStringCharWindow: CharWindow;
  private minimumSubString = undefined;

  constructor(private testString: string, private subString: string) {
    this.subStringCharWindow = this.initSubStringCharWindow(subString)
  }
  
  public findMinWindowSubstring() {
    while(this.rightWindowIndex !== this.testString.length) {
      this.slideWindow()
      this.shrinkWindow();
    }
    
    return this.minimumSubString ? this.minimumSubString : ""
  }
  
  private initSubStringCharWindow(subString: string): CharWindow {
    const charWindow: CharWindow = {};
    [...subString].forEach((char: string) => {
      if(char in charWindow) {
        charWindow[char].targetValue++;
      } else {
        charWindow[char] = {
          targetValue: 1,
          currentWindowValue: 0
        }
      }
    })
    
    return charWindow
  }
  
  // Moves the Window to the right until all characters are contained in the window
  private slideWindow() {
    this.rightWindowIndex+=1;
    for(this.rightWindowIndex; this.rightWindowIndex < this.testString.length; this.rightWindowIndex++) {
      const charAtRightWindow = this.testString[this.rightWindowIndex];
      if(charAtRightWindow in this.subStringCharWindow) {
        this.subStringCharWindow[charAtRightWindow].currentWindowValue++;
      }

      if(Object.values(this.subStringCharWindow).every((v: CharWindowTarget) => v.currentWindowValue >= v.targetValue)) {
        break;
      }
    }
  }
  
  private shrinkWindow() {
    while(Object.values(this.subStringCharWindow).every((v: CharWindowTarget) => v.currentWindowValue >= v.targetValue)) {
      const charAtLeftWindow = this.testString[this.leftWindowIndex];
      if(charAtLeftWindow in this.subStringCharWindow) {
        this.subStringCharWindow[charAtLeftWindow].currentWindowValue--
      }
      this.setMinSubString(this.leftWindowIndex, this.rightWindowIndex);
      this.leftWindowIndex++;
    }
  }
  
  private setMinSubString(leftWindow: number, rightWindow: number) {
    const potentialSubstring = this.testString.slice(leftWindow, rightWindow+1)
    if(this.minimumSubString) {
      this.minimumSubString = potentialSubstring.length < this.minimumSubString.length ? potentialSubstring : this.minimumSubString
    } else {
      this.minimumSubString = potentialSubstring
    }
  }
}
