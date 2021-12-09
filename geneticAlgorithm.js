// taken from The Coding Train

function nextGeneration() {
  console.log(`Generation, ${gen}, max score, ${maxScore}`);
  gen++;
  maxScore=0;
  calculateFitness();
  for (let i = 0; i < TOT; i++) {
    /**
     * uncomment each line to try a different algorithm for producing the next generation
     */

    // bots[i] = pickOne();
    // bots[i] = breedBest2();
    bots[i] = breedBest1();
  }
  for (let i = 0; i < TOT; i++) {
    savedBots[i].dispose();
  }
  savedBots = [];
}

function pickOne() {
  let index = 0;
  let r = random(1); 
  while (r > 0) {
    r = r - savedBots[index].fitness;
    index++;
  }
  index--;
  let bot = savedBots[index];
  let child = new Bot(bot.brain);
  child.mutate();
  return child;
}

function breedBest1() {
  let parent1 = pickOne();
  let parent2 = pickOne();

  // create a new bot by breeding the brain of the parents
  let child = new Bot(parent1.brain.crossOver(parent2.brain));
  child.mutate();
  return child;
}

function breedBest2() {
  // take the top 30% of the bots by their score using lodash
  let topBots = _.orderBy(savedBots, ['score'], ['desc']);
  let topBots30 = _.take(topBots, TOT * 0.3);
  // pick one from the top 30%
  let parent1 = random(topBots30);
  let parent2 = random(topBots30);
  // create a new bot by breeding the brain of the parents
  let child = new Bot(parent1.brain.crossOver(parent2.brain));
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bot of savedBots) {
    sum += bot.score;
  }
  for (let bot of savedBots) {
    bot.fitness = bot.score / sum;
  }
}
