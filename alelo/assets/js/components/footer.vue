<template>
  <footer class="footer">
    <div class="bg-blue">
      <div class="container">
        <div class="row">
          <div class="col-md-9 text-center text-md-left f-n-16">
            {{ $t("common.footer.copyRight") }}
          </div>
          <div class="col-md-6 text-center text-md-left f-n-16">
            {{ $t("common.footer.slogan") }}
          </div>
          <div class="col-md-9">
            <ul class="list-inline f-20 mb-0 mt-md-0 text-center text-md-right f-n-16">
              <li class="list-inline-item">
                <a href="/contact" class="text-white">
                  {{ $t("common.footer.contactUs") }}
                </a>
              </li>
              <li class="list-inline-item">
                <a href="/privacy" class="text-white">
                  {{ $t("common.footer.privacyPolicy") }}
                </a>
              </li>
              <li class="list-inline-item">
                <a href="/tos" class="text-white">
                  {{ $t("common.footer.termsService") }}
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
