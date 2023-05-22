declare const $: (selector: string) => { //变量
    click(): void;
    width(length: number): void;
};
$('#root').click();
console.log($('#root').width);
declare let name: string;  //变量
declare let age: number;  //变量
declare function getName(): string;  //方法
declare class Animal { name: string }  //类
console.log(name, age);
getName();
new Animal();
export default {};
