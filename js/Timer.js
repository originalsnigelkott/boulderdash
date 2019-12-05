export default{
    template:`
        <div>
            <h3> {{timeLimit}} </h3>
        </div>
    `,
    props: {
        gameStart: Boolean,
    },
    data(){
        return{
            timeLimit: 45,
        }
    },
    methods:{
        startTimer(){
            if(this.gameStart && this.timeLimit != 0) {
                setTimeout(() => {
                    this.timeLimit -= 1
                    this.startTimer()
                }, 1000)
            }
        }, 
    },
    watch: {
        gameStart() {
            this.startTimer()
        }
    }
}