<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <!-- <sidebar-item :link="{ name: 'Dashboards', icon: 'ni ni-shop text-primary',}">
          <sidebar-item :link="{ name: 'Dashboard', path: '/admin/dashboard' }"></sidebar-item>
        </sidebar-item> -->
        <sidebar-item :link="{ name: 'Dashboard', icon: 'ni ni-shop text-primary', path: '/admin/dashboard' }"></sidebar-item>
        <sidebar-item  v-for="p  in pages" :key="p.id" :link="{ name: p.page_label, icon: 'ni ni-bullet-list-67', path: '/admin/content/' + `${p.Page_url}/${p.id}` }"></sidebar-item>
        <sidebar-item :link="{ name: 'Modify Brain Files', icon: 'ni ni-bullet-list-67', path: '/admin/modify-brain-files' }"></sidebar-item>
        <sidebar-item :link="{ name: 'Add user', icon: 'ni ni-circle-08', path: '/admin/add-user' }"></sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './DashboardFooter.vue';
import { FadeTransition } from 'vue2-transitions';
import { mapState } from "vuex";
export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  data() {
    return {
      pages: [],
    }
  },
  created() {
         let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token//the token is a variable which holds the token
              }
            }
            
              axios.get(`pages`,config)
              .then(res => {
                // console.log('element', res)
                let pageDataArray = []
                  let data = res.data
                  data.forEach(element => {
                  //    
                      let pageName = element.page_label.toString();
                      let Page_url = pageName.split(/[ ,]+/).join('-')
                    let resp = {
                      ...element,
                      Page_url
                    }

                    pageDataArray.push(resp);

                  });
                  this.pages = pageDataArray

              })
              .catch(e => {
                this.errors.push(e);
              })



  },
  methods: {
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('scrollbar-inner');

        docClasses.add('perfect-scrollbar-on');
      } else {
        docClasses.add('perfect-scrollbar-off');
      }
    }
  },
   computed:{
    // ...mapState(['allpage'])
    
    },
  mounted() {
    // this.$store.dispatch('getPages')
    // this.$store.dispatch('getContents')
    // this.pages = this.allpage.GetAllPage
    // console.log('pages asddas',this.allpage.GetAllPage)
  }
};
</script>
