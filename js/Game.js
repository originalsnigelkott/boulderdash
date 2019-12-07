let enemyMovementCase = 0
var gameTickRateFunction;


import Tile from './Tile.js'
import Store from './Store.js'
import ThemeMenu from './ThemeMenu.js'
import DiamondCounter from './DiamondCounter.js';

export default{
    components: {
        Tile,
        ThemeMenu,
    },
    props: {
        startGame: false,
        gameOver: false,
    },
    template: `
    <div>
    <div id='gameScreen'>
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
            <ThemeMenu
            @changeTheme='changeTheme'
            :theme='style'
            id='themeMenu'
            />
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
            style: 'd',
            changedStyle: false
        }
    },
    methods: {
        keyHandler(e) {
            /**
              37 - left, 39 - right, 38 - up, 40 - down
             */
            if(e.keyCode === 13 && this.currentLevel == 0){
                this.setNextLevel();
            }
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
            }else if (e.keyCode === 68) {
                this.style = 'd';
                this.changedStyle=true;
            }
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
        playerMove(e){
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='X';
            switch (e.keyCode){
                case 37: {
                    //moveLeft x-1
                    this.playerPosition[0]=this.playerPosition[0]-1;
                    break;
                }
                case 38: {
                    //moveUp y-1'
                    this.playerPosition[1]=this.playerPosition[1]-1;
                    break;
                }
                case 39: {
                    //moveRight x+1
                    this.playerPosition[0]=this.playerPosition[0]+1;
                    break;
                }
                case 40: {
                    //moveDown y+1
                    this.playerPosition[1]=this.playerPosition[1]+1;
                    break;
                }
            }            
            if(this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState == 'G'){
                this.diamondCount+=1;
                if(this.totalAmountOfDiamonds == this.diamondCount){
                    console.log('next level');
                    this.setNextLevel();
                }
            }
            //new position on the map            
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
                    switch(this.map[row][col]) {
                        case 'D': {
                            this.tiles[row].push(new Tile('D', row, col, false))
                            break;
                        }
                        case 'P': {
                            this.tiles[row].push(new Tile('P', row, col, false))
                            break;
                        }
                        case 'W': {
                            this.tiles[row].push(new Tile('W', row, col, false))
                            break;
                        }
                        case 'G': {
                            this.tiles[row].push(new Tile('G', row, col, false))
                            break;
                        }
                        case 'B': {
                            this.tiles[row].push(new Tile('B', row, col, false))
                            break;
                        }
                        case 'X': {
                            this.tiles[row].push(new Tile('X', row, col, false))
                            break;
                        }
                        case 'E': {
                            this.tiles[row].push(new Tile('E', row, col, false))
                            break;
                        }
                        case 'C': {
                            this.tiles[row].push(new Tile('C', row, col, false))
                            break;
                        }
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
                if(this.tiles[y+1][x].tileState === 'B' && this.tiles[y][x-1].tileState === 'X' && (x-1 === this.playerPosition[0] && y+1 === this.playerPosition[1])){
                    console.log('You died from a boulder falling from the Right')
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]-1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y+1][x-1].tileState = 'X'
                    this.tiles[y][x-1].tileState = 'B'
                }else if(this.tiles[y+1][x].tileState === 'B'  && this.tiles[y][x+1].tileState === 'X' && (x+1 === this.playerPosition[0] && y+1 === this.playerPosition[1])){
                    console.log('You died from a boulder falling from the Left')
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y+1][x+1].tileState = 'X'
                    this.tiles[y][x+1].tileState = 'B'
                }else if(this.tiles[y+1][x].tileState === 'B' &&  this.tiles[y][x+1].tileState === 'X' && this.tiles[y+1][x+1].tileState === 'X'){
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y][x+1].tileState = 'B'
                }else if(this.tiles[y+1][x].tileState === 'B' &&  this.tiles[y][x-1].tileState === 'X' && this.tiles[y+1][x-1].tileState === 'X'){
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
        getLevelTitle(){
            this.$emit('currentLevelTitle', this.currentLevelTitle);
        },
        updateEnvironments(){
            gameTickRateFunction = setTimeout(() => {
                if(this.gameOver === true) {
                    this.setCurrentLevel(this.gameOver);
                } else {
                    this.setTileIsMoving();
                    this.moveBoulders();
                    this.moveDiamonds();
                    this.enemyMove();
                    this.updateEnvironments();
                }
            }, 150)
        },
        clearUpdateEnvironments() {
            clearTimeout(gameTickRateFunction);
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
                //this.level = Store.levels[gameOverMapIndex];
                this.map = this.level.map;
                this.mapSizeX = this.level.mapSizeX;
                this.mapSizeY = this.level.mapSizeY;
                this.currentLevelTitle = this.level.currentLevelTitle;
                this.tiles = [];
                this.fillTiles();
                this.$forceUpdate();
                this.getLevelTitle();
            } else {
                this.diamondCount=0;
                this.enemyMovementCase = 0;
                Store.currentLevelNum = this.currentLevel;
                if(this.changedStyle == false){
                    this.style=Store.currentLevel.style[Store.currentLevelNum];
                }
                this.map = Store.maps[Store.currentLevelNum];
                this.mapSizeX = Store.currentLevel.mapSizeX[Store.currentLevelNum];
                this.mapSizeY = Store.currentLevel.mapSizeY[Store.currentLevelNum];
                this.currentLevelTitle = Store.currentLevel.title[Store.currentLevelNum];
                this.playerPosition = Store.currentLevel.playerPosition[Store.currentLevelNum];
                this.enemyPosition = Store.currentLevel.enemyPosition[Store.currentLevelNum];
                this.boulderPositions = Store.currentLevel.boulderPositions[Store.currentLevelNum];
                this.diamondPositions = Store.currentLevel.diamondPositions[Store.currentLevelNum];
                this.totalAmountOfDiamonds = Store.currentLevel.diamondPositions[Store.currentLevelNum].length;
                //player
                this.map[this.playerPosition[1]][this.playerPosition[0]] = 'P';
                //placing boulders from boulderPositions        
                this.placeBoulders();
                this.placeDiamonds();
                this.tiles = [];
                this.fillTiles(); 
                this.$forceUpdate();
                this.setKeyHandler();
                this.clearUpdateEnvironments();
                this.updateEnvironments();
                this.CheckForBoulderStacks()
                this.getLevelTitle();
                //enemy
                //this.map[this.enemyPosition[1]][this.enemyPosition[0]] = 'E';
            }
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
        },
        changeTheme(style){
            console.log('Theme changed')
            this.style = style
            this.changedStyle == true
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
            }
        },
        totalAmountOfDiamonds() {
            this.$emit('totalAmountOfDiamonds', this.totalAmountOfDiamonds);
        },
        diamondCount() {
            this.$emit('getDiamondCount', this.diamondCount);
        }
    },    
    created() {
        this.setCurrentLevel();     
    }
}