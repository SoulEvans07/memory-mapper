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
        switch(this.bit.state) {
          case 0: 
            this.$refs.bit.classList = "status-bit warning";
            break;
          case 1: 
            this.$refs.bit.classList = "status-bit selected";
            break;
          default:
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
    background: #ccffcc;
  }

  .status-bit.error {
    background: #f99;
  }

  .status-bit.warning {
    background: #ff9;
  }
</style>
