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
            enemyPosition: [10,15],
            boulderPositions: [
                [6,2],
                [7,2],
            ],
            tiles: [],
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
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
            this.setTileIsMoving();
            this.canFallTo(7,2);
            //this.moveBoulders();
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
                console.log(this.map1[y][x], this.tiles[x][y].isMoving);
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
                //console.log('Diamond: '+this.diamondCount);
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
                        this.tiles[row].push(new Tile('D', row, col, false))
                    }else if(this.map1[row][col] === 'P'){
                        this.tiles[row].push(new Tile('P', row, col, false))
                    }else if(this.map1[row][col] === 'W'){
                        this.tiles[row].push(new Tile('W', row, col, false))
                    }else if(this.map1[row][col] === 'G'){
                        this.amountOfDiamonds()
                        this.tiles[row].push(new Tile('G', row, col, false))
                    }else if(this.map1[row][col] === 'B'){
                        this.tiles[row].push(new Tile('B', row, col, false))
                    }else if(this.map1[row][col] === 'X'){
                    }else if(this.map1[row][col] === 'X'){
                        this.tiles[row].push(new Tile('x', row, col, false))
                    }else if(this.map1[row][col] === 'E'){
                        this.tiles[row].push(new Tile('E', row, col, false))
                    }
                }
            }
        },
        tilePicture(tileState){
            let pictureLocation = "img/" + tileState + ".png";
            return pictureLocation;
        },
        tileId(tilesCol, tilesRow){
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
        setTileIsMoving(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                if(this.map1[(this.boulderPositions[i][1]) + 1][this.boulderPositions[i][0]] === 'X') {
                    this.tiles[this.boulderPositions[i][0]][this.boulderPositions[i][1]].isMoving = true;
                }
            }
        },
        /*moveBoulders(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                let x = this.boulderPositions[i][0];
                let y = this.boulderPositions[i][1];
                if(this.tiles[x][y].isMoving === true){
                    console.log('Boulder is moving')
                    if(this.canFallTo(x, y)){
                        console.log('Boulder falling')
                        let tempTile = this.tiles[x][y];
                        this.tiles[x][y] = this.tiles[x][y + 1];
                        this.tiles[x][y + 1] = tempTile;
                        let tempMap = this.map1[x][y];
                        this.map1[x][y] = this.map1[x][y + 1];
                        this.map1[x][y + 1] = tempMap;
                    }
                }
            }
        },*/
        canFallTo(boulderX, boulderY){
            let nextPosition = this.map1[boulderX][boulderY + 1];
            if(this.map1[boulderX][boulderY + 1] === 'X'){
                console.log('Boulder can move')
                return true;
            }
            console.log('Boulder cant move')
            return false;
        },
        amountOfDiamonds(){
            this.totalAmountOfDiamonds++;
            this.$emit('totalAmountOfDiamonds', this.totalAmountOfDiamonds);
        },
    },
    computed: {
        flatTiles() {
            return this.tiles.flat();
        },
    },
    created() {
        //player
        this.map1[this.playerPosition[1]][this.playerPosition[0]] = 'P';
        //enemy
        this.map1[this.enemyPosition[1]][this.enemyPosition[0]] = 'E';
        //placing boulders from boulderPositions
        this.placeBoulders();
        this.fillTiles();
        this.setKeyHandler();
    }
}
