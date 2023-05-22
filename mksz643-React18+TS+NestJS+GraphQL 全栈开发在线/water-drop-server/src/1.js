const data = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        state: 'NY'
    }
};
const flattenedData = Object.values(data).reduceRight((acc, cur) => {
    debugger
    if (typeof cur === 'object') {
        return Object.assign(acc, cur);
    }
    return acc.concat(cur);
}, []);
console.log(flattenedData);