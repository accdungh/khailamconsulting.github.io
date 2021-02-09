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
    lang: "en",
    ajaxCount: 0
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
      App.changeLang(lang);
    },
    changeAjaxCount(state, number) {
      let ajaxCount = state.ajaxCount + number;
      if (ajaxCount < 0) ajaxCount = 0;
      state.ajaxCount = ajaxCount;
    },
  },

  actions: {
    fetchClassList({ commit, state }) {
      AjaxCaller.classList().then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          if (json.message)
            commit('setNoticeMessage', json.message);
          commit('fetchedClassList', json.data.activeClasses);
        } else commit('setNoticeMessage', json.message);
      })
    },
    fetchClassDetail({ commit, state }, id) {
      commit('fetchedClassDetail', {});
      AjaxCaller.classDetail(id || state.classDetailId).then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          if (json.message)
            commit('setNoticeMessage', json.message);
          commit('fetchedClassDetail', json.data);
          commit('selectedClass', id || state.classDetailId);
        }
        else commit('setNoticeMessage', json.message);
      })
    },
    createClass({ commit, dispatch }, classData) {
      return AjaxCaller.createClass(classData).then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          commit('fetchedClassDetail', {});
          commit('selectedClass', json.data.id);
          dispatch('fetchClassList');
        }
        if (json && json.message) commit('setNoticeMessage', json.message);
        return resp;
      })
    },
    updateClass({ commit, state, dispatch }, classData) {
      return AjaxCaller.updateClass(state.classDetailId, classData).then((resp) => {
        dispatch('classDetailPostAction', resp.data)
      })
    },
    addCourse({ commit, state, dispatch }, classData) {
      return AjaxCaller.addCourse(state.classDetailId, classData).then((resp) => {
        dispatch('classDetailPostAction', resp.data)
      })
    },
    addStudent({ commit, state, dispatch }, classData) {
      return AjaxCaller.addStudent(state.classDetailId, classData).then((resp) => {
        dispatch('classDetailPostAction', resp.data)
      })
    },
    removeStudent({ state, dispatch, commit }, studentIds) {
      return AjaxCaller.removeStudent(state.classDetailId, studentIds).then((resp) => {
        let json = resp.data;
        if (json && json.message) commit('setNoticeMessage', json.message);
        dispatch('fetchClassDetail', state.classDetailId);
      })
    },
    resendInvitation({ state, commit }, studentIds) {
      return AjaxCaller.resendInvitation(state.classDetailId, studentIds).then((resp) => {
        let json = resp.data;
        if (json && json.message) commit('setNoticeMessage', json.message);
      })
    },
    classDetailPostAction({ commit, dispatch }, json) {
      if (json && json.success) dispatch('fetchClassDetail', json.data.id)
      if (json && json.message) commit('setNoticeMessage', json.message);
    },
    deleteClass({ commit, state, dispatch }) {
      return AjaxCaller.deleteClass(state.classDetailId).then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          if (json.message)
            commit('setNoticeMessage', json.message);
          commit('fetchedClassDetail', {});
          commit('selectedClass', null);
          dispatch('fetchClassList');
        }
        else commit('setNoticeMessage', json.message);
      })
    },
    fetchUserSetting({ commit, state }, id) {
      AjaxCaller.userSetting(id).then((resp) => {
        let json = resp.data;
        if (json && json.success) {
          if (json.message)
            commit('setNoticeMessage', json.message);
          commit('fetchedUserSetting', json.data || {});
        } else commit('setNoticeMessage', json.message);
      })
    },
    updateUserSetting({ commit, state }) {
      AjaxCaller.updateUserSetting(state.userSetting.id, state.userSetting).then((resp) => {
        let json = resp.data;
        if (!(json && json.success)) {
          commit('setNoticeMessage', json.message);
        }
      })
    },
    selectClass({ commit, state }, id) {
      commit('selectedClass', id);
    },
    fetchStudentDetail({ commit, state }, queries) {
      commit('fetchedStudentDetail', {});

      return AjaxCaller.studentDetail(queries.id, queries.classId).then((resp) => {
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
    },
    changeAjaxCount({ commit }, number) {
      commit('changeAjaxCount', number);
    },
  },

  getters: {
    activeClasses: state => state.classList.filter(i => i.active),
    archivedClasses: state => state.classList.filter(i => !i.active),
    classDetail: state => state.classDetail,
    classDetailId: state => state.classDetailId,
    userSetting: state => state.userSetting,
    studentDetail: state => state.studentDetail,
    noticeMessage: state => state.noticeMessage,
    lang: state => state.lang,
    ajaxCount: state => state.ajaxCount,
  }
})
