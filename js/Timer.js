export default{
    template:`
        <div id='gameTimer'>
            <h3 v-if='timeLimit == 65'> Ready </h3>
            <h3 v-if='timeLimit < 65 && timeLimit != 0'> {{timeLimit}} </h3>
            <h3 v-if='timeLimit == 0'> Out of time </h3>
        </div>
    `,
    props: {
        gameStart: Boolean,
        gameReset: Boolean,
        timerInGameControlStopped: Boolean,
        resetTimer: false,
    },
    data(){
        return{
            timeLimit: 65,
            timer: null,
            timeLeftAfterLevel: 0,
        }
    },
    methods:{
        //Starts the timer
        startTimer(){
            if(this.gameStart && this.timeLimit !== 0) {
                this.timer = setTimeout(() => {
                    this.timeLimit--;
                    this.startTimer();
                }, 1000) // 1000ms = 1 second
            }
        }, 
    },
    watch: {
        //If gameStart is true, trigger startTimer()
        gameStart() {
            if (this.gameStart) {
                this.startTimer()
            } else {
                clearTimeout(this.timer);
                this.timeLimit = 65;
            }
        },
        //Resets the timer and clears the timeOut-function in gameStart()
        gameReset(){
            clearTimeout(this.timer);
            this.timeLimit = 65;
            this.startTimer()
        },
        //Ends the game upon the timer hitting 0
        timeLimit() {
            if(this.timeLimit === 0) {
                this.$emit('outOfTime')
            }
        },
        //Stopps the timer if the game is over
        timerInGameControlStopped(){
            if(this.timerInGameControlStopped){
                this.$emit('generateTimeleftToPoints', this.timeLimit)
                clearTimeout(this.timer);
            }
        }
    },
}