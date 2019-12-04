import Game from './Game.js'

export default{
    props:['diamondCount', 'totalAmountOfDiamonds'],
    components:{
        Game,
    },
    template:`
    <div id='diamondCounter'>
        <div class="headerImg">
            <img src="img/g.png"></div>
            <h3> {{ diamondCount }} / {{ totalAmountOfDiamonds }}</h3> 
    </div>
    `,
}