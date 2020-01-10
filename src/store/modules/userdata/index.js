import { Mutation, Action } from './../types'
import loginService from './../../../services/loginService'
import route from '../../../constants/paths';

const userData = {
  namespaced : true,
  state: {
    access_token: null,
    user: null,
    user_logged: false,
    user_route: {}
  },
  mutations: {
    USER_DATA: (state, {user, access_token}) => {
      state.user = user
      state.access_token = access_token
    },
    LOGOUT_USER: (state) => {
      state.user = null
      state.access_token = ''
      state.user_logged=false
    },
    USER_LOGGED: (state, value) => {
      state.user_logged=value
    },
    USER_ROUTE: (state, route) => {
      state.user_route=route
    }
  },
  actions: {
    login({ commit }, authData) {
      return new Promise((resolve, reject) => {
        loginService.login(authData).then(response => {
          commit('USER_DATA',{user:response.user, access_token:response.access_token});
          commit('USER_LOGGED', true);
          commit('USER_ROUTE',response.user.role_id===1?route.admin_routes:route.user_route)
          resolve(response);
        }).catch(err => {
          console.error(err);
          commit('USER_LOGGED', false);
          reject(err);
        })
      }
      )
    },
    [Action.REGISTER]({ commit }, user) {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(() => {
            firebase.auth().onAuthStateChanged(authUser => {
              commit(`${[Mutation.LOGIN]}`, authUser);
              resolve()
            });
          })
          .catch(err => {
            reject(err.message)
          });
      })
    },
    logout({ commit }) {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(authUser => {
          commit(`LOGOUT_USER`, authUser);
        });
      }
      );
    },
  },
  getters: {
    loggedIn: state => !!state.user
  }
}

export default userData;
