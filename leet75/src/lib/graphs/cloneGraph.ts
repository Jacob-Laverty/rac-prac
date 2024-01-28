
export class Graph {
  private nodeIndex: {[key: number]: GraphNode} = {}
  private rootNode: GraphNode

  private constructor(rootVal: number) {
    this.rootNode = new GraphNode(rootVal);
    this.nodeIndex[rootVal] = this.rootNode
  }
  
  public static fromTestSeed() {
    return new Graph(1);
  }
  
  public deepClone(): Graph {
    const clonedGraph: Graph = Graph.fromTestSeed();
    clonedGraph.createConnections(this.connectionList)
    return clonedGraph;
  }
  
  public createConnections(connectionList: number[][]): Graph {
    connectionList.forEach((connectedValues, index) => {
      const currentNode: GraphNode = this.getOrCreateNode(index+1)
      connectedValues.forEach((val: number) => {
        const connectedNode = this.getOrCreateNode(val)
        currentNode.connectNode(connectedNode)
      })
    })
    
    return this;
  }
  
  public get connectionList(): number[][] {
    return Object.keys(this.nodeIndex).reduce((acc, currVal, currIndex) => {
      const nodeAtIndex = this.getNode(currIndex+1)
      acc.push(nodeAtIndex.connectionList)
      return acc
    }, [])
  }
  
  private getNode(nodeVal): GraphNode {
    return this.nodeIndex[nodeVal] || undefined
  }
  
  private getOrCreateNode(nodeVal): GraphNode {
    if(!(nodeVal in this.nodeIndex)) {
      this.nodeIndex[nodeVal] = new GraphNode(nodeVal)
    }
    return this.nodeIndex[nodeVal]
  }
}

class GraphNode {
  private connections: GraphNode[] = []

  constructor(public readonly val: number) {}
  
  public connectNode(connectedNode: GraphNode) {
    this.connections.push(connectedNode)
  }
  
  public get connectionList(): number[] {
    return this.connections.map((node: GraphNode) => node.val)
  }
}