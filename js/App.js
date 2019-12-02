import Grid from './Grid.js'
import Level1 from './Level1.js'
import Timer from './Timer.js'
import DiamondCounter from './DiamondCounter.js'

export default{
    components: {
        Grid,
        Timer,
        DiamondCounter,
    },
    template: `
    <div id="app">

<div id='gameInfoBox'> 
    <Timer 
    id='gameTimer'
    ></Timer>

    <DiamondCounter 
    id='diamondCounter'
    :diamondCount='diamondCount'
    :totalAmountOfDiamonds='totalAmountOfDiamonds'/>
</div>

<Grid 
id="gridBox"        
:level="level1"
:size="size"
@getDiamondCount='getDiamondCount'
@totalAmountOfDiamonds='diamonds'
/>

<div 
id='highScoreBox'>
Highscores etc<br>
</div>
</div>       
    `,
    data() {
        return {
            level1: new Level1(),
            size: 0,
            playerPosition: {},
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
        }
    },
    created() {
        this.size = this.level1.map.length;
    },
    methods: {
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
        },
        diamonds(totalAmountOfDiamonds) {
            this.totalAmountOfDiamonds = totalAmountOfDiamonds;
        },
    }
}