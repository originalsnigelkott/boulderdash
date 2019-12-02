export default{
    props:['diamondCount', 'totalAmountOfDiamonds'],
    template:`
    <div>
        <p> {{ diamondCount }} / {{ totalAmountOfDiamonds }}</p> 
        <div class="headerImg"><img src="img/g.png"></div>
    </div>
    `,
}