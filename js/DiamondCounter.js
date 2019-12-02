import Grid from './Grid.js'

export default{
    props:['diamondCount', 'totalAmountOfDiamonds'],
    components:{
        Grid,
    },
    template:`
    <div>
        <div class="headerImg"><img src="img/g.png"></div>
        <p> {{ diamondCount }} / {{ totalAmountOfDiamonds }}</p> 
    </div>
    `,
}