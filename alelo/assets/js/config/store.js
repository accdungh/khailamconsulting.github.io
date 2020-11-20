import Vue from 'vue'
import Vuex from 'vuex'
import AjaxCaller from "./ajax_caller.js"
import App from './app.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classList: [],
    classDetail: {},
    classDetailId: null,
    userSetting: {},
    studentDetail: {},
    noticeMessage: null,
    lang: "en"
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
    setNoticeMessage(state, message) {
      state.noticeMessage = message;
    },
    setLang(state, lang) {
      state.lang = lang;
      App.$i18n.locale = lang;
    },
  },

  actions: {
    fetchClassList({ commit, state }) {
      AjaxCaller.classList().then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedClassList', json.data);
        else commit('setNoticeMessage', json.message);
      })
    },
    fetchClassDetail({ commit, state }, id) {
      AjaxCaller.classDetail(id || state.classDetailId).then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          commit('fetchedClassDetail', json.data);
          commit('selectedClass', id || state.classDetailId);
        }
        else commit('setNoticeMessage', json.message);
      })
    },
    createClass({ commit, state }, classData) {
      return AjaxCaller.createClass(classData).then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          commit('fetchedClassDetail', json.data);
          commit('selectedClass', json.data.id);
        }
        else commit('setNoticeMessage', json.message);
        return resp;
      })
    },
    updateClass({ commit, state }, classData) {
      return AjaxCaller.updateClass(state.classDetailId, classData).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedClassDetail', json.data);
        else commit('setNoticeMessage', json.message);
      })
    },
    deleteClass({ commit, state }) {
      return AjaxCaller.deleteClass(state.classDetailId).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedClassDetail', {});
        else commit('setNoticeMessage', json.message);
      })
    },
    fetchUserSetting({ commit, state }, id) {
      AjaxCaller.userSetting(id).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedUserSetting', json.data || {});
        else commit('setNoticeMessage', json.message);
      })
    },
    updateUserSetting({ commit, state }) {
      AjaxCaller.updateUserSetting(state.userSetting.id, state.userSetting).then((resp) => {
        if (!(json && json.success))
          commit('setNoticeMessage', json.message);
      })
    },
    selectClass({ commit, state }, id) {
      commit('selectedClass', id);
    },
    fetchStudentDetail({ commit, state }, id) {
      return AjaxCaller.studentDetail(id).then((resp) => {
        let json = resp.data;
        if (json && json.success)
          commit('fetchedStudentDetail', json.data);
        else commit('setNoticeMessage', json.message);
      })
    },
    setNoticeMessage({ commit, state }, message) {
      commit('setNoticeMessage', message);
    },
    setLang({ commit, state }, lang) {
      commit('setLang', lang);
    }
  },

  getters: {
    classList: state => state.classList,
    classDetail: state => state.classDetail,
    userSetting: state => state.userSetting,
    studentDetail: state => state.studentDetail,
    noticeMessage: state => state.noticeMessage,
    lang: state => state.lang,
  }
})
