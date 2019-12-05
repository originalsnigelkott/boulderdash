import Timer from './Timer.js'
import DiamondCounter from './DiamondCounter.js'
import LevelBox from './LevelBox.js'

export default{
    components: {
        Timer,
        DiamondCounter,
        LevelBox,
    },
    props: {
        currentLevelTitle: '',
        diamondCount: 0,
        totalAmountOfDiamonds: 0,
    },
    template: `
        <div id="gameInfoControl">
            <div id="gameInfoBox">
                <Timer 
                id='gameTimer'
                :gameStart="gameStart"
                />

                <DiamondCounter 
                :diamondCount='diamondCount'
                :totalAmountOfDiamonds='totalAmountOfDiamonds'
                />

                <LevelBox
                :currentLevelTitle= 'currentLevelTitle'
                />
            </div>
            <div id="gameControl">
                <button
                v-if='!gameStart'
                @click="startGame"
                >Start game
                </button>
                <button
                v-if='gameStart'
                @click="resetGame"
                >Reset game
                </button>
            </div>
        </div>
    `,
    data() {
        return{
            gameStart: false,
        }
    },
    methods: {
        startGame(){
            this.gameStart = true;
            console.log("Start game pressed");
        },
        resetGame(){
            this.gameStart = false;
            console.log("Reset game pressed");
        }
    },
}