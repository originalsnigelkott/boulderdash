export default{
    template:`
    <div id='themeMenu'>
        <div class="styleinfo">
            <div class="imgbox">                
                <img src="img/style_default.jpg"
                @click='changeThemeToDefault' />
            </div>
        </div>
        <div class="styleinfo">
            <div class="imgbox">                
                <img src="img/style_frozen.jpg"
                @click='changeThemeToFrozen' />
            </div>
        </div>
        <div class="styleinfo">
            <div class="imgbox">                
                <img src="img/style_retro.jpg"
                @click='changeThemeToRetro' />
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            theme: ''
        }
    },
    methods:{
        //Changes the theme of the map to Frozen
        changeThemeToFrozen(){
            this.theme = 'e'
            this.$emit('changeTheme', this.theme)
        },
        //Changes the theme of the map to Default
        changeThemeToDefault(){
            this.theme = 'd'
            this.$emit('changeTheme', this.theme)
        },
        //Changes the theme of the map to Retro
        changeThemeToRetro(){
            this.theme = 'r'
            this.$emit('changeTheme', this.theme)
        }
    }
}