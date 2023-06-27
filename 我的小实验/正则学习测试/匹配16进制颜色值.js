let color = "#ffbbad #Fc01DF #FFF #ffE";
let inputColor = "#000";

let regmatch = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
let reg = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

console.log(color.match(regmatch));

console.log(reg.test(inputColor));
