let str = "webpackChunkName: 'title'";
let regexp = /webpackChunkName:\s*['"]([^'"]+)['"]/;
console.log(str.match(regexp)[1]);