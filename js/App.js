import Grid from './Grid.js'
import Level1 from './Level1.js'

export default{
    components: {
        Grid,
    },
    template: `
    <div id="app">
        <h1>Boulder dash</h1>
        <grid 
        :level="level1"
        :size="size"
        />
    </div>        
    `,
    data() {
        return {
            level1: new Level1(),
            size: 0,
        }
    },
    created() {
        this.size = this.level1.map.length;
    }
}
