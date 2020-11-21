<template>
  <footer class="footer">
    <div class="bg-blue">
      <div class="container">
        <div class="row">
          <div class="col-md-10 text-center text-md-left">
            {{ $t("common.footer.copyRight") }}
          </div>
          <div class="col-md-7 text-center text-md-left">
            {{ $t("common.footer.playLearnCommunicate") }}
          </div>
          <div class="col-md-7">
            <ul class="list-inline f-20 mb-0 mt-md-0 text-center text-md-right">
              <li class="list-inline-item">
                <a href="javascript:void(0)" class="text-white">
                  {{ $t("common.footer.contactUs") }}
                </a>
              </li>
              <li class="list-inline-item">
                <a href="javascript:void(0)" class="text-white">
                  {{ $t("common.footer.legal") }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
</style>
