import axios from "axios";

const API_PATH = '';

export default {
  classList() {
    return axios.get(`${API_PATH}/example_data/list.json`, {
      withCredentials: true
    });
  },
  classDetail() {
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
  }
}
