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
        @startGame="startGame"
        @resetGame="resetGame"
        @outOfTime="outOfTime"
        />

        <Game 
        id="gridBox"
        @getDiamondCount='getDiamondCount'
        @totalAmountOfDiamonds='diamonds'
        @currentLevelTitle='getLevelTitle'
        :startGame="gameStarted"
        :gameOver="gameOver"
        />
    </div>       
    `,
    data() {
        return {
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            currentLevelTitle: '',
            gameStarted: Boolean,
            gameOver: Boolean,
        }
    },
    created() {
    },
    methods: {
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
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
            this.gameStarted = false;
            this.gameOver = false;
        },
        outOfTime(){
            this.gameOver = true;
        },
    }
}