import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    lang: {
        locales: { ru },
        current: 'ru'
    },
    theme: {
        options: { customProperties: true },
        themes: { light: { widgetTabColor: "#E0E0E0" }, dark: { widgetTabColor: "#424242" } }
    }
});
