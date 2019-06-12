<template>
  <div class='editor'>
    <div class='status'>
      <bit v-for='(bit,i) in this.instance.bits'
        v-bind:key='i'
        v-bind:bit='bit'/>
    </div>
    <div class="slices">
      <slice v-for="(slice, i) in this.instance.slices"
        v-bind:key="i"
        v-bind:slice="slice"
        v-on:slice-removed="removeSlice"
        v-on:slice-changed="checkStatus" />
    </div>
    <div class="controls">
      <input class="btn" type="button" value="+"
        v-on:click="addSlice">
    </div>
  </div>
</template>

<script>
  import Instance from '../models/instance'
  import Slice from '../models/slice'
  import bit from '../comp/Bit.comp'
  import slice from '../comp/Slice.comp'

  export default {
    components: { slice, bit },
    data () {
      return {
        instance: new Instance(16)
      }
    },
    mounted() {
      this.addSlice();
      this.checkStatus();
    },
    methods: {
      checkStatus() {
        let bits = this.instance.bits;
        let slices = this.instance.slices;
        bits.forEach((bit, index) => {
          bit.state = 0;
          slices.forEach(slice => {
            bit.state += slice.bits[index].state > 0 ? 1 : 0;
          })
        });
        bits.forEach((bit, index) => {
          slices.forEach(slice => {
            if(slice.bits[index].state > 0) {
              if(bit.state > 1){
                slice.bits[index].state = 2;
              } else {
                slice.bits[index].state = 1;
              }
            }
          })
        });
      },
      addSlice() {
        this.instance.slices.push(new Slice(this.instance.size));
      },
      removeSlice(slice){
        this.instance.slices.splice(this.instance.slices.indexOf(slice),1);
        this.checkStatus();
      }
    }
  }
</script>

<style scoped>
  .editor {
    background: #aaa;
    padding: 10px;
    display: flex;
    flex-grow: 0;
    flex-direction: column;
  }

  .status {
    background: #aaa;
    display: inline-flex;
    flex-direction: row;
    flex-grow: 0;
    padding: 4px 0;
    margin-bottom: 5px;
  }

  .slices {
    background: #aaa;
    display: inline-flex;
    flex-direction: column;
    flex-grow: 0;
  }

  .controls {
    margin-top: 20px;
  }

  .btn {
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
