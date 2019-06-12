<template>
  <div id="app">
    <attribute-editor/>
  </div>
</template>

<script>
  import AttributeEditor from './views/AttributeEditor';

  export default {
    name: 'app',
    components: {
      AttributeEditor
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 60px;
  }
</style>
