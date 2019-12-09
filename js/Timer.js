export default{
    template:`
        <div>
            <h3> {{timeLimit}} </h3>
            <h3 v-if='timeLimit == 0'> Out of time </h3>
        </div>
    `,
    props: {
        gameStart: Boolean,
        gameReset: Boolean,
        pauseTimer: Boolean,
        resetTimer: false,
    },
    data(){
        return{
            timeLimit: 45,
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
                this.$emit('generateTimeleftToPoints', this.timeLimit)
                clearTimeout(this.timer);
                this.timeLimit = 45;
                this.startTimer()
            }
        },
        pauseTimer(){
            if(this.pauseTimer){
                clearTimeout(this.timer);
            }
        }
    },
}