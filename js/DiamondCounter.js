export default{
    props:['diamondCount', 'totalAmountOfDiamonds', 'treasureImg'],
    template:`
    <div id='diamondCounter'>
        <div class="headerImg">
            <img :src="treasureImg"></div>
            <h3> {{ diamondCount }} / {{ totalAmountOfDiamonds }}</h3> 
    </div>
    `,
}