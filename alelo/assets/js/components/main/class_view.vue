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
          <div class="col-md-24 border-bottom pb-1">
            <h2 class="class-title d-inline">{{ classDetail.name }}</h2>
            <div class="d-inline float-right mt-2" v-if="!isReadonly">
              <EditClassModal v-model="classDetail" />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 mb-2 mt-3 f-m-20 blue-bold">
            {{ $t("classList.summary") }}
          </div>
          <div class="col-md-12 mb-2 mt-3 f-n-16 text-right">
            {{ classDetail.startDate | timeParser("MMMM DD, YYYY") }} -
            {{ classDetail.endDate | timeParser("MMMM DD, YYYY") }}
          </div>
        </div>
        <div class="form-control">
          {{ classDetail.summary }}
        </div>
        <!--<textarea
          rows="1"
          v-model="classDetail.summary"
          class="form-control auto-size"
        />

        <div class="row">
          <div class="col-md-12 mb-2 mt-3 f-m-20 blue-bold">
            {{ $t("classList.description") }}
          </div>
        </div>
        <textarea
          rows="1"
          v-model="classDetail.description"
          class="form-control auto-size"
        />-->
      </div>
    </form>

    <div class="wrap-course mb-3">
      <h3 class="f-m-20 d-inline blue-bold">{{ $t("classDetail.courses") }}</h3>
      <span class="d-inline float-right f-n-14 blue-light">{{
        $t("classDetail.hoverText")
      }}</span>
    </div>

    <ActiveCourseList
      :courses="classDetail.activeCourse"
      v-model="selectedCourse"
    />

    <AddCoursesModal :classObject="classDetail" v-show="!isReadonly" />

    <div class="wrap-student mb-3">
      <h3 class="f-m-20 d-inline blue-bold">
        {{ $t("classDetail.studentList") }}
      </h3>
      <a
        href="javascript:void(0)"
        @click="classReport(classDetail && classDetail.id)"
      >
        <span class="d-inline f-n-14 m-3 mt-1 mr-4 blue-light">
          <i class="fa fa-download"></i> {{ $t("classDetail.download") }}
        </span>
      </a>
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
                  {{ $t("classDetail.lastName") }}
                  <SortArrow :flag="sorter.orderKeys.lastName.value" />
                </a>
              </th>
              <th scope="col">
                <a
                  href="javascript:void(0)"
                  @click="sortStudent('firstName')"
                  class="student-sorter"
                >
                  {{ $t("classDetail.firstName") }}
                  <SortArrow :flag="sorter.orderKeys.firstName.value" />
                </a>
              </th>
              <th scope="col">
                <a
                  href="javascript:void(0)"
                  @click="sortStudent('lastLogin')"
                  class="student-sorter"
                >
                  {{ $t("classDetail.lastLogin") }}
                  <SortArrow :flag="sorter.orderKeys.lastLogin.value" />
                </a>
              </th>
              <th scope="col">
                <a
                  href="javascript:void(0)"
                  @click="sortStudent('totalTime')"
                  class="student-sorter"
                >
                  {{ $t("classDetail.totalTime") }}
                  <SortArrow :flag="sorter.orderKeys.totalTime.value" />
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
                    :checked="student.selected"
                    @click="toggleSelectStudent(student)"
                  />
                </div>
              </td>
              <td class="font-weight-bold">
                <a
                  v-if="student.isUser"
                  href="javascript:void(0)"
                  @click="
                    $router.push({
                      name: 'ClassStudent',
                      params: {
                        classId: $route.params.id || classDetailId,
                        id: student.id,
                      },
                    })
                  "
                  >{{ student.lastName }}</a
                >
                <span class="font-weight-bold" v-else>{{
                  student.lastName
                }}</span>
              </td>
              <td class="font-weight-bold">{{ student.firstName }}</td>
              <td>
                {{ student.lastLogin | timeParser("MMMM DD, YYYY HH:mm") }}
              </td>
              <td>{{ student.totalTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="group-button clearfix" v-if="!isReadonly">
      <a
        href="#delete-class"
        class="float-left f-m-18 btn-created"
        data-toggle="modal"
        data-target="#delete-class"
      >
        {{ $t("classDetail.deleteClass") }}
      </a>
      <a
        v-if="!studentSelected"
        href="#add_student_modal"
        data-toggle="modal"
        data-target="#add_student_modal"
        class="btn-created float-right"
      >
        {{ $t("classDetail.addStudents") }}
      </a>

      <a
        v-if="studentSelected"
        href="#resent-invitation"
        data-toggle="modal"
        data-target="#resent-invitation"
        class="btn-created btn-red float-right btn"
        :class="{ disabled: !invitedStudents.length }"
        :aria-disabled="!invitedStudents.length"
      >
        {{ $t("classDetail.resendInvite") }}
      </a>

      <a
        v-if="studentSelected"
        href="#removestudent"
        data-toggle="modal"
        data-target="#removestudent"
        class="btn-created btn-red float-right"
      >
        {{ $t("classDetail.removeStudents") }}
      </a>
    </div>

    <CourseSimulationList :simulations="selectedCourse.simulations" />
    <div v-show="!isReadonly">
      <DeleteClassModal />
      <RemoveStudentModal @confirmed="submitRemoveStudent()" />
      <ResendInvitationModal
        @confirmed="resendInviteStudent()"
        :students="invitedStudents"
      />
      <AddStudentModal />
    </div>
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
import Sorter from "../../services/sorter.js";
import ActiveCourseList from "./class_view/active_course_list.vue";
import CourseSimulationList from "./class_view/course_simulation_list.vue";
import EditClassModal from "./popup/edit_class_modal.vue";
import AddCoursesModal from "./popup/add_courses_modal.vue";

export default {
  name: "ClassView",

  data() {
    return {
      selectedCourse: {},
      selectedAllStudent: false,
      editMode: false,
      sorter: new Sorter({
        lastName: {},
        firstName: {},
        lastLogin: { type: "date" },
        totalTime: { type: "time" },
      }),
    };
  },
  components: {
    DeleteClassModal,
    RemoveStudentModal,
    ResendInvitationModal,
    AddStudentModal,
    ActiveCourseList,
    CourseSimulationList,
    EditClassModal,
    AddCoursesModal,
  },
  computed: {
    ...mapGetters(["classDetail", "classDetailId"]),
    studentSelected() {
      return (this.classDetail.students || []).find((s) => s.selected);
    },
    selectedStudentIds() {
      return _.compact(this.selectedStudents.map((i) => i.id));
    },
    selectedStudents() {
      if (!this.classDetail || !this.classDetail.students) return [];
      return _.compact(this.classDetail.students.filter((s) => s.selected));
    },
    invitedStudents() {
      return _.compact(this.selectedStudents.filter((s) => !s.isUser));
    },
    invitedStudentIds() {
      return _.compact(this.invitedStudents.map((i) => i.id));
    },
    isReadonly() {
      return (
        this.classDetail && (!this.classDetail.id || this.classDetail.archived)
      );
    },
  },
  methods: {
    ...mapActions([
      "fetchClassDetail",
      "updateClass",
      "removeStudent",
      "resendInvitation",
      "classReport",
    ]),
    selectAllStudent() {
      this.classDetail.students = this.classDetail.students.map((s) => {
        s.selected = this.selectedAllStudent;
        return s;
      });
    },
    sortStudent(orderBy, flag = undefined) {
      this.classDetail.students = this.sorter.perform(
        this.classDetail.students,
        orderBy,
        flag
      );
    },
    submitRemoveStudent() {
      this.removeStudent(this.selectedStudentIds);
    },
    resendInviteStudent() {
      this.resendInvitation(this.invitedStudentIds);
    },
    save() {
      this.updateClass(this.classDetail).then(() => {
        this.editMode = false;
      });
    },
    toggleSelectStudent(student) {
      this.classDetail.students = this.classDetail.students.map((s) => {
        if (s == student) {
          s.selected = !s.selected;
        }
        return s;
      });
    },
  },
  created() {
    this.fetchClassDetail(this.$route.params.id);
  },
  watch: {
    classDetail() {
      if (this.classDetail) {
        setTimeout(() => {
          autosize.update($(".auto-size"));
        });
        if (this.classDetail.students) this.sortStudent("lastLogin", false);
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
