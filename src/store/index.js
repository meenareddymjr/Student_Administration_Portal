import { createStore } from "vuex";

export default createStore({
  state: {
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-gradient-dark",
    isRTL: false,
    color: "info",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    isDarkMode: false,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    currentSubject : "",
    resultFile : "",
    resultData : "",
    resultMarks: 0,
    enrollment_number:0,
    grade_points: 0,
    student_id:0,
    subject_max_marks:0,
    subject_min_marks:0,
    marksGradeTable:[],
    gradePointsTable:[],
    student_result:"",
    marksGradeResults:[],
    studentsMarksReport:[],
    students_count:[],
    subject_object:{}
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
    color(state, payload) {
      state.color = payload;
    },
    currentSubject(state, payload){
      state.currentSubject = payload
    },
    resultFile(state,payload){
      state.resultFile = payload
    },
    resultData(state,payload){
      state.resultData = payload
    },
    resultMarks(state,payload){
      state.resultMarks = payload
    },
    enrollment_number(state,payload){
      state.enrollment_number = payload
    },
    grade_points(state,payload){
      state.grade_points = payload
    },
    student_id(state,payload){
      state.student_id = payload
    },
    subject_max_marks(state,payload){
      state.subject_max_marks = payload
    },
    subject_min_marks(state,payload){
      state.subject_min_marks = payload
    },
    marksGradeTable(state,payload){
      state.marksGradeTable = payload
    },
    gradePointsTable(state,payload){
      state.gradePointsTable = payload
    },
    student_result(state,payload){
      state.student_result = payload
    },
    marksGradeResults(state,payload){
      state.marksGradeResults = payload
    },
    studentsMarksReport(state,payload){
      state.studentsMarksReport = payload
    },
    students_count(state,payload){
      state.students_count = payload
    },
    subject_object(state,payload){
      state.subject_object = payload
    }
  },
  actions: {
    setColor({ commit }, payload) {
      commit("color", payload);
    },
    setCurrentSubject({commit}, payload) {
      commit("currentSubject", payload);
    }
  },
  getters: {
    getCurrentSubject : state =>{
      return state.currentSubject
    }
  },
});
