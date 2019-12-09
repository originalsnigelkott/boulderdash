export default{
    template:`
        <div id="gallery">
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
        </div>
    `,
    data(){
        return{
            theme: ''
        }
    },
    methods:{
        changeThemeToFrozen(){
            this.theme = 'e'
            this.$emit('changeTheme', this.theme)
        },
        changeThemeToDefault(){
            this.theme = 'd'
            this.$emit('changeTheme', this.theme)
        }
    }
}