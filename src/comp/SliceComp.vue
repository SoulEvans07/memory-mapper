<template>
  <div class="slice">
    <bit v-for="(bit,i) in this.slice.bits"
      v-bind:key="i"
      v-bind:bit="bit"
      v-on:bit-clicked="bitClicked"/>
    <input type="button" value="list" v-on:click="list" />
  </div>
</template>

<script>
  import BitComp from './BitComp'

  export default {
    name: "slice",
    components: { 'bit': BitComp },
    props: [ 'slice' ],
    created () {
    },
    methods: {
      bitClicked(bit) {
        let index = this.slice.bits.indexOf(bit);
        if(!hasSelected(this.slice.bits)) {
          bit.selected = true;
        } else {
          let left = getLeftEdge(this.slice.bits);
          let right = getRightEdge(this.slice.bits);
          if(index > right) {
            setRange(this.slice.bits, right+1, index, true);
          } else if(index < left) {
            setRange(this.slice.bits, index, left-1, true);
          }
        }
      },
      list() {
        this.slice.bits.forEach(bit => console.log(bit.pos,bit.selected));
      }
    }
  }

  function setRange(list, start, end, sel){
    range(start, end).forEach(index => list[index].selected = sel);
  }

  function getRightEdge(list) {
    let index = -1;
    for(let i = 0; i < list.length; i++){
      if(list[i].selected == true)
        index = i;
    }
    return index;
  }

  function getLeftEdge(list) {
    let index = -1;
    for(let i = list.length-1; i >= 0; i--){
      if(list[i].selected == true)
        index = i;
    }
    return index;
  }

  function hasSelected(list) {
    let has = false;
    list.forEach(bit => {
      if(bit.selected === true)
        has = true;
    });
    return has;
  }

  function range(start, end) {
    if(start === end) return [start];
    return [start, ...range(start + 1, end)];
  }
</script>

<style scoped>
  .slice {
    background: lightgray;
    display: inline-flex;
    flex-direction: row;
    flex-grow: 0;
    padding: 4px;
  }
</style>
