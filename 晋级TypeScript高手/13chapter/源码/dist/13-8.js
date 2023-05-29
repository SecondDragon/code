"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max);
var maxBigOne = max + 1n;
console.log(maxBigOne);
var maxBigtwo = max + 2n;
console.log(maxBigtwo);
console.log(maxBigOne === maxBigtwo);
