<template>
  <div>
    <base-header class="">
      <div class="row align-items-center">
        <!-- <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Default</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div> -->
      </div>
      
    </base-header>
    <div class="container-fluid">
      <div class="starter-page">
          <div>
            <div class="back_btn" @click="goBack">
              back
            </div>
              <div class="text-center mt-4">
                  <h2>User - {{user.user_id}}</h2>
                  <div><small>{{date}}, {{time}}</small></div>
              </div>
            <div class="row grid">
            
                <div class="col-md-6 grid-item" v-for="ques in data" :key="ques.id">
                <div class="card set_layout mb-0">
                    <div class="card-header">
                    <div class="card_header_content">
                    <div><b>{{ques.id}}</b></div>
                    </div>
                    </div>
                    <div class="card-body">
                        <div v-if="ques.title" class="mb-3">{{ques.title}}</div>
                        <div class="questions">
                            <h3>
                            <div class="mr-1">1.</div> <div>Behaviours - {{ques.labels.behaviours}}</div>
                            </h3>
                            <div class="mb-2 pl-3">
                                {{ques.responses.behaviours}}
                            </div>
                        </div>
                        <div class="questions">
                            <h3>
                            <div class="mr-1">2.</div> <div>Body reactions - {{ques.labels.body_reactions}}</div>
                            </h3>
                            <div class="mb-2 pl-3">
                                {{ques.responses.body_reactions}}
                            </div>
                        </div>
                        <div class="questions">
                            <h3>
                            <div class="mr-1">3.</div> <div>Decision - {{ques.labels.decision}}</div>
                            </h3>
                            <div class="mb-2 pl-3">
                                {{ques.responses.decision}}
                            </div>
                        </div>
                        <div class="questions">
                            <h3>
                            <div class="mr-1">4.</div> <div>Emotion - {{ques.labels.emotion}}</div>
                            </h3>
                            <div class="mb-2 pl-3">
                                {{ques.responses.emotion}}
                            </div>
                        </div>
                        <div class="questions">
                            <h3>
                            <div class="mr-1">5.</div> <div>Situation - {{ques.labels.situation}}</div>
                            </h3>
                            <div class="mb-2 pl-3">
                                {{ques.responses.situation}}
                            </div>
                        </div>
                        <div class="questions">
                            <h3>
                            <div class="mr-1">6.</div> <div>Thoughts - {{ques.labels.thoughts}}</div>
                            </h3>
                            <div class="mb-2 pl-3">
                                {{ques.responses.thoughts}}
                            </div>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';


  export default {
    name: 'Dashboard',
    components: {
      // RouteBreadCrumb
    },
    data() {
      return {
          data: [],
          user: '',
          date: '',
          time: '',
      };
    },
    created() {
         let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
              }
            }
          axios.get(`worksheet-41-s/` + this.$route.params.id ,config)
          .then(res => {
            // console.log('res', res)
            this.user = res.data
            this.data = res.data.data
              const today = new Date(res.data.created_at);
              this.date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().replace(/^(\d)$/, '0$1') + '-' + today.getDate().toString().replace(/^(\d)$/, '0$1');
              this.time = today.getHours().toString().replace(/^(\d)$/, '0$1') + ":" + today.getMinutes().toString().replace(/^(\d)$/, '0$1') + ":" + today.getSeconds().toString().replace(/^(\d)$/, '0$1')
          })
          .catch(e => {
            this.errors.push(e);
          })

    },
    methods: {
      goBack() {
        this.$router.push(`/admin/modify-brain-files`);
      }
    },
      mounted(){
      document.title = 'ModifY Details';
    },
  };
</script>
<style lang="scss">
  .starter-page {
    min-height: calc(100vh - 236px) !important;
  }
  .set_layout {
    height: 100%;
    width: 100%;
  }
  .grid-item {
      margin-top: 20px;
  }
  .back_btn {
    margin-top: 20px;
    cursor: pointer;
    font-weight: 700;
}
.questions {
  h3 {
    display: flex;
    // white-space: nowrap;
  }
}
</style>
