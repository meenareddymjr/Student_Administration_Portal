<template>
  <div class="py-4 container-fluid">
    <h4>Dashboard</h4>
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2"  style="margin-top: 1em">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6" @click="goToSubjectDashboard(e,id,professor_name,subject_name,subject_max_marks,subject_min_marks,student_count,chart_options, chart_pass_value, chart_fail_values,marksGrades,gradePoints)" style="cursor: pointer" v-for="{ subject_name,professor_name, student_count , subject_max_marks, subject_min_marks,chart_options, chart_pass_value, chart_fail_values, id,index } in subjects" :key="index">
            <mini-statistics-card
              :title="{ text: professor_name, value: subject_name} "
              :detail= " 'No. of students:'+ student_count "
              :icon="{
                name: 'menu_book',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4" style="cursor: pointer">
            <mini-statistics-card
              :title="{ text: '', value: 'Add Subject' }"
              detail=""
              :icon="{
                name: 'add',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
        </div>
        <div v-for="{ chart_options, chart_pass_value, chart_fail_values, index } in subjects" :key="index">
        <div v-if="chart_options">
        <span>
        <GChart
            type="PieChart"
            :options="options"
            :data=[chart_options,chart_pass_value,chart_fail_values]
            style="width: auto;"/></span></div>
            </div>
      </div>

    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import { useLoadSubjects, useLoadGrade,useLoadMarks,getStudentsData } from '@/firebase'
import { mapState } from "vuex";
import { GChart } from "vue-google-charts";
export default {
  name: "dashboard-default",
  components: {
    MiniStatisticsCard,
    GChart
  },
  data: () => ({
    currentSubject: "",
    options: {
        height: 450,
        title:'HMI'
      },
  }),
  setup() {
    const subjects = useLoadSubjects()
    const marksGrades = useLoadMarks()
    const gradePoints = useLoadGrade()
    return {subjects,marksGrades, gradePoints}
  },
  methods :{
     goToSubjectDashboard :  function(e,id,professor_name,subject_name,max_marks,min_marks,student_count,chart_options, chart_pass_value, chart_fail_values,marksGrades,gradePoints,){
      for (let i=0;i<marksGrades.length;i++){
        this.$store.state.marksGradeTable = marksGrades[i]
      }
      for (let i=0;i<gradePoints.length;i++){
        this.$store.state.gradePointsTable = gradePoints[i]
      }
      this.$store.state.studentsMarksReport = getStudentsData(subject_name)
      this.$store.state.currentSubject = subject_name
      this.$store.state.subject_max_marks = max_marks
      this.$store.state.subject_min_marks = min_marks
      this.$store.state.students_count = student_count
      this.$store.state.subject_object = {
        chart_fail_values: chart_fail_values,
        chart_options:chart_options,
        chart_pass_value: chart_pass_value,
        professor_name:professor_name,
        student_count:student_count,
        subject_name:subject_name,
        subject_max_marks:max_marks,
        subject_min_marks:min_marks,
        id:id
      }
      setTimeout(()=>{this.$router.push({name:'SubjectDashboard', params: {name: subject_name}})},800)
    },
  },
  computed: {
    ...mapState(["currentSubject"])
  },
};
</script>
