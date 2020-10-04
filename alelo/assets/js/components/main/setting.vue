<template>
  <!-- Settings-->
  <div
    class="tab-pane mt-4"
    id="settings"
    role="tabpanel"
    aria-labelledby="settings-tab"
  >
    <h2 class="class-title mb-2">Profile</h2>
    <form @submit.prevent="update()">
      <div class="form-setting">
        <div class="form-group">
          <div class="clearfix mb-3" v-if="!editMode">
            <h2 class="class-title d-inline">
              {{ userSetting.firstName }} {{ userSetting.lastName }}
            </h2>
            <a
              class="edit-link d-inline f-n-20 ml-2"
              href="javascript:void(0)"
              @click="editMode = true"
              >Edit</a
            >
          </div>
          <div class="clearfix mb-3" v-else>
            <h2 class="class-title d-inline form-inline">
              <input
                type="text"
                id=""
                class="form-control"
                v-model="userSetting.firstName"
              />
              <br />
              <input
                type="text"
                id=""
                class="form-control"
                v-model="userSetting.lastName"
              />
            </h2>
            <a
              class="edit-link d-inline f-n-20 ml-2"
              href="javascript:void(0)"
              @click="update()"
              >Save</a
            >
          </div>
          <div class="custom-select-group col-md-14">
            <select
              class="form-control custom-select mb-4"
              v-model="userSetting.currentInstitution"
            >
              <option
                v-for="(item, index) in userSetting.Institution"
                :key="'Institution' + index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>

          <div class="custom-select-group col-md-14">
            <select
              class="form-control custom-select mb-4"
              v-model="userSetting.currentLanguage"
            >
              <option
                v-for="(item, index) in userSetting.Languages"
                :key="'Languages' + index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-created mt-3 mb-3"
          data-toggle="collapse"
          href="#passwordShow"
          aria-expanded="false"
          aria-controls="passwordShow"
        >
          Change Password
        </button>

        <div id="passwordShow" class="wrap-password collapse">
          <div class="form-group">
            <label for="current-password" class="f-n-16"
              >Enter your current password</label
            >
            <input
              type="email"
              class="form-control col-md-10 p-2"
              id="current-password"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="form-group">
            <label for="new-password" class="f-n-16"
              >Enter a new password</label
            >
            <input
              type="password"
              class="form-control col-md-10 mb-2 p-2"
              id="new-password"
            />
            <input
              type="password"
              class="form-control col-md-10 p-2"
              id="confirm-new-password"
            />
          </div>

          <button type="submit" class="btn btn-created">Submit</button>
        </div>
      </div>
      <div class="form-check mt-3 mb-3">
        <input type="checkbox" class="form-check-input" id="receive" />
        <label class="form-check-label" for="receive"
          >Receive our newsletter to learn about new developments!</label
        >
      </div>
      <button type="submit" class="btn btn-created btn-save">Save</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Setting",
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    ...mapGetters(["userSetting"]),
  },
  methods: {
    ...mapActions(["fetchUserSetting", "updateUserSetting"]),
    update() {
      this.editMode = false;
      this.updateUserSetting();
    },
  },
  created() {
    this.fetchUserSetting();
  },
};
</script>

<style>
</style>
