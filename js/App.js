import Grid from './Grid.js'

export default{
    components: {
        Grid,
    },
    template: `
    <div id="app">
        <h1>Boulder dash</h1>
        <grid 
        :size="size"
        />
    </div>        
    `,
    data() {
        return {
            size: 3,
        }
    },
}
