import Grid from './Grid.js'
import Level1 from './Level1.js'

export default{
    components: {
        Grid,
    },
    template: `
    <div id="app">

<div id='gameInfoBox'> 
Timer points etc 
</div>

<Grid 
id="gridBox"        
:level="level1"
:size="size"
@getDiamondCount='getDiamondCount'
/>

<div 
id='highScoreBox'>
Highscores etc
{{ diamondCount }}
</div>
</div>       
    `,
    data() {
        return {
            level1: new Level1(),
            size: 0,
            playerPosition: {},
            diamondCount: 0,
        }
    },
    created() {
        this.size = this.level1.map.length;
    },
    methods: {
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
        }
    }
}
