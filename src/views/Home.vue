<template>
  <div class="grid-12">
    <div class="col-8">
      <MapBox msg="Welcome to Your Vue.js App"/>
    </div>
    <div class="col-4">
      <ToolBox msg="this is a tool box"/>
    </div>
  </div>
</template>

<script>
  import MapBox from '@/components/MapBox';
  import ToolBox from '@/components/ToolBox';

  export default {
    name: 'home',
    components: {
      MapBox,
      ToolBox
    }
  }
</script>
