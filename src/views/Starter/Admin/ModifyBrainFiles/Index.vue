<template>
<div>
     <base-header class="">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Default</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <!-- <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div> -->
      </div>
      <!-- Card stats -->
      
    </base-header>
    <div class="container-fluid pt-5">
      <div class="starter-page">
        <div class="card">
            <div class="border-0 card-header">
                <h3 class="mb-0">Modify Users</h3>
            </div>

            <el-table class="table-responsive table-flush" header-row-class-name="thead-light" @row-click="rowClicked" :data="data">
                <el-table-column label="User" min-width="310px" prop="name" sortable>
                    <template v-slot="{row}">
                        <div class="media align-items-center">
                            <!-- <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Image placeholder" :src="row.img">
                            </a> -->
                            <div class="media-body">
                                <span class="font-weight-600 name mb-0 text-sm">{{row.user_id}}</span>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                

                <el-table-column label="Status" min-width="170px" prop="status" sortable>
                    <template v-slot="{row}">
                        <badge class="badge-dot mr-4" type="">
                            <i :class="`bg-${row.status}`"></i>
                            <span class="status">{{row.status}}</span>
                        </badge>
                    </template>
                </el-table-column>

                <el-table-column label="Date" prop="completion" min-width="260px" sortable>
                    <template v-slot="{row}">
                        <div class="d-flex align-items-center">
                            <span class="completion mr-2">{{row.date}},{{row.time}}</span>
                            
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column min-width="180px">
                    <template v-slot="{row}">
                        <el-dropdown trigger="click" class="dropdown">
                        <span class="btn btn-sm btn-icon-only text-light">
                        <i class="fas fa-ellipsis-v mt-2"></i>
                        </span>
                            <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column> -->
            </el-table>

            <!-- <div class="card-footer py-4 d-flex justify-content-end">
                <base-pagination v-model="currentPage" :total="50"></base-pagination>
            </div> -->
        </div>
        </div>
        </div>
    </div>
</template>
<script>
 import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    components: {
        RouteBreadCrumb,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        projects: [
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/react.jpg',
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
            statusType: 'info',
            completion: 90
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/bootstrap.jpg',
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/angular.jpg',
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/sketch.jpg',
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/vue.jpg',
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
            statusType: 'success',
            completion: 100
          }
        ],
        currentPage: 1,
        data: []
      };
    },
    created() {

        // console.log('id',)
         let token = localStorage.getItem('token');
            // console.log(token);
            let config = {
                headers: {
                  Accept: 'application/json',
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
              }
            }
          axios.get(`worksheet-41-s`,config)
          .then(res => {
           
            // this.data = res.data
            let data = res.data
            data.forEach(element => {
            //   console.log('element', element)
              const today = new Date(element.created_at);
              const date = today.getFullYear() + '-' + (today.getMonth() + 1).toString().replace(/^(\d)$/, '0$1') + '-' + today.getDate().toString().replace(/^(\d)$/, '0$1');
              const time = today.getHours().toString().replace(/^(\d)$/, '0$1') + ":" + today.getMinutes().toString().replace(/^(\d)$/, '0$1') + ":" + today.getSeconds().toString().replace(/^(\d)$/, '0$1')

              let resp = {
                ...element,
                date,
                time
              }

              this.data.push(resp);
              
            });
            //  console.log('res', this.data)


          })
          .catch(e => {
            // this.errors.push(e);
          })

    },
    methods: {
        rowClicked(selectedRows) {
            // console.log('selectedRows', selectedRows)
            // this.$router.push(`/blog-details/${blog.id}`);
            this.$router.push(`/admin/modify/${selectedRows.id}`);
        }
    }
  }
</script>
<style>
div.el-table .el-table__row {
    cursor: pointer;
}
</style>

<style lang="scss" scoped>
.starter-page {
    min-height: calc(100vh - 284px) !important;
}
.badge-dot i {
    width: 10px;
    height: 10px;
}

i.bg-completed {
    background: #1e7e34;
}
i.bg-pending {
    background: #d39e00;
}
i.bg-cancelled {
    background: #dc3545;
}
</style>