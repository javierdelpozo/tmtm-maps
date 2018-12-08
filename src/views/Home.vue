<template>
  <div>
      <MapBox/>
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
