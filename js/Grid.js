import Tile from './Tile.js'

export default{
    components: {
        Tile,
    },
    props: {
        size: Number,
    },
    template: `
    <div class="grid">
      <div :id="tileId(tile.position.x,tile.position.y)"
        v-for="(tile, i) in flatTiles"
        :key="'tile' + i + tile.position.x + tile.position.y"
        class="tile" >
        <img  :src="tilePicture(tile.tileState)">
        </div>
    </div>
    `,
    data() {
        return {
            playerPosition: [7,3], //x,y
            boulderPositions: [
                [6,2],
                [7,2],
            ],
            tiles: [],
            diamondCount: 0,
            map1:[
                ['W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'G' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W', 'W' ,'W' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'G' ,'D' ,'D' ,'D' ,'D' ,'D' ,'G' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'G' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'G' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W', 'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'D' ,'W'],
                ['W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W' ,'W'],

            ]
        }
    },
    methods: {
        keyHandler(e) {
            /**
              37 - left
              39 - right
              38 - up
              40 - down
             */
            if (e.keyCode === 37) {
                this.handleKeyLeft(e);
            } else if (e.keyCode === 39) {
                this.handleKeyRight(e);
            }else if (e.keyCode === 38) {
              this.handleKeyUp(e);
            } else if (e.keyCode === 40) {
              this.handleKeyDown(e);
            }
        },
        handleKeyUp(e) {
            //canMoveTo - true -> move y-1
            if(this.canMoveTo(this.playerPosition[0],this.playerPosition[1]-1) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Up: not possible');
            }
            
            // map1 update
            // refresh
            
        },
        handleKeyDown(e){
            //canMoveTo - true -> move y+1
            if(this.canMoveTo(this.playerPosition[0],this.playerPosition[1]+1) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Down: not possible');
            }    
        },
        handleKeyLeft(e){
            //canMoveTo - true -> move x-1
            if(this.canMoveTo(this.playerPosition[0]-1,this.playerPosition[1]) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Left: not possible');
            }    
        },
        handleKeyRight(e){
            //canMoveTo - true -> move x+1
            if(this.canMoveTo(this.playerPosition[0]+1,this.playerPosition[1]) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Right: not possible');
            }    
        },
        canMoveTo(x,y){
            //inside the map
            if(x < 0 ||x > this.size || y < 0 || y >= this.size){
                return false;
            }
            //you can only go down the road
            if(this.map1[y][x] !== 'D' && this.map1[y][x] !== 'X' && this.map1[y][x] !== 'G'){
                console.log(this.map1[y][x]);
                return false;
            }
            return true;
        },
        playerMove(e){
            this.map1[this.playerPosition[1]][this.playerPosition[0]] = 'X';
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='X';
            //changeDivContent(this.playerPosition[0],this.playerPosition[1]);
            if(e.keyCode === 37){
                //moveLeft x-1
                this.playerPosition[0]=this.playerPosition[0]-1;
            }
            else if(e.keyCode === 39){
            //moveRight x+1
                this.playerPosition[0]=this.playerPosition[0]+1;
            }          
            else if(e.keyCode === 38){
            //moveUp y-1'
                this.playerPosition[1]=this.playerPosition[1]-1;
            }else if(e.keyCode === 40){
            //moveDown y+1
                this.playerPosition[1]=this.playerPosition[1]+1;
            }            
            if(this.map1[this.playerPosition[1]][this.playerPosition[0]] == 'G'){
                this.diamondCount+=1;
                this.$emit('getDiamondCount', this.diamondCount);
                console.log('Diamond: '+this.diamondCount);
            }
            //new position on the map            
            this.map1[this.playerPosition[1]][this.playerPosition[0]] = 'P';
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='P';
            this.$forceUpdate();
        },
        randomMove(x,y){
            //canMoveTo
            //Move
        },
        fillTiles() {
            for(let row = 0; row < this.size; row++){
                this.tiles[row] = [];
                for(let col = 0; col < this.size; col++){
                    if( this.map1[row][col] === 'D'){
                        this.tiles[row].push(new Tile('d', row, col, false))
                    }else if(this.map1[row][col] === 'P'){
                        this.tiles[row].push(new Tile('p', row, col, false))
                    }else if(this.map1[row][col] === 'W'){
                        this.tiles[row].push(new Tile('w', row, col, false))
                    }else if(this.map1[row][col] === 'G'){
                        this.tiles[row].push(new Tile('g', row, col, false))
                    }else if(this.map1[row][col] === 'B'){
                        this.tiles[row].push(new Tile('b', row, col, false))
                    }else if(this.map1[row][col] === 'X'){
                        this.tiles[row].push(new Tile('x', row, col, false))
                    }else if(this.map1[row][col] === 'E'){
                        this.tiles[row].push(new Tile('e', row, col, false))
                    }
                }
            }
        },
        tilePicture(tileState){
            let pictureLocation = "img/" + tileState + ".png";
            return pictureLocation;
        },
        tileId(tilesRow, tilesCol){
            let tileId ='x'+tilesCol+'y'+tilesRow;
            return tileId;
        },
        setKeyHandler(e) {            
            window.addEventListener("keydown", this.keyHandler);
        },
        placeBoulders(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                this.map1[this.boulderPositions[i][1]][this.boulderPositions[i][0]] = 'B';
            }
        },
    },
    computed: {
        flatTiles() {
            return this.tiles.flat();
        }
    },
    created() {
        this.map1[this.playerPosition[1]][this.playerPosition[0]] = 'P';
        this.placeBoulders();
        this.fillTiles();
        this.setKeyHandler();
    }
}
