import Grid from './Grid.js'

export default{
    props:['currentLevelTitle'],
    components:{
        Grid,
    },
    template:`
    <div id='levelBox'>
            <h3> {{ currentLevelTitle }}</h3> 
    </div>
    `,
}