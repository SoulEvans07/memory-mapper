<template>
  <div class='slice'
    ghost-class="ghost">
    <bit v-for='(bit,i) in this.slice.bits'
      v-bind:key='i'
      v-bind:bit='bit'
      v-on:bit-clicked='bitClicked'/>
    <input class="btn" type="button" value="-"
        v-on:click="removeSlice">
  </div>
</template>

<script>
  import draggable from "vuedraggable"
  import bit from './Bit.comp'

  export default {
    name: 'slice',
    components: { bit, draggable },
    props: [ 'slice' ],
    methods: {
      bitClicked(bit) {
        let index = this.slice.indexOf(bit);
        if(!this.slice.hasSelected()) {
          bit.state = 1;
        } else {
          let left = this.slice.getLeftEdge();
          let right = this.slice.getRightEdge();
          if(index > right) {
            this.slice.setRange(right+1, index, 1);
          } else if(index < left) {
            this.slice.setRange(index, left-1, 1);
          } else {
            let leftDiff = index - left;
            let rightDiff = right - index;
            if(leftDiff >= rightDiff) {
              this.slice.setRange(index, right, 0);
            } else {
              this.slice.setRange(left, index, 0);
            }
          }
        }
        this.$emit('slice-changed');
      },
      removeSlice() {
        this.$emit('slice-removed', this.slice);
      },
    }
  }
</script>

<style scoped>
  .ghost {
    opacity: 0.5;
  }

  .slice {
    display: inline-flex;
    flex-direction: row;
    flex-grow: 0;
    padding: 4px 0;
    cursor: pointer;
  }

  .slice:not(:first-of-type) {
    padding: 0 0 4px; 
  }

  .btn {
    margin-left: 10px; 
    background: #ccc;
    border: none;
    outline: none;
    width: 32px;
    height: 32px;
  }

  .btn:hover {
    background: #ddd;
  }

  .btn:active {
    background: #bbb;
  }
</style>
