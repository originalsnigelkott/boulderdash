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
            imgSrc: 'img/Gd.png',
            enemyMovementCase: 0,
            gameTickRateFunction: undefined,
            style: ''
        }
    },
    methods: {

        //Method that handles playermovement with keys W, A, S, D
        keyHandler(e) {
            let keyCode = e.keyCode;

            if(this.gameOver === true){
                return;
            }

            /**
              37 - left, 39 - right, 38 - up, 40 - down
              W (87) is up, A(65) is left, S (83) is down, and D(68) is right
             */
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

        //Methods that handles playermovement with the arrowkeys
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
            }
            else{
                console.log('Up: not possible');
            }            
        },
        handleKeyDown(keyCode){
            //PlayerCanMoveTo - true -> move y+1
            if(this.playerCanMoveTo(this.playerPosition[0],this.playerPosition[1]+1) == true){
                this.playerMove(keyCode);
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
            }
            else{
                console.log('Right: not possible');
            }    
        },

        //Checks if the player is moving inside the map
        playerCanMoveTo(x,y){
            //inside the map
            if(x < 0 ||x > this.mapSizeX || y < 0 || y >= this.mapSizeY){
                return false;
            }
            //you can only go down the road
            if(this.tiles[y][x].tileState !== 'D' && this.tiles[y][x].tileState !== 'X' && this.tiles[y][x].tileState !== 'G'){
                return false;
            }
            return true;
        },

        //Checks if the enemy is moving inside the map
        enemyCanMoveTo(x,y){
            //inside the map
            if(x < 0 ||x > this.mapSizeX || y < 0 || y >= this.mapSizeY){
                return false;
            }
            //Checks if the enemy is moving in an emptyspace(X)
            if(this.tiles[y][x].tileState !== 'X'){
                return false;
            }
            return true;
        },

        //Playermovement
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
            //If the tile you're trying to move to is 'G', register that a diamond was picked up
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
                if(this.totalAmountOfDiamonds == this.diamondCount){
                    this.setNextLevel();
                }
            }
            //new position on the map            
            this.tiles[this.playerPosition[1]][this.playerPosition[0]].tileState='P';
            this.$forceUpdate();
        },

        //Switchcase for enemy-movement-direction
        enemyMove(){

            this.tiles[this.enemyPosition[1]][this.enemyPosition[0]].tileState='X';
            this.enemyCaugthYouGameOver()

            switch(this.enemyMovementCase){  
                              
                case 0: 
                        //Enemy moves left
                        if(this.tiles[this.enemyPosition[1]][this.enemyPosition[0]-1].tileState === 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]-1;
                            break;
                        }else{
                            this.enemyMovementCase++;
                            break;
                        }
                case 1:
                        //Enemy moves up
                        if(this.tiles[this.enemyPosition[1]-1][this.enemyPosition[0]].tileState === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]-1;
                            break;
                        }else{
                            this.enemyMovementCase++;
                            break;
                        }
                case 2:
                        //Enemy moves right
                        if(this.tiles[this.enemyPosition[1]][this.enemyPosition[0]+1].tileState == 'X'){
                            this.enemyPosition[0]=this.enemyPosition[0]+1;
                            break;
                        }else{
                            this.enemyMovementCase++;
                            break;
                        }
                case 3:
                        //Enemy moves down
                        if(this.tiles[this.enemyPosition[1]+1][this.enemyPosition[0]].tileState === 'X'){
                            this.enemyPosition[1]=this.enemyPosition[1]+1;
                            break;
                        }else{
                            this.enemyMovementCase = 0;
                            break;
                        }
                    }
            this.tiles[this.enemyPosition[1]][this.enemyPosition[0]].tileState='E';
            this.$forceUpdate();
        },

        // Fills the tiles array with tile-objects
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

        //Returns the picture associated the tilestate and the style
        tilePicture(tileState){
            let pictureLocation = "img/" + tileState+this.style + ".png";
            return pictureLocation;
        },

        tileId(tilesCol, tilesRow){
            let tileId ='x'+tilesCol+'y'+tilesRow;
            return tileId;
        },

        // Function to handle playerkeyboard-input
        setKeyHandler(e) {       
            window.addEventListener("keydown", this.keyHandler);
        },

        // Place the boulders from boulderPositions
        placeBoulders(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                this.map[this.boulderPositions[i][1]][this.boulderPositions[i][0]] = 'B';
            }
        },

        // Place the diamonds from diamondPositions
        placeDiamonds(){
            for(let i = 0; i < this.diamondPositions.length; i++){
                this.map[this.diamondPositions[i][1]][this.diamondPositions[i][0]] = 'G';
            }
        },

        // Checks if a tile below a Diamond or Boulder is empty(X), if so sets isMoving to true
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

        // Methods that checks .isMoving is true for a boulder, if true - the boulder falls
        moveBoulders(){
            for(let i = 0; i < this.boulderPositions.length; i++){
                let y = this.boulderPositions[i][1];
                let x = this.boulderPositions[i][0];
                if(this.tiles[y][x].isMoving === true){
                    if(this.canFallTo(x, y)){
                        this.boulderPositions[i][1]++;
                        this.tiles[y][x].tileState = 'X';
                        this.tiles[y][x].isMoving = 'false';

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

        // Methods that checks .isMoving is true for a diamond, if true - the diamonds falls
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

        //Methods that checks if it's empty(X) below a 
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

        //Checks if the tile to the right of a boulder is empty(X), if so allows the player to push it to the right
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

        //Checks if the tile to the left of a boulder is empty(X), if so allows the player to push it to the left
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

        //Checks if a boulder is on top of a another boulder and if it's empty around it, is so the boulder falls
        bouldersFallingFromStack(){
            for(let i = 0; i < this.boulderPositions.length ; i++){
                let x = this.boulderPositions[i][0] 
                let y = this.boulderPositions[i][1]

                if(this.tiles[y+1][x].tileState === 'B' && this.tiles[y][x-1].tileState === 'X' &&
                 (x-1 === this.playerPosition[0] && y+1 === this.playerPosition[1])){

                    //Boulder falling from the right and if the player is there, kills him/her
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]-1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y+1][x-1].tileState = 'X'
                    this.tiles[y][x-1].tileState = 'B'

                }else if(this.tiles[y+1][x].tileState === 'B'  && this.tiles[y][x+1].tileState === 'X' && 
                (x+1 === this.playerPosition[0] && y+1 === this.playerPosition[1])){

                    //Boulder falling from the left and if the player is there, kills him/her
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y+1][x+1].tileState = 'X'
                    this.tiles[y][x+1].tileState = 'B'

                }else if(this.tiles[y+1][x].tileState === 'B' &&  this.tiles[y][x+1].tileState === 'X' &&
                 this.tiles[y+1][x+1].tileState === 'X'){

                    //Boulder to empty space on the right
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]+1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y][x+1].tileState = 'B'

                }else if(this.tiles[y+1][x].tileState === 'B' &&  this.tiles[y][x-1].tileState === 'X' &&
                 this.tiles[y+1][x-1].tileState === 'X'){
                     
                    //Boulder to empty space on the left
                    this.boulderPositions[i][1] = this.boulderPositions[i][1];
                    this.boulderPositions[i][0] = this.boulderPositions[i][0]-1;
                    this.tiles[y][x].tileState = 'X'
                    this.tiles[y][x-1].tileState = 'B'
                }
            }
        },
        
        //Checks if the enemy caught you, if so sets this.gameOver to true and ends the game
        enemyCaugthYouGameOver(){
            if(this.enemyPosition[1]-1 == this.playerPosition[1] && this.enemyPosition[0] == this.playerPosition[0]){
                this.gameOver = true;
            }else if(this.enemyPosition[1]+1 == this.playerPosition[1] && this.enemyPosition[0] == this.playerPosition[0]){
                this.gameOver = true;
            }else if(this.enemyPosition[1] == this.playerPosition[1] && this.enemyPosition[0]-1 == this.playerPosition[0]){
                this.gameOver = true;
            }else if(this.enemyPosition[1] == this.playerPosition[1] && this.enemyPosition[0]+1 == this.playerPosition[0]){
                this.gameOver = true;
            }
            if(this.gameOver){                
                this.setNextLevel();
            }
        },

        //Send the levelTitle to App.js
        getLevelTitle(){
            this.$emit('currentLevelTitle', this.currentLevelTitle);
        },

        //Timeout function that updates the game environment, boulders/enemy etc
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

        //ClearTimout function for updateEnvironments()
        clearUpdateEnvironments() {
            clearTimeout(this.gameTickRateFunction);
        },

        // Timeout function that checks for boulderstacks
        CheckForBoulderStacks(){
            setTimeout(() => {
                this.bouldersFallingFromStack();
                this.CheckForBoulderStacks();
            }, 75)
        },

        //Sets the level that will be displayed/played
        setCurrentLevel(){
            this.diamondCount=0;
            this.enemyMovementCase = 0;
            Store.currentLevelNum = this.currentLevel;
            if(this.currentLevel == this.gameOverLevel){
                this.$emit('stopTimer');
                this.gameOver = true;
            }
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

        // Sets the map size and all the positions of the objects that belong to a level
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
                //Placing the player from playerPositions
                this.map[this.playerPosition[1]][this.playerPosition[0]] = 'P';
                //Placing boulders from boulderPositions        
                this.placeBoulders();
                this.placeDiamonds();                
                this.getLevelTitle();
            }
        },

        //Resets and restarts timeOut-functions that updates the game environment
        setObjectsMove(){
            this.clearUpdateEnvironments();
            this.updateEnvironments();
            this.CheckForBoulderStacks();
        },

        //Loads the next level
        setNextLevel(){
            if(this.gameOver){                
                this.currentLevel = this.gameOverLevel;
            }
            else{
                this.currentLevel += 1;
                if(this.currentLevel == this.gameOverLevel && this.gameOver === false){
                    this.currentLevel = this.winLevel;
                    this.$emit('winCheck')
                    this.$emit('stopTimer');
                }
            }
            this.setCurrentLevel();
        },        

        getTreasureImg(){
            this.$emit('getTreasureImg', 'img/G'+this.style+'.png');
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
        // Watches the gameStarted Boolean in App.js
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

        // Watches the gameReset Boolean in App.js
        resetGame(){
            if(this.resetGame){
                this.currentLevel = 0;
                this.setCurrentLevel();
            }
        },

        // Watches the isTimeLimit Boolean in App.js
        outOfTime(){
            if(this.outOfTime) {
                this.gameOver = true;
                this.setNextLevel();
            }
        },

        totalAmountOfDiamonds() {
            this.$emit('totalAmountOfDiamonds', this.totalAmountOfDiamonds);
        },
        
        diamondCount() {
            this.$emit('getDiamondCount', this.diamondCount);
        },    

        newStyle: function(newStyle) {
            this.style = this.newStyle;
            this.changedStyle = true;
            this.getTreasureImg();
        }
    },    
    created() {
        this.setCurrentLevel();
    }
}