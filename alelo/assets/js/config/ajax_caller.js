import axios from "axios";

const API_PATH = window.location.href.replace(/(.+)\/[^\/]*#.*/, '$1');

export default {
  classList() {
    return axios.get(`${API_PATH}/example_data/list.json`, {
      withCredentials: true
    });
  },
  archivedClassList() {
    return axios.get(`${API_PATH}/example_data/archived_list.json`, {
      withCredentials: true
    });
  },
  classDetail() {
    return axios.get(`${API_PATH}/example_data/detail.json`, {
      withCredentials: true
    });
  },
  createClass(data) {
    // FIXME: Use method POST with real API
    return axios.get(`${API_PATH}/example_data/detail.json`, data, {
      withCredentials: true
    });
  },
  updateClass(id, data) {
    // FIXME: Use method PUT with real API
    return axios.get(`${API_PATH}/example_data/detail.json`, data, {
      withCredentials: true
    });
  },
  deleteClass(id) {
    // FIXME: Use method DELETE with real API
    return axios.get(`${API_PATH}/example_data/detail.json`, {
      withCredentials: true
    });
  },
  userSetting(id) {
    return axios.get(`${API_PATH}/example_data/user.json`, {
      withCredentials: true
    });
  },
  updateUserSetting(id, data) {
    return axios.post(`${API_PATH}/example_data/user.json`, data, {
      withCredentials: true
    });
  },
  studentDetail(id) {
    return axios.get(`${API_PATH}/example_data/student_detail.json`, {
      withCredentials: true
    });
  }
}
