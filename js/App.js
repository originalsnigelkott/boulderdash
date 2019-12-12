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
    <div id="app" class="container">
        <div id="counter" class="container">
            <div id="keyGuide" class="container">
                <div class="keyGuideList">
                    <ul class="keyCodeList"><b>Movement</b>
                        <li class="container"><span class="label">Up</span> <div class="keybImg"><img src="img/w_key.png" /></div> or <div class="keybImg"><img src="img/up.png" /></div></li>
                        <li class="container"><span class="label">Down</span> <div class="keybImg"><img src="img/s.png" /></div> or <div class="keybImg"><img src="img/down.png" /></div></li>
                        <li class="container"><span class="label">Left</span> <div class="keybImg"><img src="img/a.png" /></div> or <div class="keybImg"><img src="img/left.png" /></div></li>
                        <li class="container"><span class="label">Right</span> <div class="keybImg"><img src="img/d.png" /></div> or <div class="keybImg"><img src="img/right.png" /></div></li>
                    </ul>
                    <ul class="keyCodeList"><b>Theme</b>
                        <li class="container"><span class="label">Default</span> <div class="keybImg"><img src="img/m.png" /></div></li>
                        <li class="container"><span class="label">Frozen</span> <div class="keybImg"><img src="img/e.png" /></div></li>
                        <li class="container"><span class="label">Retro</span> <div class="keybImg"><img src="img/r.png" /></div></li>
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
                @resetTimerOnLevelComplete='resetTimerOnLevelComplete'
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
        getDiamondCount(diamondCount) {
            this.diamondCount = diamondCount;
        },
        getTreasureImg(treasureImg){
            //console.log(treasureImg);
            this.treasureImg = treasureImg;
        },
        diamonds(totalAmountOfDiamonds) {
            this.totalAmountOfDiamonds = totalAmountOfDiamonds;
        },
        getLevelTitle(currentLevelTitle) {
            this.currentLevelTitle = currentLevelTitle;
        },
        startGame() {
            this.gameReset = false;
            this.gameStarted = true;
            this.levelComplete = false;
            this.playerWon = false;
        },
        resetGame() {
            this.isTimeLimit = false;
            this.gameStarted = false;
            this.gameReset = true;
            this.timerInAppStopped = false;
        },
        outOfTime(){
            this.isTimeLimit = true;
        },
        resetTimerOnLevelComplete(){
            this.levelComplete = true;
        },
        stopTimer(){
            this.timerInAppStopped = true;
        },
        winCheck(){
            this.playerWon = true;
        },        
        changeTheme(style){          
            //console.log('app Theme changed '+style)
            this.style = style;
        },
    }
}