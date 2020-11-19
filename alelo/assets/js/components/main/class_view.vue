<template>
  <!-- Class Viewer-->
  <div
    class="tab-pane class-viewer mt-4"
    id="classviewer"
    role="tabpanel"
    aria-labelledby="classviewer-tab"
  >
    <form>
      <div class="form-group">
        <div class="row">
          <div class="col-md-13" v-if="!editMode">
            <h2 class="class-title d-inline">{{ classDetail.name }}</h2>
            <a
              class="edit-link d-inline f-n-20 ml-2"
              href="javascript:void(0)"
              @click="editMode = true"
              >Edit</a
            >
          </div>
          <div class="col-md-13" v-else>
            <h2 class="class-title d-inline form-inline">
              <input
                type="text"
                id=""
                class="form-control"
                v-model="classDetail.name"
              />
            </h2>
            <a
              class="edit-link d-inline f-n-20 ml-2"
              href="javascript:void(0)"
              @click="save()"
              >Save</a
            >
          </div>
          <div class="col-md-11 clearfix">
            <div class="wrap-date float-right">
              <div class="input-group start-date">
                <label class="f-m-14 blue-light ml-3">Start</label>
                <input
                  class="datepicker-startdate"
                  :value="classDetail.startDate"
                  data-date-format="mm/dd/yyyy"
                />
              </div>

              <div class="input-group end-date">
                <label class="f-m-14 blue-light ml-3">End</label>
                <input
                  class="datepicker-enddate"
                  :value="classDetail.endDate"
                  data-date-format="mm/dd/yyyy"
                />
              </div>

              <div class="text-danger">
                <small class="date-error-message"></small>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
        </div>
        <textarea
          rows="1"
          v-model="classDetail.description"
          class="form-control auto-size"
        />
      </div>
    </form>

    <div class="wrap-course mb-3">
      <h3 class="f-m-20 d-inline blue-bold">Courses</h3>
      <span class="d-inline float-right f-n-14 blue-light mr-4"
        >Hover on any title for more information</span
      >
    </div>

    <div class="wrap-item">
      <div class="scrollbar scrollbar-inner">
        <table class="table table-striped table-custom header-fixed">
          <thead>
            <tr>
              <th class="text-center">
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-container="body"
                  data-placement="top"
                  title="Click a course name to see objectives and CEFR statements."
                  >Accessible</a
                >
              </th>
              <th>
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-container="body"
                  data-placement="top"
                  title="Click a course name to see objectives and CEFR statements."
                  >Course Name</a
                >
              </th>
              <th>
                <a
                  href="#"
                  data-toggle="tooltip"
                  data-container="body"
                  data-placement="top"
                  title="Click the icon to play the simulations yourself."
                  >Play Simulations</a
                >
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(course, index) in classDetail.activeCourse"
              :key="'active-course' + index"
            >
              <td align="center">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    id="blankCheckbox"
                    value="option1"
                    aria-label="..."
                  />
                </div>
              </td>
              <td class="f-m-18 blue-bold">
                <a
                  href="#course-info"
                  data-toggle="modal"
                  data-target="#course-info"
                  @click="selectedCourse = course"
                  >{{ course.name }}</a
                >
              </td>
              <td><a href="#" class="launch_ap"></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="wrap-student mb-3">
      <h3 class="f-m-20 d-inline blue-bold">Student List</h3>
      <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold"
        ><i class="fa fa-download"></i> Download</span
      >
    </div>
    <div class="wrap-item">
      <div class="scrollbar scrollbar-inner">
        <table
          class="table table-striped table-custom table-lst-student header-fixed"
        >
          <thead>
            <tr>
              <th class="text-center pl-4 pr-4" scope="col">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    value="option1"
                    aria-label="..."
                    v-model="selectedAllStudent"
                    @change="selectAllStudent()"
                  />
                </div>
              </th>
              <th scope="col">
                <a
                  href="javascript:void(0)"
                  @click="sortStudent('lastName')"
                  class="student-sorter"
                >
                  Last Name
                  <i
                    class="fa"
                    :class="{
                      'fa-chevron-down': studentOrder.lastName,
                      'fa-chevron-up': !studentOrder.lastName,
                    }"
                  ></i>
                </a>
              </th>
              <th scope="col">
                <a
                  href="javascript:void(0)"
                  @click="sortStudent('firstName')"
                  class="student-sorter"
                >
                  First Name
                  <i
                    class="fa"
                    :class="{
                      'fa-chevron-down': studentOrder.firstName,
                      'fa-chevron-up': !studentOrder.firstName,
                    }"
                  ></i>
                </a>
              </th>
              <th scope="col">
                <a
                  href="javascript:void(0)"
                  @click="sortStudent('lastLogin', 'date')"
                  class="student-sorter"
                >
                  Last Login
                  <i
                    class="fa"
                    :class="{
                      'fa-chevron-down': studentOrder.lastLogin,
                      'fa-chevron-up': !studentOrder.lastLogin,
                    }"
                  ></i>
                </a>
              </th>
              <th scope="col">
                <a
                  href="javascript:void(0)"
                  @click="sortStudent('totalTime', 'time')"
                  class="student-sorter"
                >
                  Total Time
                  <i
                    class="fa"
                    :class="{
                      'fa-chevron-down': studentOrder.totalTime,
                      'fa-chevron-up': !studentOrder.totalTime,
                    }"
                  ></i>
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(student, index) in classDetail.students"
              :key="'active-student' + index"
            >
              <td class="text-center">
                <div class="form-check">
                  <input
                    class="form-check-input position-static"
                    type="checkbox"
                    aria-label="..."
                    v-model="student.selected"
                  />
                </div>
              </td>
              <td class="font-weight-bold">
                <a
                  href="javascript:void(0)"
                  @click="
                    $router.push({
                      name: 'ClassStudent',
                      params: { classId: $route.params.id, id: student.id },
                    })
                  "
                  >{{ student.lastName }}</a
                >
              </td>
              <td class="font-weight-bold">{{ student.firstName }}</td>
              <td>{{ student.lastLogin | timeParser }}</td>
              <td>{{ student.totalTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="group-button clearfix">
      <a
        href="#delete-class"
        class="float-left f-m-18"
        data-toggle="modal"
        data-target="#delete-class"
      >
        Delete Your Class</a
      >
      <a
        v-if="!studentSelected"
        href="#add_student_modal"
        data-toggle="modal"
        data-target="#add_student_modal"
        class="btn-created float-right"
        >Add Students</a
      >

      <a
        v-if="studentSelected"
        href="#resent-invitation"
        data-toggle="modal"
        data-target="#resent-invitation"
        class="btn-created btn-red float-right"
        >Resend Invitation(s)</a
      >

      <a
        v-if="studentSelected"
        href="#removestudent"
        data-toggle="modal"
        data-target="#removestudent"
        class="btn-created btn-red float-right"
        >Remove Student(s)</a
      >
    </div>

    <!-- Modal-delele-Class -->
    <div
      class="modal fade"
      id="course-info"
      tabindex="-1"
      role="dialog"
      aria-labelledby="course-infoLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="course-infoLabel">Course Objectives</h2>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Select a simulation for more information</h3>
            <div id="accordion">
              <div
                class="card"
                v-for="(simulation, index) in selectedCourse.simulations"
                :key="'simulation' + index"
              >
                <div class="card-header" id="headingOne">
                  <h3 class="mb-0">
                    <button
                      class="btn btn-link"
                      data-toggle="collapse"
                      :data-target="'#simulation' + index"
                      aria-expanded="true"
                      :aria-controls="'simulation' + index"
                    >
                      {{ simulation.title }}
                    </button>
                  </h3>
                </div>

                <div
                  :id="'simulation' + index"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div class="card-body">
                    <div v-html="simulation.description"></div>
                    <!-- <h4 class="f-m-18 blue-bold">
                      CEFR Statements / Students can:
                    </h4>
                    <ul>
                      <li>
                        Understand what people say to me in simple, everyday
                        conversation.
                      </li>
                      <li>Communicate in everyday situations.</li>
                      <li>
                        Politely talk to people in short social exchanges.
                      </li>
                    </ul> -->
                    <table class="table-modal">
                      <thead>
                        <tr>
                          <th scope="col">Objectives</th>
                          <th scope="col">Skills</th>
                        </tr>
                      </thead>
                    </table>
                    <table class="table table-striped table-custom">
                      <tbody>
                        <tr
                          v-for="(objective, jIndex) in simulation.objectives"
                          :key="'objectives' + index + '-' + jIndex"
                        >
                          <td>{{ objective.name }}</td>
                          <td v-html="objective.skills">
                            Appetizer Vocabulary<br />Articles with Countable
                            and Uncountable Nouns
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteClassModal />
    <RemoveStudentModal @confirmed="removeStudent()" />
    <ResendInvitationModal @confirmed="resendInviteStudent()" />
    <AddStudentModal />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import _ from "lodash";
import DeleteClassModal from "./popup/delete_class_modal.vue";
import RemoveStudentModal from "./popup/remove_student_modal.vue";
import ResendInvitationModal from "./popup/resend_invitation_modal.vue";
import AddStudentModal from "./popup/add_student_modal.vue";

export default {
  name: "ClassView",
  data() {
    return {
      selectedCourse: {},
      selectedAllStudent: false,
      studentOrder: {
        lastName: true,
        firstName: true,
        lastLogin: true,
        totalTime: true,
      },
      editMode: false,
    };
  },
  components: {
    DeleteClassModal,
    RemoveStudentModal,
    ResendInvitationModal,
    AddStudentModal,
  },
  computed: {
    ...mapGetters(["classDetail"]),
    studentSelected() {
      return (this.classDetail.students || []).find((s) => s.selected);
    },
  },
  methods: {
    ...mapActions(["fetchClassDetail", "updateClass"]),
    selectAllStudent() {
      this.classDetail.students = this.classDetail.students.map((s) => {
        s.selected = this.selectedAllStudent;
        return s;
      });
    },
    sortStudent(orderBy, type = "string", flag = undefined) {
      if (flag == undefined) {
        this.studentOrder[orderBy] = !this.studentOrder[orderBy];
        var flag = this.studentOrder[orderBy];
      }

      this.classDetail.students = this.classDetail.students.sort((a, b) => {
        if (flag) {
          var o1 = a[orderBy];
          var o2 = b[orderBy];
        } else {
          var o1 = b[orderBy];
          var o2 = a[orderBy];
        }

        if (type == "date") {
          o1 = moment(o1, "MM/DD/YYYY HH:mm").format();
          o2 = moment(o2, "MM/DD/YYYY HH:mm").format();
        }

        if (type == "time") {
          o1 = moment(o1, "HH:mm:ss").format();
          o2 = moment(o2, "HH:mm:ss").format();
        }

        if (o1 < o2) {
          return -1;
        }
        if (o1 > o2) {
          return 1;
        }

        return 0;
      });
    },
    removeStudent() {
      // TODO: maybe call API update here
      this.classDetail.students = this.classDetail.students.filter(
        (s) => s.selected != true
      );
    },
    resendInviteStudent() {
      // TODO: call API invite
    },
    save() {
      this.updateClass(this.classDetail).then(() => {
        this.editMode = false;
      });
    },
  },
  filters: {
    timeParser(value) {
      if (value) {
        return moment(String(value)).format("MMMM DD, YYYY HH:mm");
      }
    },
  },
  created() {
    this.fetchClassDetail(this.$route.params.id);
  },
  watch: {
    classDetail() {
      if (this.classDetail) {
        $(".datepicker-startdate").datepicker(
          "setDate",
          moment(this.classDetail.startDate, "MM/DD/YYYY").toDate()
        );
        $(".datepicker-enddate").datepicker(
          "setDate",
          moment(this.classDetail.endDate, "MM/DD/YYYY").toDate()
        );
      }
    },
  },
};
</script>

<style>
a.student-sorter {
  color: #fff;
}
</style>
