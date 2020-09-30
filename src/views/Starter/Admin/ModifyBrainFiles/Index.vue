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
    <div class="container-fluid pt-5">
      <div class="starter-page">
        <div class="card">
            <div class="border-0 card-header user_search">
                <h3 class="mb-0">Modify Users</h3>
                <div>
                   <base-input alternative v-model="search_filter" placeholder="Search user..." prepend-icon="fa fa-search"></base-input>
                </div>
            </div>

            <el-table class="table-responsive table-flush" header-row-class-name="thead-light" @row-click="rowClicked" :data="filteredList">
                <el-table-column label="User" min-width="310px" prop="name" sortable>
                    <template v-slot="{row}">
                        <div class="media align-items-center">
                            <!-- <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Image placeholder" :src="row.img">
                            </a> -->
                            <div class="media-body">
                                <span class="font-weight-600 name mb-0 text-sm">{{row.user_name}}</span>
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
//  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    components: {
        // RouteBreadCrumb,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        // currentPage: 1,
        data: [],
        search_filter: ''
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
          axios.get(`worksheet-41-s`,config)
          .then(res => {
            // console.log('resData', res)
            // this.data = res.data
            let data = res.data
            data.forEach(element => {
              // console.log('element', element)
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
    computed: {
      filteredList() {
      return this.data.filter(row => { 
            var userSearch = row.user_name.toLowerCase().includes(this.search_filter.toLowerCase()); 
            return userSearch
      })
    }
    },
    methods: {
        rowClicked(selectedRows) {
            // console.log('selectedRows', selectedRows)
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
.border-0.card-header.user_search {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>