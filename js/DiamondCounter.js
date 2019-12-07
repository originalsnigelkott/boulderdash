export default{
    props:['diamondCount', 'totalAmountOfDiamonds'],
    template:`
    <div id='diamondCounter'>
        <div class="headerImg">
            <img src="img/g.png"></div>
            <h3> {{ diamondCount }} / {{ totalAmountOfDiamonds }}</h3> 
    </div>
    `,
}