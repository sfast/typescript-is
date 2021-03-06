/* tslint:disable:max-classes-per-file */

import * as assert from 'assert';
import { AssertType, ValidateClass } from '../index';

describe('@ValidateClass, @AssertType', () => {
    describe('@ValidateClass(), @AssertType() parameter: number = 50', () => {
        const expectedMessageRegExp = /Type assertion failed.$/;

        @ValidateClass()
        class TestClass {
            testMethod(@AssertType() parameter: number = 50) {
                return parameter;
            }
        }

        const instance = new TestClass();

        it('should pass validation for numbers', () => {
            assert.strictEqual(instance.testMethod(0), 0);
            assert.strictEqual(instance.testMethod(1), 1);
            assert.strictEqual(instance.testMethod(-1), -1);
            assert.strictEqual(instance.testMethod(42), 42);
            assert.strictEqual(instance.testMethod(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);
            assert.strictEqual(instance.testMethod(Number.NEGATIVE_INFINITY), Number.NEGATIVE_INFINITY);
            assert.strictEqual(Number.isNaN(instance.testMethod(Number.NaN)), true);
        });

        it('should pass validation when the argument is missing or undefined', () => {
            assert.strictEqual(instance.testMethod(), 50);
            assert.strictEqual(instance.testMethod(undefined), 50);
        });

        it('should throw an error for non-numbers', () => {
            assert.throws(() => instance.testMethod('' as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod('0' as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod('1' as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod(true as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod(false as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod({} as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod([] as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod(null as any), expectedMessageRegExp);
        });
    });

    describe('@ValidateClass(), @AssertType() parameter?: number', () => {
        const expectedMessageRegExp = /Type assertion failed.$/;

        @ValidateClass()
        class TestClass {
            testMethod(@AssertType() parameter?: number) {
                return parameter;
            }
        }

        const instance = new TestClass();

        it('should pass validation for numbers', () => {
            assert.strictEqual(instance.testMethod(0), 0);
            assert.strictEqual(instance.testMethod(1), 1);
            assert.strictEqual(instance.testMethod(-1), -1);
            assert.strictEqual(instance.testMethod(42), 42);
            assert.strictEqual(instance.testMethod(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);
            assert.strictEqual(instance.testMethod(Number.NEGATIVE_INFINITY), Number.NEGATIVE_INFINITY);
            const nanResult = instance.testMethod(Number.NaN);
            assert.strictEqual(typeof nanResult === 'number' && Number.isNaN(nanResult), true);
        });

        it('should pass validation when the argument is missing or undefined', () => {
            assert.strictEqual(instance.testMethod(), undefined);
            assert.strictEqual(instance.testMethod(undefined), undefined);
        });

        it('should throw an error for non-numbers', () => {
            assert.throws(() => instance.testMethod('' as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod('0' as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod('1' as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod(true as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod(false as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod({} as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod([] as any), expectedMessageRegExp);
            assert.throws(() => instance.testMethod(null as any), expectedMessageRegExp);
        });
    });
});
