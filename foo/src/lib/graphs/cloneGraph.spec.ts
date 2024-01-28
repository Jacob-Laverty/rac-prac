import {Graph} from './cloneGraph';

describe('cloneGraph test', () => {
  it('should create a graph', () => {
    const testGraph: Graph = Graph.fromTestSeed();
    const testConnections = [[2,4],[1,3],[2,4],[1,3]]
    testGraph.createConnections(testConnections)
    expect(testGraph.connectionList).toEqual(testConnections)
  })

  it('should deep clone a graph', () => {
    const testGraph: Graph = Graph.fromTestSeed();
    const testConnections = [[2,4],[1,3],[2,4],[1,3]]
    testGraph.createConnections(testConnections)
    
    const clonedGraph: Graph = testGraph.deepClone();
    expect(testGraph.connectionList).toEqual(clonedGraph.connectionList)
  })
})