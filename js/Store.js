import GameOverLevel from './GameOverLevel.js'
import level0 from './Level0.js'
import level1 from './Level1.js'
import level2 from './Level2.js'


const currentLevelNum = 1;

const maps = [
    level0.map,
    level1.map,
    level2.map,
    GameOverLevel.map,
];

const currentLevel = {
    title: [level0.title, level1.title, level2.title, GameOverLevel.title],
    mapSizeX: [level0.mapSizeX, level1.mapSizeX, level2.mapSizeX, GameOverLevel.mapSizeX],
    mapSizeY: [level0.mapSizeY, level1.mapSizeY, level2.mapSizeY, GameOverLevel.mapSizeY],
    playerPosition: [level0.playerPosition, level1.playerPosition, level2.playerPosition],
    enemyPosition: [level0.enemyPosition, level1.enemyPosition, level2.enemyPosition],
    diamondPositions: [level0.diamondPositions, level1.diamondPositions, level2.diamondPositions],
    boulderPositions: [level0.boulderPositions, level1.boulderPositions, level2.boulderPositions],
    style: [level0.style, level1.style, level2.style],
};

export default {
    maps,
    currentLevel,
    currentLevelNum
}