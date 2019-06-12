export default class Bit {
	constructor(pos) {
		this.pos = pos;
		this.state = 0;			// 0: none, 1: selected, 2: error
	}
}