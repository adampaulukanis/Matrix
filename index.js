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
		if (!(x < this.width && y < this.height)) {
			throw new RangeError('Get parameters must be less than width and height');
		}
		return this.content[y * this.width + x];
	}

	set (x, y, value) {
		if (!(x < this.width && y < this.height)) {
			throw new RangeError('Get parameters must be less than width and height');
		}
		this.content[y * this.width + x] = value;
	}
}

Matrix.prototype[Symbol.iterator] = function () {
	return new MatrixIterator(this);
};

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
