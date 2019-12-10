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
        :timerInAppStopped='timerInAppStopped'
        @startGame="startGame"
        @resetGame="resetGame"
        @outOfTime="outOfTime"
        @convertTimeToPoints='convertTimeToPoints'

        />

        <Game
        @getDiamondCount='getDiamondCount'
        @totalAmountOfDiamonds='diamonds'
        @getTreasureImg='getTreasureImg'
        @currentLevelTitle='getLevelTitle'
        @resetTimerOnLevelComplete='resetTimerOnLevelComplete'
        @playerPointsOnGameCompletion='playerPointsOnGameCompletion'
        @stopTimer='stopTimer'
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
            timerInAppStopped: Boolean,
            levelComplete: false,
            points: 0,
            amountOfDiamondsPicked: 0,
        }
    },
    created() {
    },
    methods: {
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
            this.amountOfDiamondsPicked += 1;
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
            this.timerInAppStopped = false;
        },
        outOfTime(){
            this.isTimeLimit = true;
        },
        resetTimerOnLevelComplete(){
            this.levelComplete = true;
        },
        stopTimer(){
            this.timerInAppStopped = true;
        },
        playerPointsOnGameCompletion(){
            alert('Congratulations you got '+ this.amountOfDiamondsPicked + 'diamonds!')
            alert('Congratulations you got '+ this.points + 'seconds left!')
        },
        convertTimeToPoints(timeLeft){
            console.log('a')
            this.points += timeLeft;
        },
    }
}