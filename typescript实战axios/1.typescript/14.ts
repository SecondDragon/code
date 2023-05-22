export { }
//声明文件怎么写
/**
 * 1.你把它用TS重写一遍
 * 2.给它配上声明文件
 * jquery js写的没有 ts
 */
declare const $: (selector: string) => {
    click(): void
    width(length: number): void
}
//--------------
$('#root').click();
$('#root').width(100);
declare let name: string;
declare let age: number;
declare function getName(): string;
declare class Animal { name: string }

interface Person6 {
    name: string
}
//lbs rbs
type Student = Person6 | string;

declare const enum Seasons {
    Spring,
    Summer,
    Autumn,
    Winter
}
let seasons: Seasons[] = [
    Seasons.Spring,
    Seasons.Summer,
    Seasons.Autumn,
    Seasons.Winter
]
console.log(seasons);
