enum EDirections {
  MOVE_UP = "U",
  MOVE_DOWN = "D",
  MOVE_LEFT = "L",
  MOVE_RIGHT = "R"
}

type Directions = `${EDirections}`

export class SnakeGame {
  private board: SnakeBoard;
  private snake: Snake = new Snake();
  private spawnedFoodIndex = 0;
  private scoreArray = [undefined]
  private currentHighScore = 0;

  constructor(boardHeight: number, boardWidth: number, private deterministicFoodArray: Array<[number, number]>) {
    this.board = new SnakeBoard(boardHeight, boardWidth);
  }
  
  public playGame(directionArray: Directions[]) {
    for(let i=0; i < directionArray.length; i++) {
      const returnedScore = this.moveSnake(directionArray[i]);
      if(this.scoreArray.length > 1 && returnedScore < 0) {
        return this.scoreArray
      }
    }
    return this.scoreArray;
  }
  
  private moveSnake(direction: Directions) {
    this.snake.moveHead(direction);
    
    this.checkWalls();
    // end if we hit a wall
    if(this.scoreArray.at(-1) < 0) {
      return this.scoreArray.at(-1)
    }

    this.checkFood();
    
    this.checkSnakeCollisions();
    // end if hit a body
    if(this.scoreArray.at(-1) < 0) {
      return this.scoreArray.at(-1)
    } else {
      this.scoreArray.push(this.currentHighScore);
      return this.scoreArray.at(-1)
    }
  }
  
  private checkWalls() {
    if(this.board.nodeOutOfBounds(this.snake.headCoords)) {
      this.endGame();
    }
  }
  
  private get spawnedFood(): [number, number] {
    return this.deterministicFoodArray[this.spawnedFoodIndex];
  }
  
  private spawnNextFood() {
    this.spawnedFoodIndex++;
  }
  
  private checkFood() {
    // They gave the food in Y,X coordinates....
    if(!this.spawnedFood) {
      this.snake.moveBody();
    }
    if(this.snake.headCoords[0] === this.spawnedFood[1] && this.snake.headCoords[1] === this.spawnedFood[0]) {
      this.incrementScore();
      this.spawnNextFood();
    } else {
      this.snake.moveBody();
    }
  }
  
  private checkSnakeCollisions() {
    if(this.snake.hasCollided()) {
      this.endGame();
    }
  }
  
  private incrementScore() {
    this.currentHighScore++;
  }
  
  private endGame() {
    this.scoreArray.push(-1)
    return this.scoreArray;
  }
}

class SnakeBoard {
  constructor(private height, private width) {}
  
  public nodeOutOfBounds(nodeCoordinate: [number, number]) {
    if(nodeCoordinate[0] < 0 || nodeCoordinate[0] > this.width) {
      return true
    }
    if(nodeCoordinate[1] < 0 || nodeCoordinate[1] > this.height) {
      return true
    }
    return false;
  }
}

class Snake {
  private snakeHead: SnakeNode;

  constructor() {
    this.snakeHead = new SnakeNode(0,0);
  }
  
  public moveHead(direction: Directions) {
    switch(direction) {
      case EDirections.MOVE_UP: {
        this.moveUp()
        break;
      }
      case EDirections.MOVE_DOWN: {
        this.moveDown()
        break;
      }
      case EDirections.MOVE_LEFT: {
        this.moveLeft()
        break;
      }
      case EDirections.MOVE_RIGHT: {
        this.moveRight()
        break;
      }
      default: {
        console.error("We exist in a 2D plane")
        throw new Error("3D movement Error")
      }
    }
  }
  
  // This is just popping the tail
  public moveBody() {
    let curr = this.snakeHead
    while(curr.nextNode.nextNode) {
      curr = curr.nextNode
    }
    curr.setNextNode(undefined);
  }
  
  public hasCollided(): boolean {
    let curr = this.snakeHead.nextNode;
    while(curr) {
      if(curr.xCoordinate === this.snakeHead.xCoordinate && curr.yCoordinate === this.snakeHead.yCoordinate) {
        return true
      }
      curr = curr.nextNode;
    }
    return false
  }
  
  private moveUp() {
    this.moveCore(this.headCoords[0], this.headCoords[1]-1)
  }
  private moveDown() {
    this.moveCore(this.headCoords[0], this.headCoords[1]+1)
  }
  private moveLeft() {
    this.moveCore(this.headCoords[0]-1, this.headCoords[1])
  }
  private moveRight() {
    this.moveCore(this.headCoords[0]+1, this.headCoords[1])
  }
  
  private moveCore(newHeadX, newHeadY) {
    const prevHeadNode = this.snakeHead;
    this.snakeHead = new SnakeNode(newHeadX, newHeadY)  
    this.snakeHead.setNextNode(prevHeadNode);
  }
  
  public get headCoords(): [number, number] {
    return [this.snakeHead.xCoordinate, this.snakeHead.yCoordinate]
  }
}

class SnakeNode {
  private nextSnakeNode: SnakeNode = undefined;

  constructor(private nodeX: number, private nodeY: number) {}
  
  public move(newCoordinate: [number, number]) {
    this.nodeX = newCoordinate[0];
    this.nodeY = newCoordinate[1];
  }
  
  public setNextNode(snakeNode: SnakeNode) {
    this.nextSnakeNode = snakeNode;
  }
  
  public get nextNode() {
    return this.nextSnakeNode;
  }
  
  public get xCoordinate() {
    return this.nodeX;
  }

  public get yCoordinate() {
    return this.nodeY;
  }
}