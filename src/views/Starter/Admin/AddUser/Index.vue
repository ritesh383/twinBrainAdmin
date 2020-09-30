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
        <div class="starter-page py-0">
            <!-- <div class="addUser">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="card bg-secondary border-0 mb-0">
                            <div class="card-body px-lg-5 py-lg-5">
                            <div class="text-center text-muted mb-4">
                                <small>Sign up with credentials</small>
                            </div>
                            <div v-if="errors.length">
                                <div style="color: red;" v-for="error in errors" :key="error">{{ error }}</div>
                            </div>
                            <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                                <base-input alternative label="User name" class="mb-3" name="Username" :rules="{required: true}" prepend-icon="ni ni-circle-08" placeholder="Username" v-model="UserName"></base-input>
                                <base-input alternative label="Email" class="mb-3" name="Email" :rules="{required: true, email: true}" prepend-icon="ni ni-email-83" placeholder="Email" v-model="email"></base-input>

                               

                                
                                <div class="text-center">
                                    <base-button type="primary" native-type="submit" class="my-4">Sign up</base-button>
                                </div>
                                </form>
                            </validation-observer>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->


            <div class="card mt-5">
              <div class="border-0 card-header">
                <div class="d-flex align-items-center justify-content-between">
                    <h3 class="mb-0">Users</h3>
                    <base-button type="primary" native-type="submit" class="btn-sm" @click="CreateModel = true">Add user</base-button>
                  </div>
              </div>

              <el-table class="table-responsive table-flush" header-row-class-name="thead-light" :data="data">
                  <el-table-column label="User" min-width="260px" prop="username" sortable>
                      <template v-slot="{row}">
                          <div class="media align-items-center">
                              <div class="media-body">
                                  <span class="font-weight-600 name mb-0 text-sm">{{row.username}}</span>
                              </div>
                          </div>
                      </template>
                  </el-table-column>

                  <el-table-column label="Email" min-width="260px" prop="email" sortable>
                      <template v-slot="{row}">
                          <badge class="badge-dot mr-4" type="">
                              <span class="status">{{row.email}}</span>
                          </badge>
                      </template>
                  </el-table-column>

                  <el-table-column label="Role" prop="role" min-width="260px" sortable>
                      <template v-slot="{row}">
                          <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{row.role.name}}</span>
                          </div>
                      </template>
                  </el-table-column>
                  <el-table-column  label="Action" prop="action" min-width="260px" sortable>
                      <template v-slot="{row}">
                          <base-button @click="editUser(row)" class="like btn-link iconsize" type="success" size="sm" icon>
                              <i class="text-white fas fa-edit"></i>
                          </base-button>
                      </template>
                  </el-table-column>
              </el-table>

              <div class="card-footer py-4 d-flex justify-content-end">
                  <base-pagination v-model="currentPage" :total="data.length"></base-pagination>
              </div>
          </div>


          <!-- add user data model -->

              <modal :show.sync="CreateModel" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm set-width">
                  <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0 mb-0">
                      <template>
                          <div class="text-center text-muted mb-4">
                              <small>Create Users with credentials</small>
                          </div>
                          <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                                <base-input alternative label="User name" class="mb-3" name="Username" :rules="{required: true}" prepend-icon="ni ni-circle-08" placeholder="Username" v-model="UserName"></base-input>
                                <base-input alternative label="Email" class="mb-3" name="Email" :rules="{required: true, email: true}" prepend-icon="ni ni-email-83" placeholder="Email" v-model="email"></base-input>

                                
                                <div class="text-center">
                                  <base-button type="default" class="my-4" @click="CreateModel = false">Cancel</base-button>
                                    <base-button type="primary" native-type="submit" class="my-4">Create</base-button>
                                </div>
                                </form>
                            </validation-observer>
                      </template>
                  </card>
              </modal>

          <!-- add user data model -->


          <!-- update user data model -->

              <modal :show.sync="updateModel" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm set-width">
                  <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5" class="border-0 mb-0">
                      <template>
                          <div class="text-center text-muted mb-4">
                              <small>Update your credentials</small>
                          </div>
                          <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                          <form role="form" @submit.prevent="handleSubmit(update)">
                            <base-input alternative label="User name" v-model="editUserName" name="Username" :rules="{required: true}" prepend-icon="ni ni-circle-08" placeholder="User name " addon-left-icon="ni ni-circle-08">
                              </base-input>
                              <base-input alternative label="Email" class="mb-3" v-model="editEmail" name="Email" :rules="{required: true, email: true}" prepend-icon="ni ni-email-83" placeholder="Email" addon-left-icon="ni ni-email-83">
                              </base-input>
                              <div class="text-center">
                                  <base-button type="default" class="my-4" @click="updateModel = false">Cancel</base-button>
                                  <base-button type="primary" native-type="submit" class="my-4">Update</base-button>
                              </div>
                          </form>
                          </validation-observer>
                      </template>
                  </card>
              </modal>

          <!-- update user data model -->



        </div>
    </div>
  </div>
</template>
<script>
 import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        CreateModel: false,
        updateModel: false,
          UserName: '',
          email: '',
          password: 'doctor123',
          data: [],

          userId: '',
          editUserName: '',
          editEmail: '',



        currentPage: 1
      };
    },
    created() {
       this.getUsers()

    },
    methods: {

        getUsers() {
          this.data = []
          let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
              }
            }

          axios.get(`users`,config)
            .then(response => {
                // console.log('response',response);
                let data = response.data
                data.forEach(element => {
                  // console.log('element', element.role.id)
                    if (element.role.id === 3) {
                        this.data.push(element);
                    }
                });
            })
            .catch(e => {
                    this.errors = []
                    this.errors.push(e)
            });
        },







        onSubmit() {
          axios.post('auth/local/register',{
            username: this.UserName,
            email: this.email,
            password: this.password
          })
        .then(response => {
            // console.log('response',response);

             let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
              }
            }

             axios.put(`users/`+ response.data.user.id ,{
                "role":{
                      "id": 3
                  }
              },config)
            .then(response => {
                // console.log('response',response);

                this.UserName = ''
                this.email = ''
                this.CreateModel = false
                this.getUsers()

              })
              .catch(e => {
                this.errors = []
                this.errors.push(e)
              });

          })
          .catch(e => {
            this.errors = []
            this.errors.push(e)
          });
        },




        editUser(userData) {
          // console.log('userData', userData)
          this.userId = userData.id
          this.editUserName = userData.username
          this.editEmail = userData.email
          this.updateModel = true
        },

        update() {
             let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
              }
            }

             axios.put(`users/`+ this.userId ,{
                "username": this.editUserName,
                "email": this.editEmail,
                "role":{
                      "id": 3
                  }
              },config)
            .then(response => {
                console.log('response',response);

                this.editUserName = ''
                this.editEmail = ''
                this.userId = ''
                this.updateModel = false
                this.getUsers()

              })
              .catch(e => {
                this.errors = []
                this.errors.push(e)
              });
        }
     
    },
      mounted(){
      document.title = 'Add User';
    },
  };
</script>
<style lang="scss">
  .starter-page {
    min-height: calc(100vh - 236px) !important;
  }
  .form-control:disabled, .form-control[readonly] {
        background-color: transparent;
        opacity: 1;
    }
    .addUser {
        max-width: 700px;
        margin: auto;
    }
    @media (min-width: 576px) {
      .modal-dialog.set-width {
          max-width: 550px;
      }
    }
      
</style>
