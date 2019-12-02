import Grid from './Grid.js'

export default{
    props:['diamondCount', 'totalAmountOfDiamonds'],
    components:{
        Grid,
    },
    template:`
    <div>
        <h3> {{ diamondCount }} / {{ totalAmountOfDiamonds }} </h3>
    </div>
    `,
}