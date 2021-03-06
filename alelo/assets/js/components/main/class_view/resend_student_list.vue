<template>
  <div class="resend-student-list wrap-item">
    <div class="scrollbar scrollbar-inner">
      <table class="table table-striped table-custom header-fixed">
        <thead>
          <tr>
            <th class="pl-5">
              <span class="first-heading-text">
                {{ $t("classDetail.email") }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in students"
            :key="'resend-student' + index"
          >
            <td class="pl-5 font-weight-bold">
              {{ student | studentEmail }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResendStudentList",
  props: {
    students: {
      type: Array,
    },
  },
  methods: {
    initScrollbar() {
      if (this.students.length > 2) $(".scrollbar").scrollbar();
    },
  },
  mounted() {
    setTimeout(() => {
      this.initScrollbar();
    });
  },
  filters: {
    studentEmail(student) {
      return student.email || `${student.firstName} ${student.lastName}`.trim();
    },
  },
};
</script>

<style>
</style>
