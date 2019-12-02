export default{
    props:['diamondCount', 'totalAmountOfDiamonds'],
    template:`
    <div>
        <p> {{ diamondCount }} / {{ totalAmountOfDiamonds }} </p>
    </div>
    `,
}