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

    it('wrong parameters throw', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).get(11, 11);
        },
        /^RangeError: Get parameters must be less than width and height$/
      );
    });
  });

  describe('set', function () {
    it('should work', function () {
      let temp = new Matrix(1, 1);
      temp.set(0, 0, 'happy matrix');
      assert(temp.get(0, 0) === 'happy matrix');
    });

    it('wrong parameters throw', function () {
      assert.throws(
        () => {
          new Matrix(10, 10).set(15, 15, 'should not work');
        },
        /^RangeError: Get parameters must be less than width and height$/
      );
    });
  });
});

// describe('MatrixIterator', function () {});
