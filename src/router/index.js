import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import InformationCenter from "../views/Tables.vue";
import SubjectDashboard from "../views/SubjectDashboard.vue";
import ResultFileView from "../views/ResultFileView.vue"

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/informationcenter",
    name: "InformationCenter",
    component: InformationCenter,
  },
  { path: '/:name',
    name: 'SubjectDashboard', 
    component: SubjectDashboard },
  {
    path: '/:name',
    name: 'ResultFileView',
    component: ResultFileView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
