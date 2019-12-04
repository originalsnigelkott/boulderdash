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
        :style="{
                width: calculateTileWidth + '%',
                height: calculateTileHeight + '%',
                }"
        class="tile" >
        <img
        :src="tilePicture(tile.tileState)">
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
            currentLevelTitle: '',
            currentLevel: 1,
            map: [],
            mapSizeX: 20,
            mapSizeY: 20,
            gameOver: false,
            style: 'd',
            changedStyle: false
        }
    },
    methods: {
        keyHandler(e) {
            /**
              37 - left, 39 - right, 38 - up, 40 - down
             */
            if (e.keyCode === 37) {
                this.handleKeyLeft(e);
            } else if (e.keyCode === 39) {
                this.handleKeyRight(e);
            }else if (e.keyCode === 38) {
                this.handleKeyUp(e);
            } else if (e.keyCode === 40) {
                this.handleKeyDown(e);
            }else if (e.keyCode === 69) {
                this.style = 'e';
                this.changedStyle=true;
                this.changeStyle();
            }else if (e.keyCode === 68) {
                this.style = 'd';
                this.changedStyle=true;
                this.changeStyle();
            }
            console.log("Game over status: " + this.gameOver);
        },
        handleKeyUp(e) {
            //PlayerCanMoveTo - true -> move y-1
            if(this.playerCanMoveTo(this.playerPosition[0],this.playerPosition[1]-1) == true){
                this.playerMove(e);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Up: not possible');
            }            
        },
        handleKeyDown(e){
            //PlayerCanMoveTo - true -> move y+1
            if(this.playerCanMoveTo(this.playerPosition[0],this.playerPosition[1]+1) == true){
                this.playerMove(e);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Down: not possible');
            }    
        },
        handleKeyLeft(e){

            this.playerPushingBoulderLeft()

            //PlayerCanMoveTo - true -> move x-1
            if(this.playerCanMoveTo(this.playerPosition[0]-1,this.playerPosition[1]) == true){
                this.playerMove(e);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Left: not possible');
            }    
        },
        handleKeyRight(e){

            this.playerPushingBoulderRight()

            //PlayerCanMoveTo - true -> move x+1
            if(this.playerCanMoveTo(this.playerPosition[0]+1,this.playerPosition[1]) == true){
                this.playerMove(e);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Right: not possible');
            }    
        },
        playerCanMoveTo(x,y){
            //inside the map
            if(x < 0 ||x > this.size || y < 0 || y >= this.size){
                return false;
            }
            //you can only go down the road
            if(this.tiles[y][x].tileState !== 'D' && this.tiles[y][x].tileState !== 'X' && this.tiles[y][x].tileState !== 'G'){
                //console.log(this.map[y][x], this.tiles[x][y].isMoving);
                return false;
            }
            return true;
        },
        enemyCanMoveTo(x,y){
            if(x < 0 ||x > this.size || y < 0 || y >= this.size){
                return false;
            }
            //you can only go on empty spaces(X)
            if(this.tiles[y][x].tileState !== 'X'){
                //console.log(this.map[y][x]);
                return false;
            }
            return true;
        },
        playerMove(e){
            //this.map[this.playerPosition[1]][this.playerPosition[0]] = 'X';
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
            if(this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState == 'G'){
                this.diamondCount+=1;
                if(this.totalAmountOfDiamonds == this.diamondCount){
                    console.log('next level');
                    this.setNextLevel();
                }
                this.$emit('getDiamondCount', this.diamondCount);
                //console.log('Diamond: '+this.diamondCount);
            }
            //new position on the map            
            //this.map[this.playerPosition[1]][this.playerPosition[0]] = 'P';
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='P';
            this.$forceUpdate();
        },
        enemyMove(){
            //this.map[this.enemyPosition[1]][this.enemyPosition[0]] = 'X';
            this.tiles[this.enemyPosition[1]][this.enemyPosition[0]].tileState='X';

            this.enemyCaugthYouGameOver()

            switch(enemyMovementCase){
                
                case 0:
                        if(this.tiles[this.enemyPosition[1]][this.enemyPosition[0]-1].tileState === 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]-1;
                            //console.log('Enemy moved left')
                            break;
                        }else{
                            enemyMovementCase++;
                            break;
                        }
                case 1:
                        if(this.tiles[this.enemyPosition[1]-1][this.enemyPosition[0]].tileState === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]-1;
                            //console.log('Enemy moved up')
                            break;
                        }else{
                            enemyMovementCase++;
                            break;
                        }
                case 2:
                        if(this.tiles[this.enemyPosition[1]][this.enemyPosition[0]+1].tileState == 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]+1;
                            //console.log('Enemy moved right')
                            break;
                        }else{
                            enemyMovementCase++;
                            break;
                        }
                case 3:
                        if(this.tiles[this.enemyPosition[1]+1][this.enemyPosition[0]].tileState === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]+1;
                            //console.log('Enemy moved down')
                            break;
                        }else{
                            enemyMovementCase = 0;
                            break;
                        }
                    }

            //this.map[this.enemyPosition[1]][this.enemyPosition[0]] = 'E';
            this.tiles[this.enemyPosition[1]][this.enemyPosition[0]].tileState='E';
            this.$forceUpdate();
        },
        fillTiles() {
            for(let row = 0; row < this.mapSizeY; row++){
                this.tiles[row] = [];
                for(let col = 0; col < this.mapSizeX; col++){
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
                        this.tiles[row].push(new Tile('X', row, col, false))
                    }else if(this.map[row][col] === 'E'){
                        this.tiles[row].push(new Tile('E', row, col, false))
                    }else if(this.map[row][col] === 'C'){
                        this.tiles[row].push(new Tile('C', row, col, false))
                    }
                }
            }
        },
        tilePicture(tileState){
            let pictureLocation = "img/" + tileState+this.style + ".png";
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
                let y = this.boulderPositions[i][1];
                let x = this.boulderPositions[i][0];
                if(this.tiles[y + 1][x].tileState === 'X' || (this.tiles[y + 1][x].tileState === 'P' && this.tiles[y][x].isMoving === true)) {
                    //console.log("Boulder is now a moving tile " + i);                    
                    this.tiles[y][x].isMoving = true;
                } else {
                    //console.log("Boulder is not a moving tile " + i);
                    this.tiles[y][x].isMoving = false;
                }
            }
        },
        moveBoulders(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                let y = this.boulderPositions[i][1];
                let x = this.boulderPositions[i][0];
                if(this.tiles[y][x].isMoving === true){
                    //console.log('Boulder is a moving tile');
                    if(this.canFallTo(x, y)){
                        //console.log('Boulder falling');
                        this.boulderPositions[i][1]++;
                        //this.map[y][x]= 'X';
                        this.tiles[y][x].tileState = 'X';
                        this.tiles[y][x].isMoving = 'false';

                        //this.map[y+1][x] = 'B';
                        this.tiles[y+1][x].tileState = 'B';
                        this.tiles[y+1][x].isMoving = true;
                        if(y + 1 === this.playerPosition[1] && x === this.playerPosition[0]) {
                            this.gameOver = true;
                        }
                    }
                }
            }
        },
        canFallTo(x, y){
            if(this.tiles[y + 1][x].tileState === 'X' || this.tiles[y + 1][x].tileState === 'P'){
                //console.log('Boulder can move')
                return true;
            }
            //console.log('Boulder cant move')
            return false;
        },
        playerPushingBoulderRight(){
                    for(let i = 0; i < this.boulderPositions.length ; i++){
                        let x = this.boulderPositions[i][0] 
                        let y = this.boulderPositions[i][1]
                        if(this.playerPosition[0]+1 == x && this.playerPosition[1] == y && this.tiles[y][x+1].tileState == 'X'){
                            this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                            this.tiles[y][x+1].tileState = 'B'
                            this.tiles[y][x].tileState = 'X'
                        }
                }
        },
        playerPushingBoulderLeft(){
            for(let i = 0; i < this.boulderPositions.length ; i++){
                let x = this.boulderPositions[i][0] 
                let y = this.boulderPositions[i][1]
                if(this.playerPosition[0]-1 == x && this.playerPosition[1] == y && this.tiles[y][x-1].tileState == 'X'){
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]-1;
                    this.tiles[y][x-1].tileState = 'B'
                    this.tiles[y][x].tileState = 'X'
                }
            }      
    },
    bouldersFallingFromStack(){
        for(let i = 0; i < this.boulderPositions.length ; i++){
            let x = this.boulderPositions[i][0] 
            let y = this.boulderPositions[i][1]
            if(this.tiles[y-1][x].tileState === 'B' &&  this.tiles[y][x+1].tileState === 'X' && this.tiles[y-1][x+1].tileState === 'X'){
                this.boulderPositions[i][1] = this.boulderPositions[i][1];
                this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                this.tiles[y][x].tileState = 'X'
                this.tiles[y][x+1].tileState = 'B'
            }else if(this.tiles[y-1][x].tileState === 'B' &&  this.tiles[y][x-1].tileState === 'X' && this.tiles[y-1][x-1].tileState === 'X'){
                this.boulderPositions[i][1] = this.boulderPositions[i][1];
                this.boulderPositions[i][0] = this.boulderPositions[i][0]-1;
                this.tiles[y][x].tileState = 'X'
                this.tiles[y][x-1].tileState = 'B'
            }
        }

    },

    enemyCaugthYouGameOver(){
        if(this.enemyPosition[1]-1 == this.playerPosition[1] && this.enemyPosition[0] == this.playerPosition[0]){
            console.log('Got your feet')
            this.gameOver = true;
        }else if(this.enemyPosition[1]+1 == this.playerPosition[1] && this.enemyPosition[0] == this.playerPosition[0]){
            console.log('Got your head')
            this.gameOver = true;
        }else if(this.enemyPosition[1] == this.playerPosition[1] && this.enemyPosition[0]-1 == this.playerPosition[0]){
            console.log('Got your right arm')
            this.gameOver = true;
        }else if(this.enemyPosition[1] == this.playerPosition[1] && this.enemyPosition[0]+1 == this.playerPosition[0]){
            console.log('Got your left arm')
            this.gameOver = true;
        }
    },
        amountOfDiamonds(){
            this.totalAmountOfDiamonds++;
            this.$emit('totalAmountOfDiamonds', this.totalAmountOfDiamonds);            
        },
        getLevelTitle(){
            this.$emit('currentLevelTitle', this.currentLevelTitle);
        },
        updateEnvironments(){
           setTimeout(() => {
                if(this.gameOver === true) {
                    this.setCurrentLevel(this.gameOver);
                } else {
                    this.enemyMove();
                    this.setTileIsMoving();
                    this.moveBoulders();
                    this.updateEnvironments();
                }
            }, 150)
        },
        CheckForBoulderStacks(){
            setTimeout(() => {
                this.bouldersFallingFromStack();
                this.CheckForBoulderStacks();
             }, 500)
         },
        setCurrentLevel(gameOver){
            if(gameOver) {
                let gameOverMapIndex = Store.maps.length - 1;
                this.currentLevel = gameOverMapIndex + 1;
                Store.currentLevelNum = this.currentLevel;
                this.map = Store.maps[gameOverMapIndex];
                this.mapSizeX = Store.currentLevel.mapSizeX[gameOverMapIndex];
                this.mapSizeY = Store.currentLevel.mapSizeY[gameOverMapIndex];
                this.currentLevelTitle = Store.currentLevel.title[gameOverMapIndex];
                this.tiles = [];
                this.fillTiles();
                this.$forceUpdate();
                this.getLevelTitle();
            } else {
                this.diamondCount=0;
                this.totalAmountOfDiamonds=0;
                this.enemyMovementCase = 0;
                Store.currentLevelNum = this.currentLevel;
                if(this.changedStyle == false){
                    this.style=Store.currentLevel.style[Store.currentLevelNum-1];
                }
                this.map = Store.maps[Store.currentLevelNum-1];
                this.mapSizeX = Store.currentLevel.mapSizeX[Store.currentLevelNum-1];
                this.mapSizeY = Store.currentLevel.mapSizeY[Store.currentLevelNum-1];
                this.currentLevelTitle = Store.currentLevel.title[Store.currentLevelNum-1];
                this.playerPosition = Store.currentLevel.playerPosition[Store.currentLevelNum-1];
                this.enemyPosition = Store.currentLevel.enemyPosition[Store.currentLevelNum-1];
                this.boulderPositions = Store.currentLevel.boulderPositions[Store.currentLevelNum-1];
                //player
                this.map[this.playerPosition[1]][this.playerPosition[0]] = 'P';
                //placing boulders from boulderPositions        
                this.placeBoulders();
                this.tiles = [];
                this.fillTiles();

                this.$forceUpdate();
                this.setKeyHandler();
                this.updateEnvironments();
                this.CheckForBoulderStacks()        
                this.getLevelTitle();
                //enemy
                //this.map[this.enemyPosition[1]][this.enemyPosition[0]] = 'E';
            }
        },
        changeStyle(){
            console.log('change');
            this.setCurrentLevel();
            this.$forceUpdate();                
            this.fillTiles;
            this.setKeyHandler(); 
            this.getLevelTitle();
            this.$forceUpdate();  
        },
        setNextLevel(){
            this.currentLevel += 1;
            this.changedStyle=false;
            if(this.currentLevel < 3){
                this.setCurrentLevel();
                this.$forceUpdate();                
                this.fillTiles;
                this.setKeyHandler();       
                this.getLevelTitle();
            }
        }
    },
    computed: {
        flatTiles() {
            return this.tiles.flat();
        },
        calculateTileHeight() {
            return 100 / this.mapSizeY;
        },
        calculateTileWidth() {
            return 100 / this.mapSizeX;
        },
    },    
    created() {
        this.setCurrentLevel();     
    }
}