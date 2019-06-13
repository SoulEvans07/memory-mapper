<template>
  <div class='editor'>
    <div class='status'>
      <status-bit v-for='(bit,i) in this.instance.bits'
        v-bind:key='i'
        v-bind:bit='bit'/>
      <div class="placeholder-box"/>
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
        v-on:click="addSlice(addCount)" />
      <input class="number-box" type="number"
        v-model="addCount" 
        min="1"
        v-bind:max="this.instance.size - this.instance.slices.length"
        v-on:blur="updateCount"
        v-on:keypress.enter="addSlice(addCount)" />
    </div>
  </div>
</template>

<script>
  import Instance from '../models/instance'
  import Slice from '../models/slice'
  import statusbit from '../comp/StatusBit.comp'
  import slice from '../comp/Slice.comp'

  export default {
    components: { 
      slice,
      'status-bit': statusbit
    },
    data () {
      return {
        instance: new Instance(32),
        addCount: 1
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
      addSlice(count = 1) {
        for(let i = 0; i < count; i++)
          this.instance.slices.push(new Slice(this.instance.size));
        this.addCount = 1;
      },
      removeSlice(slice){
        this.instance.slices.splice(this.instance.slices.indexOf(slice),1);
        this.checkStatus();
      },
      updateCount() {
        if(this.addCount > this.instance.size - this.instance.slices.length) {
          this.addCount = this.instance.size - this.instance.slices.length;
        } else if(this.addCount < 1) {
          this.addCount = 1;
        }
      }
    }
  }
</script>

<style scoped>
  .ghost {
    opacity: 0.5;
  }

  .editor {
    background: #aaa;
    padding: 10px;
    display: flex;
    flex-grow: 0;
    flex-direction: column;
  }

  .placeholder-box {
    margin-left: 10px;
    width: 32px;
    height: 16px;
  }

  .status {    
    display: inline-flex;
    flex-direction: row;
    flex-grow: 0;
    padding: 4px 0;
    margin-bottom: 5px;
  }

  .slices {
    display: inline-flex;
    flex-direction: column;
    flex-grow: 0;
  }

  .controls {
    margin-top: 10px;
    display: inline-flex;
  }

  .number-box {
    margin-left: 10px;
    background: #eee;
    border: none;
    outline: none;
    width: 32px;
    max-height: 32px;
    text-align: center;
  }

  .number-box::-webkit-inner-spin-button, 
  .number-box::-webkit-outer-spin-button { 
    appearance: none;
  }

  .btn {
    background: #ccc;
    border: none;
    outline: none;
    width: 100%;
    height: 32px;
  }

  .btn:hover {
    background: #ddd;
  }

  .btn:active {
    background: #bbb;
  }
</style>
