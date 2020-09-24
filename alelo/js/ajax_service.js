var AjaxService = (function () {
  return {
    classList() {
      // let url = "/instructor/ajax/class/list"; // real api
      let url = "./ajax_data/class/list.json"; // fake api
      return axios.get(url).then(({ data }) => {
        return data;
      })
    },
    classDetail(id) {
      // let url = "/instructor/ajax/class/view/<id>"; // real api
      let url = "./ajax_data/class/detail.json"; // fake api
      return axios.get(url).then(({ data }) => {
        return data;
      })
    }
  }
})()

if ($('.detail-class') && $('.detail-class').length) {
  var detailClass = new Vue({
    el: '.detail-class',
    template: `
      <div>
<form>
  <div class="form-group">
    <div class="row">
      <div class="col-md-12">
        <h2 class="class-title d-inline">{{ classDetail.name }}</h2>
        <a class="edit-link d-inline f-n-20 ml-2" href="#">Edit</a>
      </div>
    </div>
    <div class="col-md-12 text-right">
      <div class="input-group date" data-provide="datepicker">
        <input type="text" class="form-control">
        <div class="input-group-addon">
          <span class="glyphicon glyphicon-th"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>

    </div>
    <input type="text" id="" class="form-control" :value="classDetail.description">

  </div>
</form>
<div class="wrap-course mb-3">
  <h3 class="f-m-20 d-inline blue-bold">Courses</h3>
  <span class="d-inline float-right f-n-14 blue-light mr-4">Hover on any title for more information</span>
</div>
<table class="table table-striped table-custom">
  <thead>
    <tr>

      <th class="column-1 text-center" scope="col">Accessible</th>
      <th class="column-2" scope="col">Course Name</th>
      <th class="column-3" scope="col">Play Simulations</th>
    </tr>
  </thead>
  <tbody class="scrollspy-example">
    <tr v-for="(course, index) in classDetail.activeCourse" :key="'course' + index">
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold"><a href="#">{{ course.name }}</a></td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>

    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold"><a href="#">Basic English</a></td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>

    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold"><a href="#">Transitional English</a></td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>


    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold"><a href="#">Effective and Persuasive Communication</a></td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>

    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold">English Refresher</td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>
    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold"><a href="#">Basic English</a></td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>

    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold"><a href="#">Transitional English</a></td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>


    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold"><a href="#">Effective and Persuasive Communication</a></td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>

    <tr>
      <td align="center">
        <div class="form-check">
          <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1"
            aria-label="...">
        </div>
      </td>
      <td class="f-m-18 blue-bold">English Refresher</td>
      <td><a href="#" class="launch_ap"></a></td>
    </tr>
  </tbody>
</table>
      </div>
    `,
    data() {
      return {
        classDetail: {}
      }
    },
    methods: {
      detail(id) {
        AjaxService.classDetail(id).then(data => {
          detailClass.classDetail = data;
        });
      }
    },
    created() {
      this.detail();
    }
  });
}

if ($('.list-class') && $('.list-class').length) {
  new Vue({
    el: '.list-class',
    template: `
      <div>
        <div class="form-group" v-for="(item, index) in classList" :key="index">
          <h2 class="class-title" @click="detail(item.id)">{{ item.name }}</h2>
          <div class="row">
            <div class="col-md-12 mb-2 mt-2 f-m-20">Summary</div>
            <div class="col-md-12 mb-2 mt-2 f-n-16 text-right">{{ item.startDate }} - {{ item.endDate }}</div>
          </div>
          <input type="text" id="" class="form-control" :value="item.description">
        </div>
      </div>
    `,
    data() {
      return {
        classList: [],
        detailClass: detailClass
      }
    },
    methods: {
      detail(id) {
        detailClass.$options.methods.detail(id);
        $('#classviewer-tab').trigger('click')
      }
    },
    created() {
      AjaxService.classList().then(data => {
        this.classList = data;
      })
    }
  });
}
