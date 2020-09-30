import Vue from 'vue';
import Router from 'vue-router';

import AuthLayout from '@/views/Starter/Admin/Auth/AuthLayout.vue';

// GeneralViews
import NotFound from '@/views/GeneralViews/NotFoundPage.vue';



// Pages
// const User = () => import('@/views/Starter/Admin/Auth/UserProfile.vue');
// const Pricing = () => import('@/views/Starter/Admin/Auth/Pricing.vue');
// const TimeLine = () => import('@/views/Starter/Admin/Auth/TimeLinePage.vue');
const Login = () => import('@/views/Starter/Admin/Auth/Login.vue');
// const Home = () => import('@/views/Starter/Admin/Auth/Home.vue');
const Register = () => import('@/views/Starter/Admin/Auth/Register.vue');
const Forgot = () => import('@/views/Starter/Admin/Auth/Forgot.vue');




import AdminLayout from '../views/Starter/Admin/Layouts/DashboardLayout.vue';
import dashboard from '../views/Starter/Admin/Dashboard/Dashboard.vue';
import Contents from '../views/Starter/Admin/ContentPage/Contents.vue';
import Modify from '../views/Starter/Admin/ModifyBrainFiles/Index.vue';
import ModifyDetails from '../views/Starter/Admin/ModifyBrainFiles/ModifyDetails.vue';
import AddUser from '../views/Starter/Admin/AddUser/Index.vue';

Vue.use(Router);
let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home,
    //   meta: {
    //     noBodyBackground: true
    //   }
    // },
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
    // {
    //   path: '/pricing',
    //   name: 'Pricing',
    //   component: Pricing
    // },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot
    },
    {
      path: '*',
      component: NotFound
    }
  ]
};
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      redirect: '/login',
      component: Login,
    },
    {
         path: '/admin',
         name: 'Admin',
         component: AdminLayout,
         children: [
           {
           path: 'dashboard',
           name: 'dashboard',
           components: {
             default: dashboard
           }
         },
           {
           path: 'content/*/:id',
           name: 'Contents',
           components: {
             default: Contents
           }
         },
           {
           path: 'modify-brain-files',
           name: 'Modify',
           components: {
             default: Modify
           }
         },
           {
           path: 'modify/:id',
           name: 'ModifyDetails',
           components: {
             default: ModifyDetails
           }
         },
           {
           path: 'add-user',
           name: 'AddUser',
           components: {
             default: AddUser
           }
         }
        ]
       },
    authPages
  ],
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
