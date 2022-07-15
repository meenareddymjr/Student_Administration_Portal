<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Marks Points Information Table</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table
                class="table align-middle text-center justify-content-center mb-0"
              >
                <thead>
                  <tr>
                    <th
                      class="align-middle text-center   text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      ID
                    </th>
                    <th
                      class="align-middle text-center  text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Percentage of Marks
                    </th>
                    <th
                      class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Grade Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="{percentage, grade,id } in marksGrades" :key="id">
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold">{{id}}</span>
                    </td>
                    <td class="align-middle text-center">
                      <span class="text-xs font-weight-bold">{{percentage}}</span>
                    </td>
                    <td class="align-middle text-center ">
                      <span class="text-xs font-weight-bold">{{grade}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Grade Information Table</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table
                class="table align-items-center justify-content-center mb-0"
              >
                <thead>
                  <tr>
                    <th
                      class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      ID
                    </th>
                    <th
                      class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Grade Range
                    </th>
                    <th
                      class="align-middle text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Grade
                     </th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="{grade_range, grade, id } in grades" :key="id">
                    <td class="align-middle text-center ">
                      <span class=" text-xs font-weight-bold ">{{id}}</span>
                    </td>
                    <td class="align-middle text-center ">
                      <span class=" text-xs font-weight-bold ">{{grade_range}}</span>
                    </td>
                    <td class="align-middle text-center ">
                      <span class=" text-xs font-weight-bold">{{grade}}</span>
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
</template>
<script>
import { useLoadGrades,useLoadMarksGrades } from '@/firebase'
export default {
  name: "informationcenter",
  setup() {
    const grades = useLoadGrades()
    const marksGrades = useLoadMarksGrades()
    return { grades,marksGrades }
  },
};
</script>
