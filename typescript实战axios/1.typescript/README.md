-  AMD CMD  require.js sea.js
-  node commonjs commonjs2
-  es6 module 
-  umd 兼容以上三种

Enables emit interoperability between CommonJS and ES Modules 
via creation of namespace objects for all imports. 
Implies 'allowSyntheticDefaultImports'. 

moduleA.js commonjs
exports.a = 'a';
exports.b = 'b';
module.exports = 'mod'

import moduleA,{a,b} from './moduleA'; es6module


