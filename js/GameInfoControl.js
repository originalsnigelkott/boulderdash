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
        timerInAppStopped: false,
        playerWon: false
    },
    template: `
        <div id="gameInfoControl">
            <div id="gameInfoBox">
                <Timer 
                :gameStart="gameStart"
                :resetTimer='resetTimer'
                :timerInGameControlStopped='timerInGameControlStopped'
                @outOfTime="outOfTime"
                @generateTimeleftToPoints='generateTimeleftToPoints'
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
                <div id='scoreOutput'>
                    <p> Highest score {{ this.highestScore}} </p>
                    <p v-if='score != 0'> Your score: {{this.score}} </p>
                 </div> 
    </div>
    `,
    data() {
        return{
            gameStart: false,
            gameOver: false,
            resetTimer: false,
            timerInGameControlStopped: false,
            resetTimerOnLevelComplete: Boolean,
            score: 0,
            highestScore: 0,
        }
    },
    methods: {        
        startGame(){
            this.gameStart = true;
            this.resetTimer = false;
            this.timerInGameControlStopped = false;
            console.log("Start game pressed");
            this.$emit('startGame')
        },
        resetGame(){
            this.gameStart = false;
            this.score = 0;
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
            this.gameOver = true;
            this.$emit('outOfTime')
        },
        resetTimerAfterLevelComplete(){
            console.log('Timer reset')
            this.resetTimer = true;
        },
        generateTimeleftToPoints(timeLeft){
            if(this.playerWon){
                this.score = timeLeft*5
                if(this.score > this.highestScore){
                    this.highestScore = this.score
                }
            }
        },
    },
    watch:{
        levelComplete(){
            if(this.levelComplete){
                this.resetTimer = true;
            }
        },
        timerInAppStopped(){
            if(this.timerInAppStopped){
                this.timerInGameControlStopped = true
            }
        }
    },
    created() {
        this.setKeyHandler() 
    }
}