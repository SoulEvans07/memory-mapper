import Bit from './bit'

function range(start, end) {
  if(start === end) return [start];
  return [start, ...range(start + 1, end)];
}

export default class Slice {
	constructor(size) {
		this.bits = [];
		for(let i = 0; i < size; i++) {
			this.bits.push(new Bit(i));
		}
	}

  indexOf(bit) {
    return this.bits.indexOf(bit)
  }

  setRange(start, end, sel){
    range(start, end).forEach(index => this.bits[index].state = sel);
  }

  getRightEdge() {
    let index = -1;
    for(let i = 0; i < this.bits.length; i++){
      if(this.bits[i].state > 0)
        index = i;
    }
    return index;
  }

  getLeftEdge() {
    let index = -1;
    for(let i = this.bits.length-1; i >= 0; i--){
      if(this.bits[i].state > 0)
        index = i;
    }
    return index;
  }

  hasSelected() {
    let has = false;
    this.bits.forEach(bit => {
      if(bit.state > 0)
        has = true;
    });
    return has;
  }
}