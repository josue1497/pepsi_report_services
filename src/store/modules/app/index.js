import { set, toggle } from './../../../utils/vuex';

const app = {
    namespaced: true,
    state: {
        image: '/social-share.jpg',
        logo: '/logo.png',
        goal_calls: null,
        goal_orders: null,
    },
    mutations: {
        setDrawer: set('drawer'),
        setImage: set('image'),
        setColor: set('color'),
        toggleDrawer: toggle('drawer'),
        set_goals: (state, { goal_calls, goal_orders }) => {
            state.goal_calls = goal_calls
            state.goal_orders = goal_orders
        },
    }
}

export default app