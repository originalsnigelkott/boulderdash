let enemyMovementCase = 0

import Tile from './Tile.js'
import Store from './Store.js'

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
            playerPosition: [], //x,y
            enemyPosition: [],
            boulderPositions: [],
            tiles: [],
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            currentLevel: 1,
            map: []
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
            //PlayerCanMoveTo - true -> move y-1
            if(this.PlayerCanMoveTo(this.playerPosition[0],this.playerPosition[1]-1) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Up: not possible');
            }            
        },
        handleKeyDown(e){
            //PlayerCanMoveTo - true -> move y+1
            if(this.PlayerCanMoveTo(this.playerPosition[0],this.playerPosition[1]+1) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Down: not possible');
            }    
        },
        handleKeyLeft(e){
            //PlayerCanMoveTo - true -> move x-1
            if(this.PlayerCanMoveTo(this.playerPosition[0]-1,this.playerPosition[1]) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Left: not possible');
            }    
        },
        handleKeyRight(e){
            //PlayerCanMoveTo - true -> move x+1
            if(this.PlayerCanMoveTo(this.playerPosition[0]+1,this.playerPosition[1]) == true){
                this.playerMove(e);
                console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Right: not possible');
            }    
        },
        PlayerCanMoveTo(x,y){
            //inside the map
            if(x < 0 ||x > this.size || y < 0 || y >= this.size){
                return false;
            }
            //you can only go down the road
            if(this.map[y][x] !== 'D' && this.map[y][x] !== 'X' && this.map[y][x] !== 'G'){
                console.log(this.map[y][x], this.tiles[x][y].isMoving);
                return false;
            }
            return true;
        },
        enemyCanMoveTo(x,y){
            if(x < 0 ||x > this.size || y < 0 || y >= this.size){
                return false;
            }
            //you can only go on empty spaces(X)
            if(this.map[y][x] !== 'X'){
                console.log(this.map[y][x]);
                return false;
            }
            return true;
        },
        playerMove(e){
            this.map[this.playerPosition[1]][this.playerPosition[0]] = 'X';
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
            if(this.map[this.playerPosition[1]][this.playerPosition[0]] == 'G'){
                this.diamondCount+=1;
                this.$emit('getDiamondCount', this.diamondCount);
                //console.log('Diamond: '+this.diamondCount);
            }
            //new position on the map            
            this.map[this.playerPosition[1]][this.playerPosition[0]] = 'P';
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='P';
            this.$forceUpdate();
        },
        enemyMove(){
            this.map[this.enemyPosition[1]][this.enemyPosition[0]] = 'X';
            this.tiles[this.enemyPosition[1]][this.enemyPosition[0]].tileState='X';

            switch(enemyMovementCase){
                case 0:
                        if(this.map[this.enemyPosition[1]][this.enemyPosition[0]-1] === 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]-1;
                            console.log('Enemy moved left')
                            break;
                        }else{
                            enemyMovementCase++;
                            break;
                        }
                case 1:
                        if(this.map[this.enemyPosition[1]-1][this.enemyPosition[0]] === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]-1;
                            console.log('Enemy moved up')
                            break;
                        }else{
                            enemyMovementCase++;
                            break;
                        }
                case 2:
                        if(this.map[this.enemyPosition[1]][this.enemyPosition[0]+1] == 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]+1;
                            console.log('Enemy moved right')
                            break;
                        }else{
                            enemyMovementCase++;
                            break;
                        }
                case 3:
                        if(this.map[this.enemyPosition[1]+1][this.enemyPosition[0]] === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]+1;
                            console.log('Enemy moved down')
                            break;
                        }else{
                            enemyMovementCase = 0;
                            break;
                        }
                    }

            this.map[this.enemyPosition[1]][this.enemyPosition[0]] = 'E';
            this.tiles[this.enemyPosition[1]][this.enemyPosition[0]].tileState='E';
            this.$forceUpdate();
        },

        fillTiles() {
            for(let row = 0; row < this.size; row++){
                this.tiles[row] = [];
                for(let col = 0; col < this.size; col++){
                    if( this.map[row][col] === 'D'){
                        this.tiles[row].push(new Tile('D', row, col, false))
                    }else if(this.map[row][col] === 'P'){
                        this.tiles[row].push(new Tile('P', row, col, false))
                    }else if(this.map[row][col] === 'W'){
                        this.tiles[row].push(new Tile('W', row, col, false))
                    }else if(this.map[row][col] === 'G'){
                        this.amountOfDiamonds()
                        this.tiles[row].push(new Tile('G', row, col, false))
                    }else if(this.map[row][col] === 'B'){
                        this.tiles[row].push(new Tile('B', row, col, false))
                    }else if(this.map[row][col] === 'X'){
                        this.tiles[row].push(new Tile('x', row, col, false))
                    }else if(this.map[row][col] === 'E'){
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
                this.map[this.boulderPositions[i][1]][this.boulderPositions[i][0]] = 'B';
            }
        },
        setTileIsMoving(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                if(this.map[(this.boulderPositions[i][1]) + 1][this.boulderPositions[i][0]] === 'X') {
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
                        let tempMap = this.map[x][y];
                        this.map[x][y] = this.map[x][y + 1];
                        this.map[x][y + 1] = tempMap;
                    }
                }
            }
        },*/
        canFallTo(boulderX, boulderY){
            let nextPosition = this.map[boulderX][boulderY + 1];
            if(this.map[boulderX][boulderY + 1] === 'X'){
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
        getLevel(){
            this.currentLevel;
            this.$emit('currentLevel', this.currentLevel);
        },
        updateEnvironments(){
            setTimeout(() => {
                this.updateEnvironment -= 1
                this.updateEnvironments()
                this.enemyMove();
            }, 150)
        },
        setCurrentLevel(){
            Store.currentLevelNum = 1;            
            this.map = Store.maps[Store.currentLevelNum-1];
            this.title = Store.currentLevel.title[Store.currentLevelNum-1];
            this.playerPosition = Store.currentLevel.playerPosition[Store.currentLevelNum-1];
            this.enemyPosition = Store.currentLevel.enemyPosition[Store.currentLevelNum-1];
            this.boulderPositions = Store.currentLevel.boulderPositions[Store.currentLevelNum-1];
            //player
            this.map[this.playerPosition[1]][this.playerPosition[0]] = 'P';
            //placing boulders from boulderPositions        
            this.placeBoulders();
            //enemy
            //this.map[this.enemyPosition[1]][this.enemyPosition[0]] = 'E';
        }
    },
    computed: {
        flatTiles() {
            return this.tiles.flat();
        },
    },    
    created() {
        this.setCurrentLevel();        
        this.fillTiles();
        this.setKeyHandler();
        this.updateEnvironments();
    }
}
