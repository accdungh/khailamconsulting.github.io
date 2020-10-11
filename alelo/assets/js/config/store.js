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
      AjaxCaller.classList().then(({ data }) => {
        commit('fetchedClassList', data);
      })
    },
    fetchClassDetail({ commit, state }, id) {
      AjaxCaller.classDetail(id).then(({ data }) => {
        commit('fetchedClassDetail', data);
      })
    },
    createClass({ commit, state }, classData) {
      return AjaxCaller.createClass(classData).then(({ data }) => {
        commit('fetchedClassDetail', data);
        commit('selectedClass', data.id);
      })
    },
    updateClass({ commit, state }, classData) {
      return AjaxCaller.updateClass(state.classDetailId, classData).then(({ data }) => {
        commit('fetchedClassDetail', data);
      })
    },
    deleteClass({ commit, state }) {
      return AjaxCaller.deleteClass(state.classDetailId).then(({ data }) => {
        commit('fetchedClassDetail', {});
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
    fetchStudentDetail({ commit, state }, id) {
      return AjaxCaller.studentDetail(id).then(({ data }) => {
        commit('fetchedStudentDetail', data);
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
