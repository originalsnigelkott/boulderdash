import level1 from './Level1.js'
import level2 from './Level2.js'


const currentLevelNum = 1;

const maps = [
    level1.map,
    level2.map
];

const currentLevel = {
    title: [level1.title, level2.title],
    playerPosition: [level1.playerPosition, level2.playerPosition],
    enemyPosition: [level1.enemyPosition, level2.enemyPosition],
    boulderPositions: []
};

export default {
    maps,
    currentLevel,
    currentLevelNum
}