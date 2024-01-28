
export function climbStairs(staircaseSize: number) {
  const origins = {0: 1};
  return findOrigins(staircaseSize-2, origins) + findOrigins(staircaseSize-1, origins) 
}

function findOrigins(currentStep, origins) {
  if(currentStep < 0) {
    return 0
  }
  if(currentStep in origins) {
    return origins[currentStep]
  } else {
    return origins[currentStep] = findOrigins(currentStep-2, origins) + findOrigins(currentStep-1, origins);;
  }
}
