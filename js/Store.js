import GameOverLevel from './GameOverLevel.js'
import level0 from './Level0.js'
import level1 from './Level1.js'
import level2 from './Level2.js'
import WinLevel from './WinLevel.js'


const currentLevelNum = 1;

const levels = [
    level0,
    level1,
    level2,
    GameOverLevel,
    WinLevel,
]

export default {
    //maps,
    //currentLevel,
    currentLevelNum,
    levels,
}