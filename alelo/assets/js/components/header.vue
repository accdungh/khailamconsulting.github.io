<template>
  <header id="header" class="header">
    <div class="header-main">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-20">
            <a href="#"><img src="assets/images/logo.jpg" alt="" /></a>
          </div>
          <div class="col-12 col-lg-4 text-right mt-md-4">
            <div class="dropdown">
              <button
                class="btn dropdown-toggle button-gray-100"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Language <i class="fa fa-chevron-down"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">English</a>
                <a class="dropdown-item" href="#">Español</a>
                <a class="dropdown-item" href="#">Português</a>
                <a class="dropdown-item" href="#">中文</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
};
</script>

<style>
</style>
