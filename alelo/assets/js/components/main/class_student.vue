<template>
  <section>
    <div class="container">
      <div class="mt-4 mb-4">
        <a
          href="javascript:void(0)"
          @click="
            $router.push({
              name: 'ClassView',
              params: { id: $route.params.classId },
            })
          "
          class="f-m-20 d-line border-bottom border-secondary pb-2"
          ><i class="fa fa-arrow-left"></i>
          {{ $t("classStudent.backToClassViewer") }}</a
        >
      </div>
      <h2 class="f-m-20 mb-3 blue-bold">{{ $t("classList.summary") }}</h2>
      <div class="wrap-item col-md-14 p-4 f-n-16 line-height-40">
        <h3 class="f-m-36">{{ studentDetail.name }}</h3>
        <div>
          <b>{{ $t("classStudent.studentID") }}</b> {{ studentDetail.id }}
        </div>
        <div>
          <b>{{ $t("classStudent.email") }}</b> {{ studentDetail.email }}
        </div>
        <div>
          <b>{{ $t("classStudent.otherInformation") }}</b>
          {{ studentDetail.otherInformation }}
        </div>
      </div>

      <h3 class="f-m-20 blue-bold mb-3">{{ $t("classStudent.course(s)") }}</h3>
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
                      >
                        {{ $t("classStudent.simulation") }}
                        <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        >{{ $t("classStudent.lastAttempt") }}
                        <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        :title="$t('classStudent.lastScoreHoverText')"
                        >{{ $t("classStudent.lastScore") }}
                        <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        :title="$t('classStudent.completedStartedHoverText')"
                        >{{ $t("classStudent.completedStarted") }}
                        <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                    <th scope="col">
                      <a
                        href="javascript:void(0)"
                        data-toggle="tooltip"
                        data-container="body"
                        data-placement="top"
                        >{{ $t("classStudent.totalTime") }}
                        <i class="fa fa-chevron-down"></i>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(simulation, aIndex) in course.simulations"
                    :key="`course-${index}-active-${aIndex}`"
                  >
                    <td>
                      <a
                        href="#active-detail"
                        data-toggle="modal"
                        data-target="#active-detail"
                        @click="simulationDetail = simulation"
                        >{{ simulation.title }}</a
                      >
                    </td>
                    <td>{{ simulation.lastTried | timeParser }}</td>
                    <td>{{ simulation.lastScore }}</td>
                    <td>{{ simulation.completed }}/{{ simulation.tried }}</td>
                    <td>{{ simulation.totalTimeSpent | toHHMMSS }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="clearfix">
            <span class="d-inline float-left f-n-14 blue-light mr-4">{{
              $t("classDetail.hoverText")
            }}</span>
            <span class="d-inline float-right f-n-14 mt-1 mr-4 blue-bold"
              ><i class="fa fa-download"></i>
              {{ $t("classDetail.download") }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <StudentSimulationDetail :simulationDetail="simulationDetail" />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import StudentSimulationDetail from "./popup/student_simulation_detail.vue";

export default {
  name: "ClassStudent",
  data() {
    return {
      simulationDetail: {},
    };
  },
  computed: {
    ...mapGetters(["studentDetail"]),
  },
  methods: {
    ...mapActions(["fetchStudentDetail"]),
  },
  filters: {
    timeParser(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY HH:mm");
      }
    },
    toHHMMSS(sec) {
      var sec_num = parseInt(sec, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    }
  },
  components: { StudentSimulationDetail },
  created() {
    this.fetchStudentDetail({
      id: this.$route.params.id,
      classId: this.$route.params.classId,
    }).finally(() => {
      $(".scrollbar-inner").scrollbar();
      window.CommonJs.initJs();
    });
  },
};
</script>

<style>
</style>
