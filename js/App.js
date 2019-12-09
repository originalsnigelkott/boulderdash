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
        @generateTimeleftToPoints='generateTimeleftToPoints'

        />

        <Game 
        id="gridBox"
        @getDiamondCount='getDiamondCount'
        @totalAmountOfDiamonds='diamonds'
        @getTreasureImg='getTreasureImg'
        @currentLevelTitle='getLevelTitle'
        @resetTimerOnLevelComplete='resetTimerOnLevelComplete'
        @playerPointsOnGameCompletion='playerPointsOnGameCompletion'
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
            points: 0,
        }
    },
    created() {
    },
    methods: {
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
            this.points += 1;
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
            this.gameReset = false;
            this.gameStarted = true;
            this.levelComplete = false;
        },
        resetGame() {
            this.isTimeLimit = false;
            this.gameStarted = false;
            this.gameReset = true;
        },
        outOfTime(){
            this.isTimeLimit = true;
        },
        resetTimerOnLevelComplete(){
            this.levelComplete = true;
        },
        playerPointsOnGameCompletion(){
            alert('Congratulations you got '+ this.points + 'points!')
        },
        generateTimeleftToPoints(timeLeft){
            this.points += timeLeft;
        }
    }
}