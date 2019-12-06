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
        />

        <Game 
        id="gridBox"
        @getDiamondCount='getDiamondCount'
        @totalAmountOfDiamonds='diamonds'
        @currentLevelTitle='getLevelTitle'
        :startGame="gameStarted"
        />

        <div 
        id='highScoreBox'
        >       
        <div id="gallery">
            <div class="styleinfo">
                <span class="">key: d</span>
                <div class="imgbox">                
                    <img src="/img/style_default.jpg" />
                </div>
            </div>
                <div class="styleinfo">
                <span class="">key: e</span>
                <div class="imgbox">                
                    <img src="/img/style_frozen.jpg" />
                </div>
            </div>
        </div>     
        </div>
    </div>       
    `,
    data() {
        return {
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            currentLevelTitle: '',
            gameStarted: Boolean,
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
        },
    }
}