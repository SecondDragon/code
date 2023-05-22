

function swap<T, U>(a: T, b: U) {

}
namespace x {
    type logFunc = (a: number | string) => void;
    let log: logFunc;
    function log1(a: number | string | boolean): void {
        console.log(a);
    }
    log = log1;
    log1(true);
    //arguments of type 'true' is not assignable to parameter of type 'string | number'.ts(2345)
    log(1);

}

interface SumFun {
    (a: string, b: string): string
    getType: any
}
let Sum: SumFun;
function FakeSum(a: string, b: string): string {
    return a;
}
FakeSum.getType = function () {
    console.log('Sum getType');
}
Sum = FakeSum;



let s2: string = 'xx';