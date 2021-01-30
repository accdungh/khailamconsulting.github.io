import axios from "axios";

const API_PATH = "https://sim-dev.alelo.com/api/dummy_instructor"
/** for the production use */
//const API_PATH = "/api/instructor";

const configHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};


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
    return axios.get(`${API_PATH}/class/view/` + id, {
      withCredentials: true
    });
  },
  createClass(data) {
    // FIXME: Use method POST with real API
    return axios.post(`${API_PATH}/class/create`, data, {
      withCredentials: true,
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  updateClass(id, data) {
    // FIXME: Use method PUT with real API
    return axios.post(`${API_PATH}/class/update/` + id, data, {
      withCredentials: true,
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  deleteClass(id) {
    // FIXME: Use method DELETE with real API
    return axios.post(`${API_PATH}/class/delete/` + id, {}, {
      withCredentials: true,
      headers: configHeaders,
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
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  studentDetail(id, classId) {
    return axios.get(`${API_PATH}/student/` + id + '/' + classId, {
      withCredentials: true
    });
  },
  userInvitation(data) {
    return axios.post(`${API_PATH}/class/invite`, {}, {
      withCredentials: true,
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  addCourse(id, data) {
    return axios.post(`${API_PATH}/class/addcourse/${id}`, data, {
      withCredentials: true,
      headers: configHeaders,
    });
  },
  addStudent(id, data) {
    return axios.post(`${API_PATH}/class/addstudent/${id}`, data, {
      withCredentials: true,
      headers: configHeaders,
    });
  },
}

