/**
 * () 捕获分组
 * (?:)非捕获分组 不把分组对应的值放入result中
 * (?...) 命名捕获分组
 */
let regexp = /user(\d+)(?:[a-z]+)/;
let value = '000user100home';;
let result = value.match(regexp);
console.log(result);
//0匹配到的内容 第一个分组 第二个分组
//[ 'user100home', '100','home', index: 0, input: 'user100', groups: undefined ]
console.log(result.length);