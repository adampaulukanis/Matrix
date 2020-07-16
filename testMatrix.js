'use strict';

import { strict as assert } from 'assert';
import Matrix from './index.js';

// {
describe('Matrix', function () {
  // {
  describe('constructor', function () {
    // {
    it('works', function () {
      let m = new Matrix(2, 2, (x, y) => `hi hi ${x} ${y}`);
      assert(m.content.length === 4);
    });
    // }
  });
  // }

  // {
  describe('get', function () {
    // {
    it('retrieves the correct value', function () {
      let temp = new Matrix(1, 1, (x, y) => `Matrix${x} ${y}`);
      assert(temp.get(0, 0) === `Matrix0 0`);
    });
    // }

    // {
    it('wrong parameters throw when x is bigger than width', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(11, 1);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }

    // {
    it('wrong parameters throw when x is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(-11, 1);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }

    // {
    it('wrong parameters throw when y is bigger than height', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(1, 100);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }

    // {
    it('wrong parameters throw when y is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(1, -101);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }
  });
  // }

  // {
  describe('set', function () {
    // {
    it('should work', function () {
      let temp = new Matrix(1, 1);
      temp.set(0, 0, 'happy matrix');
      assert(temp.get(0, 0) === 'happy matrix');
    });
    // }

    // {
    it('wrong parameters throw when x is bigger than width', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(15, 5, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }

    // {
    it('wrong parameters throw when x is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(-15, 5, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }

    // {
    it('wrong parameters throw when y is bigger than height', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(5, 115, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }

    // {
    it('wrong parameters throw when y is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(5, -15, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
    // }

    // {
    it('you can chain it', function () {
      let temp = new Matrix(2, 2);
      temp.set(0, 0, 'happy matrix').set(1, 1, 'hyhy');
      assert(temp.content.toString() === 'happy matrix,,,hyhy');
    });
    // }
  });
  // }

  // {
  describe('iterator', function () {
    // {
    it('looping over a matrix with for/of loop', function () {
      let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
      for (let { x, y, value } of matrix) {
        assert(value === `value ${x}, ${y}`);
      }
    });
    // }
  });
  // }

  // {
  describe('toString', function () {
    // {
    it('the output is a string', function () {
      let napis = new Matrix(3, 3, (x, y) => `(${x} ${y})`).toString();
      napis = napis.replace(/\s/g, ''); // get rid of tabs and spaces
      assert(napis === '(00)(10)(20)(01)(11)(21)(02)(12)(22)');
    });
    // }
  });
  // }

  // {
  describe('isInside', function () {
    // {
    it('the point is outside', function () {
      let m = new Matrix(2, 2);
      assert(m.isInside(3, 5) === false);
    });
    // }

    // {
    it('the point is inside', function () {
      let m = new Matrix(2, 2);
      assert(m.isInside(1, 1) === true);
    });
    // }
  });
  // }
});
// }
