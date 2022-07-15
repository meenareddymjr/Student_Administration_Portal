import firebase from "firebase/compat/app";
import { ref } from 'vue'
import "firebase/compat/firestore";
import { getStorage,ref as firebaseRef , getDownloadURL, deleteObject, uploadBytes  } from "firebase/storage";

const config = {
    apiKey: "AIzaSyCnjUuawoqnLxH3oxMJYStqClAMIg4S2Nk",
  authDomain: "my-project-1522736499012.firebaseapp.com",
  projectId: "my-project-1522736499012",
  storageBucket: "my-project-1522736499012.appspot.com",
  messagingSenderId: "1063310342802",
  appId: "1:1063310342802:web:7456d3350d020096aac44b",
  measurementId: "G-ZFTYRXFDE0"
  }
  
  const firebaseApp = firebase.initializeApp(config)
  
  const db = firebase.firestore()
  const storageRef = getStorage(firebaseApp)

  export const useLoadSubjects = () => {
    const subjects = ref([])
    db.collection('subjects').get().then(sub =>
      {
        subjects.value = sub.docs.map(doc =>
          ({
            ...doc.data(),
            id:doc.id
          }))
      })
    return subjects
  }

  /*export const useLoadStudents = (subjectName,start,end) => {
    let array = []
    console.log(start)
    for(let i=start;i<=end;i++){
      array.push(i)
    }
    const students = ref([])
    db.collection(subjectName).where("enrollment_number", "in", array).get().then(sub =>
      {
        students.value = sub.docs.map(doc =>
          ({
            ...doc.data(),
            id:doc.id
          }))
      })
    
      return students
  }*/

  export const useLoadStudents = (subjectName,column_name,start,sortOrder) =>{
    const students = ref([])
      db.collection(subjectName).orderBy(column_name, sortOrder).startAfter(start).limit(10).get().then(sub =>
        {
          students.value = sub.docs.map(doc =>
            ({
              ...doc.data(),
              id:doc.id
            }))
    })
    return students 
  }

  export const useLoadGrades = () => {
    const grades = ref([])
    db.collection('GradesTable').orderBy("id", "asc").get().then(sub =>
      {
        grades.value = sub.docs.map(doc =>
          ({
            ...doc.data()
          }))
      })
    return grades 
  }

  export const useLoadMarksGrades = () => {
    const grades = ref([])
    db.collection('MarksPointsTable').orderBy("grade", "asc").get().then(sub =>
      {
        grades.value = sub.docs.map(doc => 
          ({
            ...doc.data()
          }) 
          )
       
      })
    return grades 
  }

  export const useLoadMarks = ()=>{
    let grades=[]
    db.collection('MarksPointsTable').orderBy("grade", "asc").get().then(sub=>{
      grades.push(sub.docs.map(doc =>
        ({
          ...doc.data()
        })))
      }
    )
    return grades
  }

  export const useLoadGrade = () =>{
    let grades=[]
    db.collection('GradesTable').orderBy("id", "asc").get().then(sub=>{
      grades.push(sub.docs.map(doc =>
        ({
          ...doc.data()
        })))
      }
    )
    return grades
  }

  export const getStudentsData = (subjectName) =>{
    const students = []
    db.collection(subjectName).get().then(sub =>
      {
        students.push(sub.docs.map(doc =>
          ({
            ...doc.data(),
            id:doc.id
          })))
      })
      return students
  }

  export const getLoadSubject = () => {
    const subjects = []
    db.collection('subjects').get().then(sub =>
      {
        subjects.push(sub.docs.map(doc =>
          ({
            ...doc.data(),
            id:doc.id
          })))
      })
    return subjects
  }

  export const getReportFile = (reportpath) => {
    const gsReference = firebaseRef(storageRef, reportpath+".report");
    const xhr = new XMLHttpRequest();
    const promise1 =  new Promise((resolve,reject) =>{
      getDownloadURL(gsReference).then((url) => {
      xhr.responseType = "application/octet-stream";
      xhr.open('GET',url)
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.response)
        }
        else{
          reject(xhr)
        }
      }
      xhr.send()
      return xhr
    })
  })
  return promise1
  }

  export const uploadReportFile = (file,data)=> {
    const gsReference = firebaseRef(storageRef, file+".report");
    deleteObject(gsReference)
    const newFile = new File(data, file+".report", {
      type: "application/octet-stream",
    });
    uploadBytes(gsReference, newFile)
  }

  export const updateMarks = (subjectName,id,data,result_file) =>{ 
   data.result_report = db.doc(result_file) 
   return db.collection(subjectName).doc(id).update(data)
  }

  export const updateSubject = (id,data)=>{
    return db.collection('subjects').doc(id).update(data)
  }


