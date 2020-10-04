<template>
  <section>
    <div class="container">
      <div class="mt-4 mb-4">
        <a
          href="javascript:void(0)"
          @click="$router.push({ name: 'ClassView' })"
          class="f-m-20 d-line border-bottom border-secondary pb-2"
          ><i class="fa fa-arrow-left"></i> Back to Class Viewer</a
        >
      </div>
      <h2 class="f-m-20 mb-3 blue-bold">Summary</h2>
      <div class="wrap-item col-md-14 p-4 f-n-16 line-height-40">
        <h3 class="f-m-36">Samuel Hernandez</h3>
        <b>Student ID:</b> 123456<br />
        <b>Email:</b> Sam_Hernan@yahoo.com<br />
        <b>Other Information: XXXXXXX</b>
      </div>

      <h3 class="f-m-20 blue-bold mb-3">Course(s)</h3>
      <ul class="nav nav-tabs nav-tab-course" id="coursetab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            href="#basic-english"
            data-toggle="tab"
            role="tab"
            aria-controls="basic-english"
            aria-selected="true"
            >Basic English</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#transitional-english"
            data-toggle="tab"
            role="tab"
            aria-controls="transitional-english"
            aria-selected="false"
            >Transitional English</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            data-toggle="tab"
            href="#effective-persuasive"
            role="tab"
            aria-controls="effective-persuasive"
            aria-selected="false"
            >Effective and Persuasive Comm.</a
          >
        </li>
      </ul>

      <div class="tab-content">
        <div
          class="tab-pane fade show active"
          id="basic-english"
          role="tabpanel"
          aria-labelledby="basic-english"
        >
          <div class="wrap-item">
            <div class="scrollbar scrollbar-inner">
              <table
                class="table table-striped table-custom table-lst-student table-lst-student-custom"
              >
                <thead>
                  <tr>
                    <th scope="col">
                      Simulation <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Last Attempt <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Last Score <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Completed / Started <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Total Time <i class="fa fa-chevron-down"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a
                        href="#course-detail"
                        data-toggle="modal"
                        data-target="#course-detail"
                        >Planning a Party</a
                      >
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
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
        <div
          class="tab-pane fade"
          id="transitional-english"
          role="tabpanel"
          aria-labelledby="transitional-english"
        >
          <div class="wrap-item">
            <div class="scrollbar scrollbar-inner">
              <table
                class="table table-striped table-custom table-lst-student table-lst-student-custom"
              >
                <thead>
                  <tr>
                    <th scope="col">
                      Simulation <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Last Attempt <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Last Score <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Completed / Started <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Total Time <i class="fa fa-chevron-down"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
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
        <div
          class="tab-pane fade"
          id="effective-persuasive"
          role="tabpanel"
          aria-labelledby="effective-persuasive"
        >
          <div class="wrap-item">
            <div class="scrollbar scrollbar-inner">
              <table
                class="table table-striped table-custom table-lst-student table-lst-student-custom"
              >
                <thead>
                  <tr>
                    <th scope="col">
                      Simulation <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Last Attempt <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Last Score <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Completed / Started <i class="fa fa-chevron-down"></i>
                    </th>
                    <th scope="col">
                      Total Time <i class="fa fa-chevron-down"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a
                        href="#course-detail"
                        data-toggle="modal"
                        data-target="#course-detail"
                        >Planning a Party</a
                      >
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">Planning a Party</a>
                    </td>
                    <td>September 3, 2020, 23:57</td>
                    <td>38%</td>
                    <td>1/1</td>
                    <td>3:20</td>
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
  </section>
</template>

<script>
export default {
  name: "ClassStudent",
};
</script>

<style>
</style>
