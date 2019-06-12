<template>
  <div id='app'>
    <instance-editor />
  </div>
</template>

<script>
  import InstanceEditor from './views/InstanceEditor'

  export default {
    name: 'app',
    components: {
      'instance-editor': InstanceEditor
    }
  }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 60px;
  }
</style>
