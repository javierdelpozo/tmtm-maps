<template>
  <div>
    <MapBox />
  </div>
</template>

<script>
  import MapBox from '@/components/MapBox';
  import ToolBox from '@/components/ToolBox';

  export default {
    name: 'Home',
    components: {
      MapBox,
      ToolBox
    }
  }
</script>
