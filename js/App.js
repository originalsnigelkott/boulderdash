import Game from './Game.js'
import Level from './Level.js'
//import Level1 from './Level1.js'
import Timer from './Timer.js'
import DiamondCounter from './DiamondCounter.js'
import LevelBox from './LevelBox.js'

export default{
    components: {
        Game,
        Timer,
        DiamondCounter,
        LevelBox
    },
    template: `
    <div id="app">

        <div id='gameInfoBox'> 
            <Timer 
            id='gameTimer'
            />

            <DiamondCounter 
            :diamondCount='diamondCount'
            :totalAmountOfDiamonds='totalAmountOfDiamonds'
            />

            <LevelBox
            :currentLevelTitle= 'currentLevelTitle'
            />
        </div>

        <Game 
        id="gridBox"        
        :level="level1"
        :size="size"

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
    </div>       
    `,
    data() {
        return {
            level1: new Level(),
            size: 0,
            playerPosition: {},
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            currentLevelTitle: ''
        }
    },
    created() {
        this.size = 20;        
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