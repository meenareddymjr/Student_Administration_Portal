<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card my-4">
           <div v-for="(text,index) in data" :key="index" style="color: black;">
              <div v-if="text =='\n'"></div>
                <div v-else-if="text.startsWith('Enrollment') || text.startsWith('Matrikelnummer')" class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div class="bg-gradient-info shadow-success border-radius-lg pt-4 pb-3">
                    <h6 class="text-white text-capitalize ps-3">{{text.toLocaleUpperCase()}}<span style="padding-left: 1em; color:black">Total Marks: {{totalMarks}}</span>
                    <button type="button" style="float: right; margin-right: 1em; padding-left: 1em; padding-right: 1em; background-color: unset; border: none;" @click="e =>goBack(e)"><span>&#8592;</span> Back</button></h6>
                  </div>
                <br>
                </div>
              <div class="card my-4" v-else-if="text.startsWith('Points') || text.startsWith('Punkte')" style="padding-left: 1.5em; padding-right:1.5em"  @input="(e)=>valueOnChange(e,index)" @focusin="(e)=>valueOnClick(e,text)">
              <div style="display: inline-flex;"><span  v-html="text.startsWith('Punkte')?filterInput(text,'Punkte:'):filterInput(text,'Points:')"></span>
                <span style="margin-left:1em ;">
                  <button style="border-radius: 0.5em; padding-left:1em; padding-right:1em; background-image:linear-gradient(195deg, #49a3f1 0%, #1a73e8 100%) ; border: none;" v-if="index == change" @click="(e) => submitValue(e)">OK</button>
                </span>
              </div>
              </div>
              <div v-else style="padding-left: 1.5em; padding-right:1.5em">
                <div v-if="text.startsWith('Question') || text.startsWith('Frage')" v-html="text.startsWith('Frage')?filter(text,'Frage:'):filter(text,'Question:')"></div>
                <div v-else-if="text.startsWith('Correct Answer') || text.startsWith('Korrekte Anwort')" v-html="text.startsWith('Korrekte Anwort')?filter(text,'Korrekte Anwort:'):filter(text,'Correct Answer:')"></div>
                <div v-else-if="text.startsWith('Your response') || text.startsWith('Ihre Antwort')" v-html="text.startsWith('Ihre Antwort')?filter(text,'Ihre Antwort:'):filter(text,'Your response:')"></div>
                <div v-else-if="text.startsWith('Evaluated response') || text.startsWith('Bewertete Antwort')" v-html="text.startsWith('Bewertete Antwort')?filter(text,'Bewertete Antwort:'):filter(text,'Evaluated response:')">
              </div>
             <div v-else>{{text}}</div>
             </div>
           </div>
          </div>
        </div>
      </div>
      <Transition name="modal">
        <div v-if="toggleModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
           <h5> Do you want to save</h5>
          </div>
          <div class="modal-footer">
              <button
                class="modal-default-button"
                @click="saveModal()"
              >Save</button>
              <button
                class="modal-default-button"
                @click="closeModal()"
              >Discard</button>
          </div>
        </div>
      </div>
        </div>
      </Transition>
    </div>
</template>
<script>

import store from "../store";
import { uploadReportFile, updateMarks,getStudentsData,updateSubject } from '@/firebase';
export default {
  name: "resultFileView",
  data: () => ({
    change : -1,
    defaultValue: 0,
    changeValue : 0,
    totalMarks: store.state.resultMarks,
    toggleModal: false,
    text_data:store.state.resultData.split("\n")

  }),
  setup() {  
    const data = store.state.resultData.split("\n")
    const total_Marks = store.state.resultMarks
    return {data, total_Marks} 
  },
  methods :{
    filter(words, query){
      return words.replace(query, '<span style="font-weight: bold; color: black">' + query + '</span>')
    },
    filterInput(words, query){
      words = words.replace(query,'')
      const marks = words.split("/")
      return '<div><span style="font-weight: bold; color: black">' + query + '</span>' + 
      '<input style="border-radius:0.5em" type="number" value='+marks[0]+' min='+0+' max='+marks[1]+'>'+
      '<span style="color:red; margin-left:1em"> Max Marks: '+ marks[1] +'</span></div>'
    },
    valueOnChange(event,index){
      if(event.target.value && event.target.value <= event.target.max && event.target.value != this.defaultValue){
        this.change=index
        this.changeValue = parseInt(event.target.value)
        let changed_text = this.text_data[index].replace('Points:','')
        let marks = changed_text.split("/")
        marks[0] = event.target.value
        changed_text = marks[0].concat('/',marks[1])
        changed_text = 'Points:'.concat(changed_text)
        this.text_data[index] = changed_text
      }
      else{
        this.change = -1
      }
    },
    valueOnClick(event,text){
      if(event.target.value){
        let changed_text =text.includes('Punkte')?text.replace('Punkte:',''): text.replace('Points:','')
        let marks = changed_text.split("/")
        this.defaultValue = parseFloat(marks[0])
      }
    },
    submitValue(){
      let total_Marks = (this.totalMarks)+(this.changeValue-this.defaultValue)
      this.totalMarks = parseFloat(total_Marks.toFixed(3))
      this.change = -1
    },
    goBack(){
      if(this.totalMarks !== store.state.resultMarks)
      {
         this.toggleModal = true
      }
      else{
        this.$router.push({name:'SubjectDashboard', params: {name: store.state.currentSubject}});
      }
    },
    closeModal(){
      this.toggleModal = false
      this.$router.push({name:'SubjectDashboard', params: {name: store.state.currentSubject}});
    },
    async saveModal(){
      this.toggleModal = false
      let data =[]
      this.text_data.forEach(element => {
        element = element.concat('\n')
        data.push(element)
      });
    const marksGrades = store.state.marksGradeResults
    let final_grade = 0
    let final_result = ""
    for(const mark of marksGrades){
      if(this.totalMarks<=mark.max && this.totalMarks>=mark.min){
        final_grade = mark.grade
        break
      }
    }
    if(final_grade==5){
      final_result = 'fail'
      let data = JSON.parse(JSON.stringify(store.state.subject_object))
      const id = data.id
      data ={
        chart_fail_values: [data.chart_fail_values[0],data.chart_fail_values[1]+1],
        chart_options:data.chart_options,
        chart_pass_value: [data.chart_pass_value[0],data.chart_pass_value[1]-1],
        professor_name:data.professor_name,
        student_count:data.student_count,
        subject_name:data.subject_name,
        subject_max_marks:data.subject_max_marks,
        subject_min_marks:data.subject_min_marks,
      }
      updateSubject(id,data)
    }
    else{
      final_result = 'pass'
      let data = JSON.parse(JSON.stringify(store.state.subject_object))
      const id = data.id
      data ={
        chart_fail_values: [data.chart_fail_values[0],data.chart_fail_values[1]-1],
        chart_options:data.chart_options,
        chart_pass_value: [data.chart_pass_value[0],data.chart_pass_value[1]+1],
        professor_name:data.professor_name,
        student_count:data.student_count,
        subject_name:data.subject_name,
        subject_max_marks:data.subject_max_marks,
        subject_min_marks:data.subject_min_marks,
      }
      updateSubject(id,data)
    }
    
     uploadReportFile(store.state.resultFile,data)
      const value = {
        enrollment_number: store.state.enrollment_number,
        grade_points: final_grade,
        total_marks:parseFloat(this.totalMarks),
        result: final_result
      }
      await updateMarks(store.state.currentSubject,store.state.student_id,value,store.state.resultFile)
      this.$store.state.studentsMarksReport = getStudentsData(store.state.currentSubject)
      setTimeout(()=>{this.$router.push({name:'SubjectDashboard', params: {name: store.state.currentSubject}});},500)
      
    }
  }
};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
.modal-header {
  border-bottom: none !important;
}

.modal-header h5 {
  margin-top: 0;
  color: black;
  border-bottom: none !important;
}

.modal-footer{
  border-top: none !important;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  background-image: linear-gradient(195deg, #49a3f1 0%, #1a73e8 100%); 
  border: none;
  margin-right: 1em !important;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 1em;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
