import Tile from './Tile.js'

export default{
    components: {
        Tile,
    },
    props: {
        level: Object,
        size: Number,
    },
    template: `
    <div class="grid">
      <img
        v-for="(tile, i) in flatTiles"
        :key="'tile' + i + tile.position.x + tile.position.y"
        class="tile" 
        :src="tilePicture(tile.tileState)">
    </div>
    `,
    data() {
        return {
            tiles: [],
        }
    },
    methods: {
        fillTiles() {
            for(let row = 0; row < this.size; row++){
                this.tiles[row] = [];
                for(let col = 0; col < this.size; col++){
                    this.tiles[row].push(new Tile(this.level.map[row] [col], row, col))
                }
                this.tiles.push(this.tiles[row]);
            }
        },
        tilePicture(tileState){
            let pictureLocation = "img/" + tileState + ".png";
            return pictureLocation;
        }
    },
    computed: {
        flatTiles() {
            return this.tiles.flat();
        }
    },
    created() {
        this.fillTiles();
    }
}