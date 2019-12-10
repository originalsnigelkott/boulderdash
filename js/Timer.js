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
        startTimer(){
            if(this.gameStart && this.timeLimit !== 0) {
                this.timer = setTimeout(() => {
                    this.timeLimit--;
                    this.startTimer();
                }, 1000)
            }
        }, 
    },
    watch: {
        gameStart() {
            if (this.gameStart) {
                this.startTimer()
            } else {
                clearTimeout(this.timer);
                this.timeLimit = 65;
            }
        },
        gameReset(){
            clearTimeout(this.timer);
            this.timeLimit = 65;
            this.startTimer()
        },
        timeLimit() {
            if(this.timeLimit === 0) {
                this.$emit('outOfTime')
            }
        },
        /*resetTimer(){
            if(this.resetTimer){
                this.$emit('generateTimeleftToPoints', this.timeLimit)
                clearTimeout(this.timer);
                this.timeLimit = 45;
                this.startTimer()
            }
        },*/
        timerInGameControlStopped(){
            if(this.timerInGameControlStopped){
                this.$emit('generateTimeleftToPoints', this.timeLimit)
                clearTimeout(this.timer);
            }
        }
    },
}