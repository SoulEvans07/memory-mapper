<template>
  <div class='bit'
    ref='bit'
    v-on:click='click'></div>
</template>

<script>
  export default {
    name: 'bit',
    props: [ 'bit' ],
    watch: {
      'bit.state': function() {
        switch(this.bit.state) {
          case 0: 
            this.$refs.bit.classList = "bit";
            break;
          case 1: 
            this.$refs.bit.classList = "bit selected";
            break;
          default:
            this.$refs.bit.classList = "bit error";
        }
      }
    },
    methods: {
      click () {        
        this.$emit('bit-clicked', this.bit);
      },
      setState(){}
    }
  }
</script>

<style scoped>
  .bit {
    background: #eee;
    width: 32px;
    height: 32px;    
  }

  .bit:hover {
    background: #ddd;
  }

  .bit.selected {
    background: #888;
  }

  .selected:hover {
    background: #777
  }

  .bit.error {
    background: #844;
  }

  .error:hover {
    background: #773535
  }
</style>
