<template>
  <div class="toolbox">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script>
export default {
  name: 'ToolBox',
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
  .toolbox {
    border: 1px solid green;
  }
</style>
