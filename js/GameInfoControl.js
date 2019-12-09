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
        treasureImg: '',
        levelComplete: Boolean,
    },
    template: `
        <div id="gameInfoControl">
            <div id="gameInfoBox">
                <Timer 
                id='gameTimer'
                :gameStart="gameStart"
                :gameReset="gameReset"
                :resetTimer='resetTimer'
                @outOfTime="outOfTime"
                />

                <DiamondCounter 
                :diamondCount='diamondCount'
                :totalAmountOfDiamonds='totalAmountOfDiamonds'
                :treasureImg='treasureImg'
                />

                <LevelBox
                :currentLevelTitle= 'currentLevelTitle'
                />
                <div id="gameControl">
                <button
                id='startGameButton'
                v-if='!gameStart'
                @click="startGame"
                >Start game
                </button>
                <button
                id='resetGameButton'
                v-if='gameStart'
                @click="resetGame"
                >Reset game
                </button>
            </div>
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
            this.$emit('startGame')
        },
        resetGame(){
            this.gameReset = true;
            console.log("Reset game pressed");
            this.$emit('resetGame')
        },
        setKeyHandler(e) {            
            window.addEventListener("keydown", this.keyHandler);
        },
        keyHandler(e) {
            if(e.keyCode === 13){ 
                this.startGame();               
            }
        },
        outOfTime(){
            this.$emit('outOfTime')
        },
        resetTimerAfterLevelComplete(){
            console.log('Timer reset')
            this.resetTimer = true;
        }
    },
    watch:{
        levelComplete(){
            if(this.levelComplete){
                this.resetTimer = true;
            }
        }
    },
    created() {
        this.setKeyHandler() 
    }
}