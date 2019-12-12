export default{
    props:['diamondCount', 'totalAmountOfDiamonds', 'treasureImg'],
    template:`
    <div id='diamondCounter' class="container">
        <div class="headerImg container">
            <img :src="treasureImg">
        </div>
            <h3> {{ diamondCount }} / {{ totalAmountOfDiamonds }}</h3> 
    </div>
    `,
}