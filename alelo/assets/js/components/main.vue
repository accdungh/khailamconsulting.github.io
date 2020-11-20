<template>
  <main class="main">
    <section class="block-heading">
      <div class="container">
        <div class="row">
          <div class="col-19 col-md-12">
            <h1 class="title-heading">{{ $t('common.welcome') }}, Walter Mitchell!</h1>
          </div>
          <div class="col-5 col-md-12 text-right">
            <a href="" class="text-white f-n-18 align-middle">{{ $t('common.logOut') }}</a>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <TabList v-if="!$route.meta.hideRouterLink" />
        <router-view></router-view>
        <NoticeModal />
      </div>
    </section>
  </main>
</template>

<script>
import VueRouter from "vue-router";
import TabList from "./main/tab_list.vue";
import NoticeModal from "./main/popup/notice_modal.vue";
import routes from "./main/routes.js";

export default {
  name: "Main",
  components: { TabList, NoticeModal },
  router: new VueRouter({
    base: "/",
    routes,
  }),
  watch: {
    $route(to, from) {
      setTimeout(() => {
        window.CommonJs.initJs();
      }, 50);
    },
  },
};
</script>

<style>
</style>
