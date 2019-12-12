import Game from './Game.js'
import GameInfoControl from './GameInfoControl.js'
import ThemeMenu from './ThemeMenu.js'

export default {
    components: {
        Game,
        GameInfoControl,
        ThemeMenu
    },
    template: `
    <div id="app">
        <div id="counter">
            <div id="keyGuide">
                <div class="keyGuideList">
                    <ul class="keyCodeList"><b>Movement</b>
                        <li><span class="label">Up</span> <div class="keybImg"><img src="img/w_key.png" /></div> or <div class="keybImg"><img src="img/up.png" /></div></li>
                        <li><span class="label">Down</span> <div class="keybImg"><img src="img/s.png" /></div> or <div class="keybImg"><img src="img/down.png" /></div></li>
                        <li><span class="label">Left</span> <div class="keybImg"><img src="img/a.png" /></div> or <div class="keybImg"><img src="img/left.png" /></div></li>
                        <li><span class="label">Right</span> <div class="keybImg"><img src="img/d.png" /></div> or <div class="keybImg"><img src="img/right.png" /></div></li>
                    </ul>
                    <ul class="keyCodeList"><b>Theme</b>
                        <li><span class="label">Default</span> <div class="keybImg"><img src="img/m.png" /></div></li>
                        <li><span class="label">Frozen</span> <div class="keybImg"><img src="img/e.png" /></div></li>
                        <li><span class="label">Retro</span> <div class="keybImg"><img src="img/r.png" /></div></li>
                    </ul>
                </div>
            </div>
            <div id='game'>
                <GameInfoControl 
                :currentLevelTitle="currentLevelTitle"
                :totalAmountOfDiamonds="totalAmountOfDiamonds"
                :diamondCount="diamondCount"
                :levelComplete='levelComplete'
                :timerInAppStopped='timerInAppStopped'
                :playerWon='playerWon'                
                :treasureImg='treasureImg'
                @startGame="startGame"
                @resetGame="resetGame"
                @outOfTime="outOfTime"
                />

                <Game
                @getDiamondCount='getDiamondCount'
                @totalAmountOfDiamonds='diamonds'
                @getTreasureImg='getTreasureImg'
                @currentLevelTitle='getLevelTitle'
                @stopTimer='stopTimer'
                @winCheck='winCheck'
                :newStyle='style'
                :startGame="gameStarted"
                :resetGame="gameReset"
                :outOfTime="isTimeLimit"
                />
            </div>
            
            <div id='themeGallery'>
                <ThemeMenu
                    @changeTheme="changeTheme"
                    id='themeMenu'                    
                    />
            </div>    
        </div>
    </div>       
    `,
    data() {
        return {
            diamondCount: 0,
            totalAmountOfDiamonds: 0,
            treasureImg: 'img/Gd.png',
            currentLevelTitle: '',
            gameStarted: Boolean,            
            gameOver: Boolean,
            gameReset: Boolean,
            isTimeLimit: Boolean,
            timerInAppStopped: Boolean,
            levelComplete: false,
            playerWon: false,
            style: ''
        }
    },
    created() {
    },
    methods: {
        // Keeps track of how many diamonds a player has picked up on the current level
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
        },
        //Updates the 'G'-image in GameInfoControl
        getTreasureImg(treasureImg){
            this.treasureImg = treasureImg;
        },
        // Shows how many diamonds in total the current level beeing played has
        diamonds(totalAmountOfDiamonds) {
            this.totalAmountOfDiamonds = totalAmountOfDiamonds;
        },
        // Shows the number or the level currently being played
        getLevelTitle(currentLevelTitle) {
            this.currentLevelTitle = currentLevelTitle;
        },
        //Starts the game when the startGameButton in GameInfoControl.js is pressed 
        startGame() {
            this.gameReset = false;
            this.gameStarted = true;
            this.levelComplete = false;
            this.playerWon = false;
        },
        //Resets the game when the resetGameButton in GameInfoControl.js is pressed 
        resetGame() {
            this.isTimeLimit = false;
            this.gameStarted = false;
            this.gameReset = true;
            this.timerInAppStopped = false;
        },
        outOfTime(){
            this.isTimeLimit = true;
        },
        stopTimer(){
            this.timerInAppStopped = true;
        },
        //Checks if the player won the game or not
        winCheck(){
            this.playerWon = true;
        },        
        changeTheme(style){          
            this.style = style;
        },
    }
}