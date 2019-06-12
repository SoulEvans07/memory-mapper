import Bit from './bit'

export default class Slice {
	constructor(size) {
		this.bits = [];
		for(let i = 0; i < size; i++) {
			this.bits.push(new Bit(i));
		}
	}
}