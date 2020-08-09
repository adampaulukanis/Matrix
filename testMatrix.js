'use strict';

import { strict as assert } from 'assert';
import Matrix from './index.js';

describe('Matrix', function () {
  describe('constructor', function () {
    it('works', function () {
      let m = new Matrix(2, 2, (x, y) => `hi hi ${x} ${y}`);
      assert(m.content.length === 4);
    });
  });

  describe('get', function () {
    it('retrieves the correct value', function () {
      let temp = new Matrix(1, 1, (x, y) => `Matrix${x} ${y}`);
      assert(temp.get(0, 0) === `Matrix0 0`);
    });

    it('wrong parameters throw when x is bigger than width', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(11, 1);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });

    it('wrong parameters throw when x is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(-11, 1);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });

    it('wrong parameters throw when y is bigger than height', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(1, 100);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });

    it('wrong parameters throw when y is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(1, -101);
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });
  });

  describe('set', function () {
    it('should work', function () {
      let temp = new Matrix(1, 1);
      temp.set(0, 0, 'happy matrix');
      assert(temp.get(0, 0) === 'happy matrix');
    });

    it('wrong parameters throw when x is bigger than width', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(15, 5, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });

    it('wrong parameters throw when x is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(-15, 5, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });

    it('wrong parameters throw when y is bigger than height', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(5, 115, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });

    it('wrong parameters throw when y is smaller than 0', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(5, -15, 'should not work');
        },
        /^RangeError: Get parameters must be within range <0 ... width | height>$/
      );
    });

    it('you can chain it', function () {
      let temp = new Matrix(2, 2);
      temp.set(0, 0, 'happy matrix').set(1, 1, 'hyhy');
      assert(temp.content.toString() === 'happy matrix,,,hyhy');
    });
  });

  describe('iterator', function () {
    it('looping over a matrix with for/of loop', function () {
      let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
      for (let { x, y, value } of matrix) {
        assert(value === `value ${x}, ${y}`);
      }
    });
  });

  describe('toString', function () {
    it('the output is a string', function () {
      let napis = new Matrix(3, 3, (x, y) => `(${x} ${y})`).toString();
      napis = napis.replace(/\s/g, ''); // get rid of tabs and spaces
      assert(napis === '(00)(10)(20)(01)(11)(21)(02)(12)(22)');
    });

    it('Matrix looks like this [1 2 3]', function () {
      let matrix = new Matrix(3, 1, (x, y) => x + 1);
      assert(matrix.toString() === '1\t2\t3\t\n');
    });

    it('Matrix looks like this |1|\\n|2|\\n|3|', function () {
      let matrix = new Matrix(1, 3, (x, y) => y + 1);
      assert(matrix.toString() === '1\t\n2\t\n3\t\n');
    });
  });

  describe('isInside', function () {
    it('the point is outside', function () {
      let matrix = new Matrix(2, 2);
      assert(matrix.isInside(3, 5) === false);
    });

    it('the point is inside', function () {
      let matrix = new Matrix(2, 2);
      assert(matrix.isInside(1, 1) === true);
    });
  });

  describe('rotate', function () {
    describe('rotate n x n matrix', function () {
      it('rotates to the right', function () {
        let matrix = new Matrix(4, 4, (x, y) => {
          if (x === y) return 'x';
          else return '.';
        });
        let matrixHowItShouldLookLike = new Matrix(4, 4, (x, y) => {
          if (x + y === 3)
            return 'x';
          else return '.';
        });
        assert(matrix.rotate().toString() === matrixHowItShouldLookLike.toString());
      });

      it('rotates twice', function () {
        /* Why did I have to do this test? If rotate works, than rotate even six times should work. */
        /* OK, perhaps it does not make sense but I need it for tetris. */
        let matrix = new Matrix(4, 4, (x, y) => {
          if (x === 0 && y === 0) return 1;
          else if (x === 0 && y === 1) return 2;
          else if (x === 0 && y === 2) return 3;
          else if (x === 0 && y === 3) return 4;
          else if (x === 1 && y === 0) return 5;
          else if (x === 1 && y === 1) return 6;
          else if (x === 1 && y === 2) return 7;
          else if (x === 1 && y === 3) return 8;
          else if (x === 2 && y === 0) return 9;
          else if (x === 2 && y === 1) return 0;
          else if (x === 2 && y === 2) return 11;
          else if (x === 2 && y === 3) return 12;
          else if (x === 3 && y === 0) return 13;
          else if (x === 3 && y === 1) return 14;
          else if (x === 3 && y === 2) return 15;
          else if (x === 3 && y === 3) return 16;
        });
        let matrixHowItShouldLookLike = new Matrix(4, 4, (x, y) => {
          if (x === 0 && y === 0) return 16;
          else if (x === 1 && y === 0) return 12;
          else if (x === 2 && y === 0) return 8;
          else if (x === 3 && y === 0) return 4;
          else if (x === 0 && y === 1) return 15;
          else if (x === 1 && y === 1) return 11;
          else if (x === 2 && y === 1) return 7;
          else if (x === 3 && y === 1) return 3;
          else if (x === 0 && y === 2) return 14;
          else if (x === 1 && y === 2) return 0;
          else if (x === 2 && y === 2) return 6;
          else if (x === 3 && y === 2) return 2;
          else if (x === 0 && y === 3) return 13;
          else if (x === 1 && y === 3) return 9;
          else if (x === 2 && y === 3) return 5;
          else if (x === 3 && y === 3) return 1;
        });
        assert(matrix.rotate().rotate().toString() === matrixHowItShouldLookLike.toString());
      });
    });

    describe('rotate n x m matrix', function () {
      it('matrix(n, m).rotate() when n < m', function () {
        let counter = 0;
        const matrix = new Matrix(1, 4, (x, y) => {
          return counter++;
        });
        const expectedMatrix = new Matrix(4, 1, (x, y) => {
          return (3 - (x + y));
        });
        assert(matrix.rotate().toString() === expectedMatrix.toString());
      });

      it('matrix(n, m).rotate() when n > m', function () {
        let counter = 0;
        const matrix = new Matrix(4, 1, (x, y) => ++counter);
        const expectedMatrix = new Matrix(1, 4, (x, y) => y + 1);
        assert(matrix.rotate().toString() === expectedMatrix.toString());
      });
    });
  });

  describe('addColumn', function () {
    it('first parameter must be an array', function () {
      let matrix = new Matrix(1, 1);
      assert(matrix.addColumn([1]) === true);
    });

    it('if first parameter is not array it returns false', function () {
      let matrix = new Matrix(1, 1);
      assert(matrix.addColumn(1, 2) === false);
    });

    it('first parameter must be of size exactly same as hight of matrix', function () {
      let matrix = new Matrix(1, 2);
      assert(matrix.addColumn([1, 2]) === true);
    });

    it('if first parameter is array of different length than height of matrix it returns false', function () {
      assert(new Matrix(1, 2).addColumn([1]) === false);
    });

    it('with two parametes the second one is the position', function () {
      let matrix = new Matrix(3, 3, (x, y) => x + (y + 1));
      assert(matrix.addColumn(['a', 'b', 'c'], 2) === true);
      assert(matrix.toString().replace(/\s/g, '_') === '1_2_a_3__2_3_b_4__3_4_c_5__');
    });

    it('second parameter defaults to the last column', function () {
      let matrix = new Matrix(2, 3, (x, y) => x + (y + 1));
      assert(matrix.addColumn(['a', 'b', 'c']) === true);
      assert(matrix.toString().replace(/\s/g, '_') === '1_2_a__2_3_b__3_4_c__');
    });

    it('if the second parameter is < 0 returns false', function () {
      let matrix = new Matrix(3, 3, (x, y) => x + (y + 1));
      assert(matrix.addColumn(['a', 'b', 'c'], -1) === false);
    });

    it('if the second parameter is > width returns false', function () {
      let matrix = new Matrix(3, 3, (x, y) => x + (y + 1));
      assert(matrix.addColumn(['a', 'b', 'c'], 10) === false);
    });

    it('matrix(4, 1).addColumn([x]) adds a new column', function () {
      let matrix = new Matrix(4, 1);
      assert(matrix.addColumn([1]) === true);
    });

    it('matrix(1, 3).addColumn([x, y, z]) adds a new column', function () {
      let matrix = new Matrix(1, 3);
      assert(matrix.addColumn([1, 2, 3]) === true);
    });
  });
});
