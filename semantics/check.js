const util = require('util');
const { ArrayType, Func, RecordType, IdExp } = require('../ast');
const { IntType, FloatType, StringType, NullType } = require('./builtins');

function doCheck(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
module.exports = {
    isArray(expression) {
        doCheck(expression.type === ArrayType);
    },

    isArrayType(type) {
        doCheck(type.type === ArrayType, 'Not an array type');
    },

    isInteger(expression) {
        doCheck(expression.type === IntType, 'Not an integer');
    },

    isNumber(expression) {
        doCheck(expression.type === IntType || expression.type === FloatType, 'Not a number');
    },

    isString(expression) {
        doCheck(expression.type === StringType, 'Not a string');
    },

    isIntegerOrString(expression) {
        doCheck(
            expression.type === IntType || expression.type === StringType,
            'Not an integer or string',
        );
    },

    isFunction(value) {
        doCheck(value.constructor === Func, 'Not a function');
    },

    // Are two types exactly the same?
    expressionsHaveTheSameType(e1, e2) {
        doCheck(e1.type === e2.type, 'Types must match exactly');
    },

    // Can we assign expression to a variable/param/field of type type?
    isAssignableTo(expression, type) {
        doCheck(
            (expression.type === NullType && type.constructor === RecordType)
                || expression.type === type,
            `Expression of type ${util.format(
                expression.type,
            )} not compatible with type ${util.format(type)}`,
        );
    },

    isNotReadOnly(lvalue) {
        doCheck(
            !(lvalue.constructor === IdExp && lvalue.ref.readOnly),
            'Assignment to read-only variable',
        );
    },

    fieldHasNotBeenUsed(field, usedFields) {
        doCheck(!usedFields.has(field), `Field ${field} already declared`);
    },

    // Same number of args and params; all types compatible
    legalArguments(args, params) {
        doCheck(
            args.length === params.length,
            `Expected ${params.length} args in call, got ${args.length}`,
        );
        args.forEach((arg, i) => this.isAssignableTo(arg, params[i].type));
    },

    // If there is a cycle in types, they must go through a record
    noRecursiveTypeCyclesWithoutRecordTypes() {
        /* TODO */
    },
};
