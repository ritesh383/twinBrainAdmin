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
    <div class="container-fluid">
      <div class="row starter-page py-5">
        <div class="col text-center">
         <div class="dashboard_text"> Welcome to twin brain admin Dashboard</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  // import StatsCard from '@/components/Cards/StatsCard';

  export default {
    name: 'Dashboard',
    components: {
      // StatsCard,
      RouteBreadCrumb
    },
    data() {
      return {};
    },
      mounted(){
      document.title = 'Dashboard';
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
          history.go(1);
      };
    },
  };
</script>
<style>
  .starter-page {
    min-height: calc(100vh - 236px) !important;
  }
  .dashboard_text {
    font-size: 25px;
    font-weight: 600;
  }
</style>
