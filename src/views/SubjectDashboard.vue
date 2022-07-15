<template>
  <div class="py-4 container-fluid">
    <div class="d-flex">
    <span style="flex:auto"><h4 style="margin-bottom:1em;"> Subject Dashboard</h4></span>
    <span>
      <button type="button" style="float: right; margin-right: 1em; padding-left: 1em; padding-right: 1em; border-radius:0.5em ; background-image:linear-gradient(195deg, #49a3f1 0%, #1a73e8 100%); border: none;" @click="e =>goBack(e)">
      <span>&#8592;</span> Back</button>
    </span>
    </div>
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
          <div style="display: flex;">
          <span>
            <h5 style="padding-left: 10em; padding-top:2em;">Marks Grade Information </h5>
         <GChart
            type="PieChart"
            :options="options"
            :data="marksGrades"
            style="width: auto;"
          />  
          </span>
          <span>
            <h5 style="padding-top:2em;">Marks Grades Information </h5>
            <table class="table align-items-center justify-content-center mb-0" >
                <thead>
                  <tr>
                    <th 
                      class="align-middle text-center justify-content-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7  ps-2"   
                    >
                      Marks Range
                    </th>
                    <th
                      class="align-middle text-center justify-content-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" 
                    >
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="{max,min,grade,index } in value" :key="index">
                    <td class="align-middle text-center justify-content-center text-sm" >
                      <p class="text-xs text-secondary mb-0" style="color:black !important ;">{{min}}-{{max}}</p>
                    </td>
                    <td class="align-middle text-center justify-content-center text-sm" >
                      <p class="text-xs text-secondary mb-0" style="color:black !important ;">{{grade}}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
          </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
          <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div
              class="bg-gradient-info shadow-success border-radius-lg pt-4 pb-3"
            >
              <h6 class="text-white text-capitalize ps-3">Students List</h6>
            </div>
          </div>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              
              <table class="table align-items-center mb-0 table">
                <thead>
                  <tr> 
                    <th style="cursor: pointer;"
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 sortable"  @click="getData(1,'enrollment_number',true)"
                    >
                      Enrollment Number &#x25b4;&#x25be;
                    </th>
                    <th style="cursor: pointer;"
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                      Grade points
                    </th>
                    <th style="cursor: pointer;"
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" @click="getData(1,'total_marks',true)"
                    >
                      Marks &#x25b4;&#x25be;
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Result Report
                    </th>
                    <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    >
                      Final Result
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="{enrollment_number,grade_points,total_marks,result_report,id,result,index } in students_data" :key="index">
                    <td> 
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img
                            src="../assets/img/user.png"
                            class="avatar avatar-sm rounded-circle me-2"
                            alt="spotify"
                          />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <p class="text-xs text-secondary mb-0" style="color:black !important ;">
                            {{enrollment_number}}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="text-xs text-secondary mb-0" style="color:black !important ;">{{grade_points}}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p class="text-xs text-secondary mb-0" style="color:black !important ;">{{total_marks}}</p>
                    </td>
                    <td class="align-middle text-center" @click.prevent="getFile(e,result_report.path,total_marks,enrollment_number,grade_points,id,result,value)">
                      <a
                        style="cursor: pointer; color:blue !important"
                        class="text-secondary font-weight-bold text-xs"
                        data-toggle="tooltip"
                        data-original-title="Edit user"
                        role="button"
                      >
                        {{result_report.path}}
                      </a>
                    </td>
                    <td class="align-middle text-center text-sm">
                      <p v-if="result == 'fail'" class="text-xs text-secondary mb-0" style="color:red !important; font-weight: bold;">{{result.toLocaleUpperCase()}}</p>
                      <p v-if="result == 'pass'" class="text-xs text-secondary mb-0" style="color:blue !important; font-weight: bold;">{{result.toLocaleUpperCase()}}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
  <a href="#">&laquo;</a>
  <a href="#" v-for="value in paginationValue" :key="value" @click="getData(value,column_name,false)">{{value}}</a>
  <a href="#">&raquo;</a>
</div>
  </div>
</template>
<script>
import { useLoadStudents, getReportFile } from '@/firebase'
import { GChart } from "vue-google-charts";
import store from "../store";
export default {
  name: "subjectdashboard",
  components: {
    GChart
  },data() {
    return {
      options: {
        width: 800,
        height: 450,
      },
      paginationValue:store.state.students_count/10,
      students_data : [],
      current_page:1,
      column_name:'enrollment_number',
    };
  },
  created(){
      const students = useLoadStudents(store.state.currentSubject,'enrollment_number',0)
      this.students_data = students
  },
  setup() {
    const marksGrades = store.state.marksGradeTable
    const grades = store.state.gradePointsTable
    const total_Marks = store.state.subject_max_marks
    let value=[]
    let chartValue = []
    const data = JSON.parse(JSON.stringify(store.state.studentsMarksReport))
    for (let i=0;i<data.length;i++){
      for(let j=0;j<data[i].length;j++)
        chartValue.push(data[i][j])
      }
    for(const marks of marksGrades){
      let data={}
      data.max = parseFloat(((marks.max/100)*total_Marks).toFixed(1))
      data.min = parseFloat(((marks.min/100)*total_Marks).toFixed(1))
      data.grade = marks.grade
      value.push(data)
    }
    let final_data = []
    final_data.push(['grade range','count'])
    for(const grade of grades){
      let max = grade.max
      let min = grade.min
      let count =0
      for(const mark of chartValue){ 
        if(max>=mark.grade_points && min<=mark.grade_points){
          count =count+1
        }
      }
      const gradeValue = 'grade:'+grade.grade_range
      final_data.push([ gradeValue,count])
    }
    return { marksGrades:final_data,value }
  },
  methods:{
    getFile:function(e,result_report,total_marks,enrollment_number,grade_points,id,result,value){
      this.$store.state.resultFile = result_report
      this.$store.state.resultMarks = total_marks
      this.$store.state.enrollment_number = enrollment_number
      this.$store.state.grade_points = grade_points
      this.$store.state.student_id = id
      this.$store.state.student_result = result
      this.$store.state.marksGradeResults = value
      setTimeout(getReportFile(result_report).then(
      data => {
        this.$store.state.resultData = data
        this.$router.push({name:'ResultFileView', params: {name:result_report }});
      }),300)
      
    },
    goBack(){
        this.$router.push({name:'Dashboard'});
    },
    getData(index,column_name,sortFlag){
      if(sortFlag){
        this.column_name = column_name
      }
      let start = column_name == 'enrollment_number' ? ((index-1)*10):this.students_data[9].total_marks
      if(index>1){
        this.students_data = useLoadStudents(store.state.currentSubject,column_name,start)
      }
      else{
        this.students_data = useLoadStudents(store.state.currentSubject,column_name,0)
      }
      this.current_page = index
    },
  }
};
</script>
<style>
.table {
    border-collapse:separate;
    /*border:solid black 1px;*/
    border-radius:6px;
}

.th {
    background-color: blue;
    border-top: none;
    cursor: pointer;
}

.td:first-child, .th:first-child {
     border-left: none;
}
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}
</style>
