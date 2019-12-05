import Game from './Game.js'
import GameInfoControl from './GameInfoControl.js'

export default{
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
        />

        <Game 
        id="gridBox"
        @getDiamondCount='getDiamondCount'
        @totalAmountOfDiamonds='diamonds'
        @currentLevelTitle='getLevelTitle'
        />

        <div 
        id='highScoreBox'
        >
            Highscores etc<br><br>
            Change style (e key: Frozen, d key: Default)
        </div>
    </div>       
    `,
    data() {
        return {
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            currentLevelTitle: ''
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
        getLevelTitle(currentLevelTitle){
            this.currentLevelTitle = currentLevelTitle;
        }
    }
}