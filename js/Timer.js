export default{
    template:`
        <div @click='startTimer'>
            <h3 v-if='timeLimit != 0'> {{timeLimit}} </h3>
            <h6 v-else> Game over </h6>
        </div>
    `,
    data(){
        return{
            timeLimit: 45,
        }
    },
    methods:{
        startTimer(){
            if(this.timeLimit != 0) {
                setTimeout(() => {
                    this.timeLimit -= 1
                    this.startTimer()
                }, 1000)
            }
        }, 
    },
}