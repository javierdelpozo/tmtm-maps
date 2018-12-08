<template>
  <div class="pan-controls" />
</template>

<script>
  export default {
    name: 'PanControls',
    props: {
      msg: String
    }
  }
</script>

<style scoped lang="scss">
  .pan-controls {
    height: 200px;
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
  }

</style>
