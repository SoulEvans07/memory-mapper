<template>
  <div class="editor">
    <slice v-bind:slice="this.slice"/>
  </div>
</template>

<script>
  import Slice from '../models/slice'
  import SliceComp from '../comp/SliceComp'

  export default {
    components: { 'slice': SliceComp },
    data () {
      return {
        slice: new Slice(16)
      }
    }
  }
</script>

<style scoped>
  
</style>
