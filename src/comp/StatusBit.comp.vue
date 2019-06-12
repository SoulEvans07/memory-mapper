<template>
  <div class='status-bit'
    ref='bit'
    v-on:click='click'></div>
</template>

<script>
  export default {
    name: 'bit',
    props: [ 'bit' ],
    watch: {
      'bit.state': function() {
        this.updateClass();
      }
    },
    mounted() {
      this.updateClass();
    },
    methods: {
      click () {        
        this.$emit('bit-clicked', this.bit);
      },
      updateClass () {
        if (this.bit.state == 1) {
          this.$refs.bit.classList = "status-bit selected";
        } else {
          this.$refs.bit.classList = "status-bit error";
        }
      }
    }
  }
</script>

<style scoped>
  .status-bit {
    background: #eee;
    width: 32px;
    height: 16px;    
  }

  .status-bit.selected {
    background: #888;
  }
  .status-bit.error {
    background: #e40000;
  }
</style>
