import Bit from './bit'

export default class Instance {
	constructor(size) {
		this.size = size;
		this.bits = [];
		for(let i = 0; i < size; i++) {
			this.bits.push(new Bit(i));
		}
		this.slices = [];
	}
}