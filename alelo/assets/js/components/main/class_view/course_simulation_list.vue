<template>
  <div
    class="modal fade"
    id="course-info"
    tabindex="-1"
    role="dialog"
    aria-labelledby="course-infoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="course-infoLabel">
            {{ $t("classDetail.courseObjectives") }}
          </h2>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h3>{{ $t("classDetail.selectSimulation") }}</h3>
          <div id="accordion">
            <div
              class="card"
              v-for="(simulation, index) in sortedSimulations"
              :key="'simulation' + index"
            >
              <div class="card-header" id="headingOne">
                <h3 class="mb-0">
                  <button
                    class="btn btn-link"
                    data-toggle="collapse"
                    :data-target="'#simulation' + index"
                    aria-expanded="true"
                    :aria-controls="'simulation' + index"
                  >
                    {{ simulation.title }}
                  </button>
                </h3>
              </div>

              <div
                :id="'simulation' + index"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <div v-html="simulation.description"></div>
                  <!-- <h4 class="f-m-18 blue-bold">
                      CEFR Statements / Students can:
                    </h4>
                    <ul>
                      <li>
                        Understand what people say to me in simple, everyday
                        conversation.
                      </li>
                      <li>Communicate in everyday situations.</li>
                      <li>
                        Politely talk to people in short social exchanges.
                      </li>
                    </ul> -->
                  <table class="table-modal">
                    <thead>
                      <tr>
                        <th scope="col">
                          {{ $t("classDetail.objectives") }}
                        </th>
                        <th scope="col">{{ $t("classDetail.skills") }}</th>
                      </tr>
                    </thead>
                  </table>
                  <table class="table table-striped table-custom">
                    <tbody>
                      <tr
                        v-for="(objective, jIndex) in simulation.objectives"
                        :key="'objectives' + index + '-' + jIndex"
                      >
                        <td>{{ objective.name }}</td>
                        <td v-html="objective.skills">
                          Appetizer Vocabulary<br />Articles with Countable and
                          Uncountable Nouns
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sorter from "../../../services/sorter";

export default {
  name: "CourseSimulationList",
  props: {
    simulations: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    sortedSimulations() {
      return new Sorter({ title: {} }).perform(
        this.simulations,
        "title",
        true
      );
    },
  },
};
</script>

<style>
</style>
