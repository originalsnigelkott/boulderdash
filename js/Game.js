import Tile from './Tile.js'
import Store from './Store.js'

export default{
    components: {
        Tile,
    },
    props: {
        startGame: false,
        resetGame: false,
        outOfTime: false,
        newStyle: ''
    },
    template: `
    <div id='gridBox'>
        <div id='gameScreen'>
            <div class="grid">
                <div :id="tileId(tile.position.x,tile.position.y)"  v-for="(tile, i) in flatTiles"
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
        </div>
        <div id='arrowsBox'>
            <div class="arrows">
                <div class="aBox0">
                    <div class="arrow"><img src="img/a_up.png" @click='moveWithArrow(38)' /></div>
                </div>
                <div class="aBox1">
                    <div class="arrow"><img src="img/a_left.png"  @click='moveWithArrow(37)' /></div>
                    <div class="arrow"><img src="img/ar.png" /></div>
                    <div class="arrow"><img src="img/a_right.png"  @click='moveWithArrow(39)' /></div>
                </div>
                <div class="aBox0">
                    <div class="arrow"><img src="img/a_down.png"  @click='moveWithArrow(40)' /></div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            playerPosition: [], //x,y
            enemyPosition: [],
            boulderPositions: [],
            diamondPositions: [],
            tiles: [],
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            currentLevelTitle: '',
            currentLevel: 0,
            map: [],
            mapSizeX: 20,
            mapSizeY: 20,
            changedStyle: false,
            gameOver: false,
            gameOverLevel: 3,
            level: Object,
            winLevel: 4,
            imgSrc: 'img/gd.png',
            enemyMovementCase: 0,
            gameTickRateFunction: undefined,
            style: ''
        }
    },
    methods: {
        keyHandler(e) {
            let keyCode = e.keyCode;
            /**
              37 - left, 39 - right, 38 - up, 40 - down
              W (87) is up, A(65) is left, S (83) is down, and D(68) is right
             */
            //console.log(keyCode)
            if(keyCode === 13 && this.currentLevel == 0){
                this.setNextLevel();
            }
            if (keyCode === 37 || keyCode === 65) {
                this.handleKeyLeft(keyCode);
            } else if (keyCode === 68 || keyCode === 39) {
                this.handleKeyRight(keyCode);
            }else if (keyCode === 38 || keyCode === 87) {
                this.handleKeyUp(keyCode);
            } else if (keyCode === 40 || keyCode === 83) {
                this.handleKeyDown(keyCode);
            }else if (keyCode === 69) {
                this.style = 'e';                
                this.changedStyle=true;
                this.getTreasureImg();
            }else if (keyCode === 77) {
                //key m
                this.style = 'd';
                this.changedStyle=true;                
                this.getTreasureImg();
            }else if (keyCode === 82) {
                //key rr
                this.style = 'r';
                this.changedStyle=true;                
                this.getTreasureImg();
            }
        },
        moveWithArrow(keyCode){            
            if (keyCode === 37) {
                this.handleKeyLeft(keyCode);
            } else if (keyCode === 39) {
                this.handleKeyRight(keyCode);
            }else if (keyCode === 38) {
                this.handleKeyUp(keyCode);
            } else if (keyCode === 40) {
                this.handleKeyDown(keyCode);
            }
        },
        handleKeyUp(keyCode) {
            //PlayerCanMoveTo - true -> move y-1
            if(this.playerCanMoveTo(this.playerPosition[0],this.playerPosition[1]-1) == true){
                this.playerMove(keyCode);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Up: not possible');
            }            
        },
        handleKeyDown(keyCode){
            //PlayerCanMoveTo - true -> move y+1
            if(this.playerCanMoveTo(this.playerPosition[0],this.playerPosition[1]+1) == true){
                this.playerMove(keyCode);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Down: not possible');
            }    
        },
        handleKeyLeft(keyCode){
            this.playerPushingBoulderLeft()
            //PlayerCanMoveTo - true -> move x-1
            if(this.playerCanMoveTo(this.playerPosition[0]-1,this.playerPosition[1]) == true){
                this.playerMove(keyCode);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Left: not possible');
            }    
        },
        handleKeyRight(keyCode){
            this.playerPushingBoulderRight()

            //PlayerCanMoveTo - true -> move x+1
            if(this.playerCanMoveTo(this.playerPosition[0]+1,this.playerPosition[1]) == true){
                this.playerMove(keyCode);
                //console.log(this.playerPosition[0]+','+this.playerPosition[1]);
            }
            else{
                console.log('Right: not possible');
            }    
        },
        playerCanMoveTo(x,y){
            //inside the map
            if(x < 0 ||x > this.mapSizeX || y < 0 || y >= this.mapSizeY){
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
            //inside the map
            if(x < 0 ||x > this.mapSizeX || y < 0 || y >= this.mapSizeY){
                return false;
            }
            //you can only go on empty spaces(X)
            if(this.tiles[y][x].tileState !== 'X'){
                //console.log(this.map[y][x]);
                return false;
            }
            return true;
        },
        playerMove(keyCode){
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='X';
            if(keyCode === 37 || keyCode === 65){
                //moveLeft x-1
                this.playerPosition[0]=this.playerPosition[0]-1;
            }
            else if(keyCode === 68 || keyCode === 39){
            //moveRight x+1
                this.playerPosition[0]=this.playerPosition[0]+1;
            }          
            else if(keyCode === 38 || keyCode === 87){
            //moveUp y-1'
                this.playerPosition[1]=this.playerPosition[1]-1;
            }else if(keyCode === 40 || keyCode === 83){
            //moveDown y+1
                this.playerPosition[1]=this.playerPosition[1]+1;
            }      
            
            if(this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState == 'G'){
                this.diamondCount+=1;
                let indexOfDiamond;
                for(let i = 0; i < this.diamondPositions.length; i++) {
                    if(this.diamondPositions[i][1] === this.playerPosition[1] && this.diamondPositions[i][0] === this.playerPosition[0]) {
                        indexOfDiamond = i;
                        break;
                    }
                }
                this.diamondPositions.splice(indexOfDiamond, 1);
                console.log(this.diamondPositions);
                if(this.totalAmountOfDiamonds == this.diamondCount){
                    this.$emit('resetTimerOnLevelComplete');
                    console.log('next level');
                    this.setNextLevel();
                }
            }
            //new position on the map            
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='P';
            this.$forceUpdate();
        },
        enemyMove(){
            
            if(this.gameOver === true){
                return;
            }

            this.tiles[this.enemyPosition[1]][this.enemyPosition[0]].tileState='X';
            this.enemyCaugthYouGameOver()

            switch(this.enemyMovementCase){                
                case 0:
                        if(this.tiles[this.enemyPosition[1]][this.enemyPosition[0]-1].tileState === 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]-1;
                            //console.log('Enemy moved left')
                            break;
                        }else{
                            this.enemyMovementCase++;
                            break;
                        }
                case 1:
                        if(this.tiles[this.enemyPosition[1]-1][this.enemyPosition[0]].tileState === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]-1;
                            //console.log('Enemy moved up')
                            break;
                        }else{
                            this.enemyMovementCase++;
                            break;
                        }
                case 2:
                        if(this.tiles[this.enemyPosition[1]][this.enemyPosition[0]+1].tileState == 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]+1;
                            //console.log('Enemy moved right')
                            break;
                        }else{
                            this.enemyMovementCase++;
                            break;
                        }
                case 3:
                        if(this.tiles[this.enemyPosition[1]+1][this.enemyPosition[0]].tileState === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]+1;
                            //console.log('Enemy moved down')
                            break;
                        }else{
                            this.enemyMovementCase = 0;
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
            this.$forceUpdate();
        },
        updateTiles(){            
            for(let row = 0; row < this.mapSizeY; row++){
                for(let col = 0; col < this.mapSizeX; col++){
                    this.tiles[row][col].tileState=this.map[row][col];
                }
            }            
            this.$forceUpdate();
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
        placeDiamonds(){
            for(let i = 0; i < this.diamondPositions.length; i++){
                this.map[this.diamondPositions[i][1]][this.diamondPositions[i][0]] = 'G';
            }
        },
        setTileIsMoving(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                let y = this.boulderPositions[i][1];
                let x = this.boulderPositions[i][0];
                if(this.tiles[y + 1][x].tileState === 'X' || (this.tiles[y + 1][x].tileState === 'P' && this.tiles[y][x].isMoving === true)) {
                    this.tiles[y][x].isMoving = true;
                } else {
                    this.tiles[y][x].isMoving = false;
                }
            }
            for(let i = 0; i < this.diamondPositions.length; i++){
                let y = this.diamondPositions[i][1];
                let x = this.diamondPositions[i][0];
                if(this.tiles[y + 1][x].tileState === 'X') {
                    this.tiles[y][x].isMoving = true;
                } else {
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
                            this.setNextLevel();
                        }
                    }
                }
            }
        },
        moveDiamonds(){
            for(let i = 0; i < this.diamondPositions.length; i++){
                let y = this.diamondPositions[i][1];
                let x = this.diamondPositions[i][0];
                if(this.tiles[y][x].isMoving === true){
                    if(this.canFallTo(x, y)){
                        this.diamondPositions[i][1]++;
                        this.tiles[y][x].tileState = 'X';
                        this.tiles[y][x].isMoving = 'false';
                        this.tiles[y+1][x].tileState = 'G';
                        this.tiles[y+1][x].isMoving = true;
                    }
                }
            }
        },
        canFallTo(x, y){
            if(this.tiles[y][x].tileState === 'B') {
                if(this.tiles[y + 1][x].tileState === 'X' || this.tiles[y + 1][x].tileState === 'P'){
                    return true;
                }
            } else if(this.tiles[y][x].tileState === 'G') {
                if(this.tiles[y + 1][x].tileState === 'X') {
                    return true;
                }
            }
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

                if(this.tiles[y+1][x].tileState === 'B' && this.tiles[y][x-1].tileState === 'X' &&
                 (x-1 === this.playerPosition[0] && y+1 === this.playerPosition[1])){

                    console.log('You died from a boulder falling from the Right')
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]-1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y+1][x-1].tileState = 'X'
                    this.tiles[y][x-1].tileState = 'B'

                }else if(this.tiles[y+1][x].tileState === 'B'  && this.tiles[y][x+1].tileState === 'X' && 
                (x+1 === this.playerPosition[0] && y+1 === this.playerPosition[1])){

                    console.log('You died from a boulder falling from the Left')
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y+1][x+1].tileState = 'X'
                    this.tiles[y][x+1].tileState = 'B'

                }else if(this.tiles[y+1][x].tileState === 'B' &&  this.tiles[y][x+1].tileState === 'X' &&
                 this.tiles[y+1][x+1].tileState === 'X'){

                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y][x+1].tileState = 'B'

                }else if(this.tiles[y+1][x].tileState === 'B' &&  this.tiles[y][x-1].tileState === 'X' &&
                 this.tiles[y+1][x-1].tileState === 'X'){
                     
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
            if(this.gameOver){                
                this.setNextLevel();
            }
        },
        getLevelTitle(){
            this.$emit('currentLevelTitle', this.currentLevelTitle);
        },
        updateEnvironments(){
            this.gameTickRateFunction = setTimeout(() => {
                if(this.gameOver === true) {
                   // this.setCurrentLevel();
                } else {
                    this.setTileIsMoving();
                    this.moveBoulders();
                    this.moveDiamonds();
                    this.enemyMove();
                    this.updateEnvironments();
                }
            }, 75)
        },
        clearUpdateEnvironments() {
            clearTimeout(this.gameTickRateFunction);
        },
        CheckForBoulderStacks(){
            setTimeout(() => {
                this.bouldersFallingFromStack();
                this.CheckForBoulderStacks();
            }, 500)
        },
        setCurrentLevel(){
            this.diamondCount=0;
            this.enemyMovementCase = 0;
            Store.currentLevelNum = this.currentLevel;
            if(this.currentLevel == this.gameOverLevel){
                this.$emit('stopTimer');
                this.gameOver = true;
            }
            //console.log(Store.currentLevelNum);
            this.level = _.cloneDeep(Store.levels[Store.currentLevelNum]);
            if(this.changedStyle == false || this.currentLevel > 1){
                this.style = this.level.style;
                this.getTreasureImg();
            }
            this.setObjectsPosition();
            this.tiles = [];
            this.fillTiles();
            this.$forceUpdate();
            if(!this.gameOver && this.currentLevel < this.gameOverLevel){
                this.setObjectsMove();
            }
            this.setKeyHandler();
        },
        setObjectsPosition(){            
            this.map = this.level.map;
            this.mapSizeX = this.level.mapSizeX;
            this.mapSizeY = this.level.mapSizeY;
            this.currentLevelTitle = this.level.title;
            this.playerPosition = this.level.playerPosition;
            this.enemyPosition = this.level.enemyPosition;
            this.boulderPositions = this.level.boulderPositions;
            this.diamondPositions = this.level.diamondPositions;
            this.totalAmountOfDiamonds= this.diamondPositions.length;
            if(!this.gameOver && this.currentLevel < this.gameOverLevel){
                //player
                this.map[this.playerPosition[1]][this.playerPosition[0]] = 'P';
                //placing boulders from boulderPositions        
                this.placeBoulders();
                this.placeDiamonds();                
                this.getLevelTitle();
            }
        },
        setObjectsMove(){
            this.clearUpdateEnvironments();
            this.updateEnvironments();
            this.CheckForBoulderStacks();
        },
        setNextLevel(){
            if(this.gameOver){                
                this.currentLevel = this.gameOverLevel;
            }
            else{
                this.currentLevel += 1;
                console.log('Game reset')
                console.log('Game')
                if(this.currentLevel == this.gameOverLevel && this.gameOver === false){
                    this.currentLevel = this.winLevel;
                    this.$emit('winCheck')
                    this.$emit('stopTimer');
                }
            }
            //Store.currentLevelNum = this.currentLevel;
            this.setCurrentLevel();
        },        
        getTreasureImg(){
            this.$emit('getTreasureImg', 'img/g'+this.style+'.png');
        },  
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
    watch: {
        startGame() {
            if(this.startGame && this.currentLevel === 0) {
                this.setNextLevel();
            } else if(!this.startGame) {
                this.currentLevel = 0;
                this.diamondCount = 0;
                this.gameOver = false;
                this.setCurrentLevel();
                this.$forceUpdate();
            }
        },
        resetGame(){
            if(this.resetGame){
                this.currentLevel = 0;
                this.setCurrentLevel();
            }
        },
        outOfTime(){
            if(this.outOfTime) {
                this.gameOver = true;
                this.setNextLevel();
            }
        },
        timeLimit(){
            //console.log('game');
        },
        totalAmountOfDiamonds() {
            this.$emit('totalAmountOfDiamonds', this.totalAmountOfDiamonds);
        },
        diamondCount() {
            this.$emit('getDiamondCount', this.diamondCount);
        },      
        changeTheme(){
            console.log('Theme changed');
           // this.style = this.nyStyle
        },
        newStyle: function(newStyle) { // watch it
            //console.log('ny style: ', newStyle)
            this.style = this.newStyle;
            this.changedStyle = true;
            this.getTreasureImg();
        }
    },    
    created() {
        this.setCurrentLevel();
    }
}