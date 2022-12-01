import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import carGuide from "../views/carGuide"
import carRank from "@/views/carRank";
import carMap from "@/views/carMap";
import carManu from "@/views/carRanks/carManu";
import carOperator from "@/views/carOperator";
import carMonth from "@/views/carRanks/carMonth";
import carPie from "@/views/carPie";
import carMaxSpeed from "@/views/carRanks/carMaxSpeed";
import carAccele from "@/views/carRanks/carAccele";
import carTorQue from "@/views/carRanks/carTorQue";
import carPower from "@/views/carRanks/carPower";
import carPopular from "@/views/carRanks/carPopular";
import carKmEner from "@/views/carRanks/carKmEner";
import detailPage from "@/views/detailPage"
import carUser from "@/views/carUser"
import admin from "@/views/admin"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
  {
    path: '/carRank',
    name: 'carRank',
    component: carRank
  },
  {
    path: '/carUser',
    name: 'carUser',
    component: carUser
  },
  {
    path: '/carMap',
    name: 'carMap',
    component: carMap
  },
    {
      path: '/carPopular',
      name: 'carPopular',
      component: carPopular
    },
  {
    path: '/carGuide',
    name: 'carGuide',
    component: carGuide,
  },
  {
    path: '/detailPage',
    name: 'detailPage',
    component: detailPage
  },
  {
    path: '/carOperator',
    name: 'carOperator',
    component: carOperator
  },
   {
      path: '/carKmEner',
      name: 'carKmEner',
      component: carKmEner
    },
  {
    path: '/carManu',
    name: 'carManu',
    component: carManu
  },
  {
    path: '/carMonth',
    name: 'carMonth',
    component: carMonth
  },
  {
    path: '/carPie',
    name: 'carPie',
    component: carPie
  },
   {
      path: '/carMaxSpeed',
      name: 'carMaxSpeed',
      component: carMaxSpeed
    },
    {
      path: '/carAccele',
      name: 'carAccele',
      component: carAccele
    },
    {
      path: '/carPower',
      name: 'carPower',
      component: carPower
    },
    {
      path: '/carTorQue',
      name: 'carTorQue',
      component: carTorQue
    }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
