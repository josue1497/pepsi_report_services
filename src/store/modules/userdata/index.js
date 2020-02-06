import { Mutation, Action } from './../types'
import loginService from './../../../services/loginService'
import userService from './../../../services/userServices'

import route from '../../../constants/paths';

const userData = {
  namespaced: true,
  state: {
    access_token: null,
    user: null,
    user_logged: false,
    user_route: {}
  },
  mutations: {
    USER_DATA: (state, { user, access_token }) => {
      state.user = user
      state.access_token = access_token
    },
    LOGOUT_USER: (state) => {
      state.user = null
      state.access_token = ''
      state.user_logged = false
    },
    USER_LOGGED: (state, value) => {
      state.user_logged = value
    },
    USER_ROUTE: (state, route) => {
      state.user_route = route
    }
  },
  actions: {
    login({ commit }, authData) {
      return new Promise((resolve, reject) => {
        loginService.login(authData).then(response => {
          if(response.user){
            commit('USER_DATA', { user: response.user, access_token: response.access_token });
            commit('USER_LOGGED', true);
            commit('USER_ROUTE', response.user.role_id === 1 ? route.admin_routes : route.user_route)
          }else{
            console.error(response);
            commit('USER_LOGGED', false);
          }
          resolve(response);
        }).catch(err => {
          console.error(err);
          commit('USER_LOGGED', false);
          reject(err);
        })
      }
      )
    },
    update({ commit }, user) {
      return new Promise((resolve, reject) => {
        userService.updateUser(user, user.id).then(response => {
          if (response.status === 200) {
            commit('USER_DATA', { user: user, access_token: user.access_token });
          }
          resolve(response);
        }).catch(err => {
          console.error(err);
          reject(err);
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
