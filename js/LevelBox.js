import Game from './Game.js'

export default{
    props:['currentLevelTitle'],
    components:{
        Game,
    },
    template:`
    <div id='levelBox'>
            <h3> {{ currentLevelTitle }}</h3> 
    </div>
    `,
}