import Game from './Game.js'
import GameInfoControl from './GameInfoControl.js'

export default {
    components: {
        Game,
        GameInfoControl
    },
    template: `
    <div id="app">
        <GameInfoControl 
        :currentLevelTitle="currentLevelTitle"
        :totalAmountOfDiamonds="totalAmountOfDiamonds"
        :diamondCount="diamondCount"
        :treasureImg="treasureImg"
        :levelComplete='levelComplete'
        @startGame="startGame"
        @resetGame="resetGame"
        @outOfTime="outOfTime"

        />

        <Game 
        id="gridBox"
        @getDiamondCount='getDiamondCount'
        @totalAmountOfDiamonds='diamonds'
        @getTreasureImg='getTreasureImg'
        @currentLevelTitle='getLevelTitle'
        @resetTimerOnLevelComplete='resetTimerOnLevelComplete'
        :startGame="gameStarted"
        :resetGame="gameReset"
        :outOfTime="isTimeLimit"
        />
    </div>       
    `,
    data() {
        return {
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            treasureImg: './img/g.png',
            currentLevelTitle: '',
            gameStarted: Boolean,            
            gameOver: Boolean,
            gameReset: Boolean,
            isTimeLimit: Boolean,
            levelComplete: false,
        }
    },
    created() {
    },
    methods: {
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
        },
        getTreasureImg(treasureImg){
            this.treasureImg = treasureImg;
        },
        diamonds(totalAmountOfDiamonds) {
            this.totalAmountOfDiamonds = totalAmountOfDiamonds;
        },
        getLevelTitle(currentLevelTitle) {
            this.currentLevelTitle = currentLevelTitle;
        },
        startGame() {
            this.gameStarted = true;
        },
        resetGame() {
            this.gameReset = true;
        },
        outOfTime(){
            this.isTimeLimit = false;
        },
        resetTimerOnLevelComplete(){
            this.levelComplete = true;
        },
    },
}