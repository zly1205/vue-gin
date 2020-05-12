import Vue from 'vue'
import App from '../App.vue'
import Router from 'vue-router'
import HeaderNav from '@/components/HeaderNav'
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Content from "../components/Content.vue";

//user
import AllUsers from '../components/user/AllUsers.vue';
import AddUser from '../components/user/AddUser.vue';
import PreUpdateUser from '../components/user/PreUpdateUser.vue';
import FindUserById from '../components/user/FindUserById.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: "/index",
      name: "Home",
      component: Home,
      redirect: "/allUsers",
      children: [
        {
          path: "/allUsers",
          name: "AllUsers",
          component: AllUsers,
        },
        {
          path: "/addUser",
          name: "AddUser",
          component: AddUser,
        },
        {
          path: "/preUpdateUser",
          name: "PreUpdateUser",
          component: PreUpdateUser,
        },
        {
          path: "/findUserById",
          name: "FindUserById",
          component: FindUserById
        }
      ]
    },

  ]
})
