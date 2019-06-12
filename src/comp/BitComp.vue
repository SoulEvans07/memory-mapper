<template>
  <div class="bit"
    ref="bit"
    v-on:click="click"></div>
</template>

<script>
  export default {
    name: "bit",
    props: [ 'bit' ],
    watch: {
      'bit.selected': function(){
        if(this.bit.selected)
          this.$refs.bit.classList.add("selected");
        else
          this.$refs.bit.classList.remove("selected");
      }
    },
    methods: {
      click () {        
        this.$emit('bit-clicked', this.bit);
      }
    }
  }
</script>

<style scoped>
  .bit {
    background: #808080;
    width: 32px;
    height: 32px;    
  }

  .bit:hover {
    background: #adadad;
  }

  .bit.selected {
    background: #ffff00;
  }

  .selected:hover {
    background: #ffffc0
  }
</style>
