let pathToRegExp = require('path-to-regexp');
let keys = [];
let regexp = pathToRegExp('/home',keys,{end:false});
console.log(regexp);
//console.log(regexp.test('/home'));
//console.log(regexp.test('/home/'));
console.log(regexp.test('/home//'));
//正向肯定前瞻，我要拿条件来约束 ，但又不想把这部分内容放在结果里
console.log(regexp.exec('/home/xxx'));
/* /user/name
/user/name/
/user/names */