import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import preset from './default-preset/preset'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    options: {
      customProperties: true,
      variations: false,
    },
    themes: {
      dark: {
        bg: '#3b3559'

      },
      light: {
        bg: '#f6f6f6'

      }
    }
  },
})
