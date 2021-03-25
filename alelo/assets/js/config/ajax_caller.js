import axios from "axios";
import App from './app.js';

const API_PATH = "https://sim-dev.alelo.com/api/dummy_instructor"
/** for the production use */
//const API_PATH = "/api/instructor";

const configHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

axios.interceptors.request.use(function (config) {
  App.changeAjaxCount(1);
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  App.changeAjaxCount(-1);
  return response;
}, function (error) {
  App.changeAjaxCount(-1);
  return Promise.reject(error);
});

export default {
  classList() {
    //return axios.get(`${API_PATH}/example_data/list.json`, {
    return axios.get(`${API_PATH}/class/list`, {});
  },
  archivedClassList() {
    return axios.get(`${API_PATH}/class/archive/list`, {});
  },
  classDetail(id) {
    //  return axios.get(`${API_PATH}/example_data/detail.json`, {
    return axios.get(`${API_PATH}/class/view/` + id, {});
  },
  createClass(data) {
    return axios.post(`${API_PATH}/class/create`, data, {
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  updateClass(id, data) {
    return axios.post(`${API_PATH}/class/update/` + id, data, {
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  deleteClass(id) {
    return axios.post(`${API_PATH}/class/delete/` + id, {}, {
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  userSetting(id) {
    return axios.get(`${API_PATH}/user/info`, {});
  },
  updateUserSetting(id, data) {
    return axios.post(`${API_PATH}/user/info`, data, {
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  studentDetail(id, classId) {
    return axios.get(`${API_PATH}/student/` + id + '/' + classId, {});
  },
  userInvitation(data) {
    return axios.post(`${API_PATH}/class/invite`, {}, {
      headers: configHeaders,
      transformRequest: [(data) => {
        return JSON.stringify(data)
      }]
    });
  },
  addCourse(id, data) {
    return axios.post(`${API_PATH}/class/addcourse/${id}`, data, {
      headers: configHeaders,
    });
  },
  addStudent(id, data) {
    return axios.post(`${API_PATH}/class/addstudent/${id}`, data, {
      headers: configHeaders,
    });
  },
  removeStudent(classId, studentIds) {
    return axios.post(`${API_PATH}/class/deletestudent/${classId}`, {
      students: studentIds
    }, {
      headers: configHeaders,
    });
  },
  resendInvitation(classId, studentIds) {
    return axios.post(`${API_PATH}/class/resendinvitation/${classId}`, {
      students: studentIds
    }, {
      headers: configHeaders,
    });
  },
  classReport(classId) {
    return axios.post(`${API_PATH}/class/report`, {
      classId
    }, {
      headers: configHeaders,
    });
  },
  studentCourseReport(classId, studentId) {
    return axios.post(`${API_PATH}/student/coursereport`, {
      classId,
      studentId
    }, {
      headers: configHeaders,
    });
  },
  studentScenarioReport(classId, studentId) {
    return axios.post(`${API_PATH}/student/scenarioreport`, {
      classId,
      studentId
    }, {
      headers: configHeaders,
    });
  },
}
