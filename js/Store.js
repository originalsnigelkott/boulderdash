import GameOverLevel from './GameOverLevel.js'
import level1 from './Level1.js'
import level2 from './Level2.js'


const currentLevelNum = 1;

const maps = [
    level1.map,
    level2.map,
    GameOverLevel.map,
];

const currentLevel = {
    title: [level1.title, level2.title, GameOverLevel.title],
    mapSizeX: [level1.mapSizeX, level2.mapSizeX, GameOverLevel.mapSizeX],
    mapSizeY: [level1.mapSizeY, level2.mapSizeY, GameOverLevel.mapSizeY],
    playerPosition: [level1.playerPosition, level2.playerPosition],
    enemyPosition: [level1.enemyPosition, level2.enemyPosition],
    boulderPositions: [level1.boulderPositions, level2.boulderPositions]
};

export default {
    maps,
    currentLevel,
    currentLevelNum
}