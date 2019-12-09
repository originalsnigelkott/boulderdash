export default{
    template:`
        <div>
            <h3 v-if='timeLimit == 45'> Ready </h3>
            <h3 v-if='timeLimit < 45 && timeLimit != 0'> {{timeLimit}} </h3>
            <h3 v-if='timeLimit == 0'> Out of time </h3>
        </div>
    `,
    props: {
        gameStart: Boolean,
        gameReset: Boolean,
        resetTimer: false,
    },
    data(){
        return{
            timeLimit: 45,
            timer: null,
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
        resetTimerOnLevelComplete(){
            this.$emit('generateTimeleftToPoints', this.timeLimit)
            console.log('Timer say hi')
            clearTimeout(this.timer);
            console.log('points')
            this.timeLimit = 45;
            this.startTimer()
        },
    },
    watch: {
        gameStart() {
            if (this.gameStart) {
                this.startTimer()
            } else {
                clearTimeout(this.timer);
                this.timeLimit = 45;
            }
        },
        gameReset(){
            clearTimeout(this.timer);
            this.timeLimit = 45;
            this.startTimer()
        },
        timeLimit() {
            if(this.timeLimit === 0) {
                this.$emit('outOfTime')
            }
        },
        resetTimer(){
            if(this.resetTimer){
                this.resetTimerOnLevelComplete();
            }
        }
    },
}