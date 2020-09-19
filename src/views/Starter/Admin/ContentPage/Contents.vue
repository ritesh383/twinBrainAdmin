<template>
  <div>
    <base-header class="pb-0">
      <div class="row align-items-center py-4">
        <div class="col-md-8">
          <h6 class="h2 text-white d-inline-block mb-0">Contents Total : {{ contents.length }}</h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav> -->
        </div>
        <div class="col-md-4">
          <div class="search_bar">
            <base-input v-model="search" placeholder="Search..." prepend-icon="fa fa-search"></base-input>
          </div>
        </div>
      </div>

          <!-- login rigister model -->
            <modal :show.sync="Delete_model">
              <!-- <template slot="header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
              </template> -->
              <div class="text-center">
                  <h2 class="user_title_color">Are you sure you want to delete this content?</h2>
              </div>
                <template slot="footer">
                  <base-button type="secondary" @click="Delete_model = false">Close</base-button>
                  <base-button type="danger" @click="Delete_model = false, deleteContent()">Close</base-button>
              </template>
            </modal>

        <!-- login rigister model -->


     
    </base-header>

     <!-- Card stats -->
     <div class="contents_page">
        <div v-if="showcontent">
          <div class="row">
            <div class="col-md-6" v-for="c in filteredList" :key="c.id">
              <div class="card">
                <div class="card-header">
                  <div class="card_header_content">
                  <div><b>{{c.content_label}}</b></div>
                  <div class="content_icons">
                    <span @click="editContent(c)"><i class="fas fa-edit"></i></span>
                    <span @click="getDeleteContent(c.id)"><i class="fas fa-trash"></i></span>
                  </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="content_text" v-html="c.content">{{c.content}}</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div class="card" v-if="!showcontent">
          <!-- Card header -->
          <div class="card-header">
            <base-input placeholder="Content label" v-model="content_label_Editor" label="Content label"></base-input>
          </div>
          <!-- Card body -->
          <div class="card-body">
              <html-editor v-model="contentEditor"></html-editor>
              <div class="save_btn">
                <base-button @click="Cancel">Cancel</base-button>
                <base-button @click="updateContent">Save</base-button>
              </div>
          </div>
        </div>
  </div>

  </div>
</template>
<script>
  // import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  // import StatsCard from '@/components/Cards/StatsCard';
import HtmlEditor from '@/components/Inputs/HtmlEditor'
  export default {
    name: 'Dashboard',
    components: {
      // StatsCard,
      // RouteBreadCrumb,
      HtmlEditor
    },
    data() {
      return {
        Delete_model: false,
        showcontent: true,
        id: this.$route.params.id,
        contents:[],
        content_label_Editor: '',
        contentEditor: '',
        contentID: '',
        deleteId: '',
        search: '',
      };
    },
    created() {
      this.getContents()

    },
     computed: {
      filteredList() {
      return this.contents.filter(c => { 
            var searchFilter = c.content_label.toLowerCase().includes(this.search.toLowerCase());
            return searchFilter
      })
    }
    },
    methods: {

      getContents() {
        // console.log('id',)
         let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
              }
            }
          axios.get(`pages/`+ this.$route.params.id,config)
          .then(res => {
            // console.log('res', res.data.contents)
            this.contents = res.data.contents
          })
          .catch(e => {
            this.errors.push(e);
          })
      },

      editContent(value) {
        // console.log('value',value)
        this.showcontent = false
        this.content_label_Editor = value.content_label,
        this.contentEditor = value.content,
        this.contentID = value.id
      },
      updateContent() {

         let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token//the token is a variable which holds the token
              }
            }
        axios.put(`contents/`+ this.contentID,{
          content_label: this.content_label_Editor,
          content: this.contentEditor
        },config)
        .then(res => {
          // console.log('res', res)
          if (res.status == 200) {
              this.getContents()

              this.showcontent = true
              this.content_label_Editor = ''
              this.contentEditor = ''
          }
          // this.contents = res.data.contents
        })
        .catch(e => {
          this.errors.push(e);
        })

      },

      Cancel() {
        this.showcontent = true
        this.content_label_Editor = ''
        this.contentEditor = ''
      },



      getDeleteContent(value){
        this.Delete_model = true;
        this.deleteId = value
      },

      deleteContent() {
        let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token//the token is a variable which holds the token
              }
            }
        axios.delete(`contents/`+ this.deleteId,config)
        .then(res => {
          // console.log('res', res)
          if (res.status == 200) {
              this.getContents()
              this.deleteId = ''
          }
        })
        .catch(e => {
          this.errors.push(e);
        })
      }
    },
      mounted(){
      this.getContents()
      document.title = 'Dashboard';
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
          history.go(1);
      };
    },
     watch:{
        $route (to, from){
            this.getContents()
            // console.log('id',this.$route.params.id)
            // this.id = this.$route.params.id
        },
      },
  };
</script>
<style>
@media (min-width: 576px){
  .modal-dialog {
      max-width: 350px;
  }
}
</style>
<style lang="scss">
.content_text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 25px;
}
  .starter-page {
    min-height: calc(100vh - 380px);
  }
  .contents_page {
    padding: 20px;
    .card_header_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .content_icons {
          span {
            margin: 5px;
            cursor: pointer;
          }
      }
  }
}
.save_btn {
  text-align: right;
}
.card-header {
  span {
    .form-group {
      margin: 0;
    }
  }
}
</style>
