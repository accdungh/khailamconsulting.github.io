import Vue from 'vue'
import Vuex from 'vuex'
import AjaxCaller from "./ajax_caller.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classList: [],
    classDetail: {},
    classDetailId: null,
    userSetting: {},
    studentDetail: {}
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
    fetchedStudentDetail(state, data) {
      state.studentDetail = data;
    },
  },

  actions: {
    fetchClassList({ commit, state }) {
      AjaxCaller.classList().then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedClassList', json.data);
      })
    },
    fetchClassDetail({ commit, state }, id) {
      AjaxCaller.classDetail(id || state.classDetailId).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedClassDetail', json.data);
      })
    },
    createClass({ commit, state }, classData) {
      return AjaxCaller.createClass(classData).then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          commit('fetchedClassDetail', json.data);
          commit('selectedClass', json.data.id);
        }

        return resp;
      })
    },
    updateClass({ commit, state }, classData) {
      return AjaxCaller.updateClass(state.classDetailId, classData).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedClassDetail', json.data);
      })
    },
    deleteClass({ commit, state }) {
      return AjaxCaller.deleteClass(state.classDetailId).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedClassDetail', {});
      })
    },
    fetchUserSetting({ commit, state }, id) {
      AjaxCaller.userSetting(id).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedUserSetting', json.data);
      })
    },
    updateUserSetting({ commit, state }) {
      AjaxCaller.updateUserSetting(state.userSetting.id, state.userSetting).then((resp) => { })
    },
    selectClass({ commit, state }, id) {
      commit('selectedClass', id);
    },
    fetchStudentDetail({ commit, state }, id) {
      return AjaxCaller.studentDetail(id).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedStudentDetail', json.data);
      })
    },
  },

  getters: {
    classList: state => state.classList,
    classDetail: state => state.classDetail,
    userSetting: state => state.userSetting,
    studentDetail: state => state.studentDetail,
  }
})
