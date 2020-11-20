<template>
  <section>
    <div class="container">
      <div class="mt-4 mb-4">
        <a
          href="javascript:void(0)"
          @click="$router.push({ name: 'ClassView', params: { id: $route.params.classId }})"
          class="f-m-20 d-line border-bottom border-secondary pb-2"
          ><i class="fa fa-arrow-left"></i> Back to Class Viewer</a
        >
      </div>
      <h2 class="f-m-20 mb-3 blue-bold">{{ $t("classList.summary") }}</h2>
      <div class="wrap-item col-md-14 p-4 f-n-16 line-height-40">
        <h3 class="f-m-36">{{ studentDetail.name }}</h3>
        <div><b>Student ID:</b> {{ studentDetail.studentId }}</div>
        <div><b>Email:</b> {{ studentDetail.email }}</div>
        <div><b>Other Information:</b> {{ studentDetail.otherInformation }}</div>
      </div>

      <h3 class="f-m-20 blue-bold mb-3">Course(s)</h3>
      <ul class="nav nav-tabs nav-tab-course" id="coursetab" role="tablist">
        <li
          class="nav-item"
          v-for="(course, index) in studentDetail.courses"
          :key="'student-course-' + index"
        >
          <a
            class="nav-link"
            :class="{ active: index == 0 }"
            :href="'#student-course-' + index"
            data-toggle="tab"
            role="tab"
            :aria-controls="'student-course-' + index"
            :aria-selected="index == 0"
            >{{ course.name }}</a
          >
        </li>
      </ul>

      <div class="tab-content">
        <div
          v-for="(course, index) in studentDetail.courses"
          :key="'student-course-table-' + index"
          class="tab-pane fade"
          :class="{ 'active show': index == 0 }"
          :id="'student-course-' + index"
          role="tabpanel"
          :aria-labelledby="'student-course-' + index"
        >
          <div class="wrap-item wrap-item-custom">
            <div class="scrollbar scrollbar-inner">
              <table
                class="table table-striped table-custom table-lst-student table-lst-student-custom"
              >
                <thead>
                  <tr>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        title="Hover on any title for more information"
                      >
                        Simulation <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        title="Hover on any title for more information"
                        >Last Attempt <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        title="Hover on any title for more information"
                        >Last Score <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        title="Hover on any title for more information"
                        >Completed / Started <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        title="Hover on any title for more information"
                        >Total Time <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(active, aIndex) in course.active"
                    :key="`course-${index}-active-${aIndex}`"
                  >
                    <td>
                      <a
                        href="#active-detail"
                        data-toggle="modal"
                        data-target="#active-detail"
                        @click="activeDetail = active"
                        >{{ active.simulation }}</a
                      >
                    </td>
                    <td>{{ active.lastAttempt }}</td>
                    <td>{{ active.lastScore }}%</td>
                    <td>{{ active.completed }}/{{ active.started }}</td>
                    <td>{{ active.totalTime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="clearfix">
            <span class="d-inline float-left f-n-14 blue-light mr-4"
              >Hover on any title for more information</span
            >
            <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold"
              ><i class="fa fa-download"></i> Download</span
            >
          </div>
        </div>
      </div>
    </div>

    <StudentActiveDetail :activeDetail="activeDetail" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StudentActiveDetail from "./popup/student_active_detail.vue";

export default {
  name: "ClassStudent",
  data() {
    return {
      activeDetail: {},
    };
  },
  computed: {
    ...mapGetters(["studentDetail"]),
  },
  methods: {
    ...mapActions(["fetchStudentDetail"]),
  },
  components: { StudentActiveDetail },
  created() {
    this.fetchStudentDetail(this.$route.params.id).finally(() => {
      $(".scrollbar-inner").scrollbar();
    });
  },
};
</script>

<style>
</style>
