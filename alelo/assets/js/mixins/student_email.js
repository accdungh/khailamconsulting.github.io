import { compact } from "lodash";

export default {
  data() {
    return {
      studentEmails: "",
    }
  },
  computed: {
    students() {
      return compact(this.studentEmails.split("\n"));
    },
    invalidEmails() {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let invalidEmails = [];

      for (let email of this.students) {
        if (email && !re.test(email)) {
          invalidEmails.push(email);
        }
      }

      return invalidEmails;
    },
    invalidEmailMessage() {
      if (!this.invalidEmails || !this.invalidEmails.length) return;

      return this.$t("studentsForm.invalidEmail", {
        emails: this.invalidEmails.map((email) => `“${email}”`).join(", "),
        beVerb:
          this.invalidEmails.length > 1
            ? this.$t("studentsForm.are")
            : this.$t("studentsForm.is"),
      });
    },
  },
  methods: {
    clearStudentEmails() {
      this.studentEmails = '';
    },
  },
}
