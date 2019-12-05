import Timer from './Timer.js'
import DiamondCounter from './DiamondCounter.js'
import LevelBox from './LevelBox.js'

export default{
    components: {
        Timer,
        DiamondCounter,
        LevelBox,
    },
    props: {
        currentLevelTitle: '',
        diamondCount: 0,
        totalAmountOfDiamonds: 0,
    },
    template: `
        <div id="gameInfoBox">
            <Timer 
            id='gameTimer'
            />

            <DiamondCounter 
            :diamondCount='diamondCount'
            :totalAmountOfDiamonds='totalAmountOfDiamonds'
            />

            <LevelBox
            :currentLevelTitle= 'currentLevelTitle'
            />
        </div>
    `,
}