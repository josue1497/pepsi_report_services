import { set, toggle } from './../../../utils/vuex';

const app = {
    namespaced : true,
    state: {
        image: '/social-share.jpg',
        logo: '/logo.png'
    },
    mutations: {
        setDrawer: set('drawer'),
        setImage: set('image'),
        setColor: set('color'),
        toggleDrawer: toggle('drawer')
    }
}

export default app