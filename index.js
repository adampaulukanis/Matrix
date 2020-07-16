'use strict';

export default class Matrix {
	constructor (width, height, element = (x, y) => undefined) {
		this.width = width;
		this.height = height;
		this.content = [];

		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				this.content[y * width + x] = element(x, y);
			}
		}
	}

	get (x, y) {
		if (!(x < this.width && x >= 0 && y < this.height && y >= 0)) {
			throw new RangeError('Get parameters must be within range <0 ... width | height>');
		}
		return this.content[y * this.width + x];
	}

	set (x, y, value) {
		if (!(x < this.width && x >= 0 && y < this.height && y >= 0)) {
			throw new RangeError('Get parameters must be within range <0 ... width | height>');
		}
		this.content[y * this.width + x] = value;

		return this;
	}

	// {
	// First I was thinking about using Array.prototype.map function, but it seems
	// not that good.
	toString () {
		let output = '';
		for (let y = 0; y < this.height; ++y) {
			for (let x = 0; x < this.width; ++x) {
				output += this.get(x, y);
				output += '\t';
			}
			output += '\n';
		}
		return output;
	}
	// }

	isInside (x, y) {
		return (x < this.width && x >= 0 && y < this.height && y >= 0);
	}

	[Symbol.iterator] () {
		return new MatrixIterator(this);
	}
}

class MatrixIterator {
	constructor (matrix) {
		this.x = 0;
		this.y = 0;
		this.matrix = matrix;
	}

	next () {
		if (this.y == this.matrix.height) {
			return { done: true };
		}

		let value = {
			x: this.x,
			y: this.y,
			value: this.matrix.get(this.x, this.y)
		};

		this.x++;
		if (this.x == this.matrix.width) {
			this.x = 0;
			this.y++;
		}

		return { value, done: false };
	}
}
