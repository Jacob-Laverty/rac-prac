export function rank(input: string[]) {
  const teamVoteMap: {[key: string]: number[]} = {}

  for(let i = 0; i < input.length; i++) {
    const currentVote = input[i];
    for(let j = 0; j < currentVote.length; j++) {
      const team = input[i][j];
      if(!(team in teamVoteMap)) {
        teamVoteMap[team] = []
      }
      if(teamVoteMap[team][j]) {
        teamVoteMap[team][j] += 1
      } else {
        teamVoteMap[team][j] = 1
      }
    }
  }
  
  const sorted = [...Object.entries(teamVoteMap)].sort((zipped1, zipped2) => {
    const team1 = zipped1[0]
    const team2 = zipped2[0]
    
    const team1Counts = zipped1[1];
    const team2Counts = zipped2[1];
    
    for(let i = 0; i < team1Counts.length; i++) {
      const team1Vote = team1Counts[i] || 0
      const team2Vote = team2Counts[i] || 0
      if(team1Vote < team2Vote) {
        return 1
      } else if ( team1Vote > team2Vote ) {
        return -1
      }
    }
    
    return team1.localeCompare(team2);
  })
  return sorted.map((teamVoteArray) => {
    return teamVoteArray[0]
  }).join('')
}

