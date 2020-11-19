import axios from "axios";

const API_PATH = "https://sim-dev.alelo.com/api/dummy_instructor";

export default {
  classList() {
    //return axios.get(`${API_PATH}/example_data/list.json`, {
    return axios.get(`${API_PATH}/class/list`, {
      withCredentials: true
    });
  },
  archivedClassList() {
    return axios.get(`${API_PATH}/class/archive/list`, {
      withCredentials: true
    });
  },
  classDetail(id) {
    //  return axios.get(`${API_PATH}/example_data/detail.json`, {
    return axios.get(`${API_PATH}/class/view/$` + id, {
      withCredentials: true
    });
  },
  createClass(data) {
    // FIXME: Use method POST with real API
    return axios.post(`${API_PATH}/class/create`, data, {
      withCredentials: true,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  updateClass(id, data) {
    console.log(1, data)
    // FIXME: Use method PUT with real API
    return axios.post(`${API_PATH}/class/update/` + id, data, {
      withCredentials: true,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  deleteClass(id) {
    // FIXME: Use method DELETE with real API
    return axios.post(`${API_PATH}/class/delete/` + id, {
      withCredentials: true,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  userSetting(id) {
    return axios.get(`${API_PATH}/user/info`, {
      withCredentials: true
    });
  },
  updateUserSetting(id, data) {
    return axios.post(`${API_PATH}/user/info`, data, {
      withCredentials: true,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  studentDetail(id) {
    return axios.get(`${API_PATH}/student/` + id, {
      withCredentials: true
    });
  },
  userInvitation(data) {
    return axios.post(`${API_PATH}/class/invite`, {
      withCredentials: true,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  }
}
