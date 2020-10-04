import Vue from 'vue'
import Vuex from 'vuex'
import AjaxCaller from "./ajax_caller.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classList: [],
    classDetail: {},
    classDetailId: null,
    userSetting: {}
  },

  mutations: {
    fetchedClassList(state, data) {
      state.classList = data;
    },
    fetchedClassDetail(state, data) {
      state.classDetail = data;
    },
    selectedClass(state, data) {
      state.classDetailId = data;
    },
    fetchedUserSetting(state, data) {
      state.userSetting = data;
    },
  },

  actions: {
    fetchClassList({ commit, state }) {
      AjaxCaller.classList().then(({ data }) => {
        commit('fetchedClassList', data);
      })
    },
    fetchClassDetail({ commit, state }, id) {
      AjaxCaller.classDetail(id).then(({ data }) => {
        commit('fetchedClassDetail', data);
      })
    },
    fetchUserSetting({ commit, state }, id) {
      AjaxCaller.userSetting(id).then(({ data }) => {
        commit('fetchedUserSetting', data);
      })
    },
    updateUserSetting({ commit, state }) {
      AjaxCaller.updateUserSetting(state.userSetting.id, state.userSetting).then(({ data }) => { })
    },
    selectClass({ commit, state }, id) {
      commit('selectedClass', id);
    },
  },

  getters: {
    classList: state => state.classList,
    classDetail: state => state.classDetail,
    userSetting: state => state.userSetting
  }
})
