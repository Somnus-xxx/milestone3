import Vue from 'nativescript-vue';

import PropertyHome from './components/PropertyHome';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({

    template: `
        <Frame>
            <PropertyHome />
        </Frame>`,

    components: {
        PropertyHome
    }
}).$start();