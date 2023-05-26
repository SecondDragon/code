const arr = [2, 3, 1, 5, 6, 8, 7, 9, 4]; // 1 3 4 6 7 9  最长递增的子序列 求个数
// 2 3 5 6 7 9

// 2 
// 2 3 
// 1 3
// 1 3 5
// 1 3 5 6
// 1 3 5 6 8
// 1 3 5 6 7 
// 1 3 5 6 7 9 
// 1 3 4 6 7 9  这个是值

// 默认我们每次放入的时候 我都知道当前的 最小的结尾

// 2 1 8 4 6 7  索引





// 0 1  / 2  = 0.5 | 0 = 0
function getSequence(arr) { // 最终的结果是索引 
    const len = arr.length;
    const result = [0]; // 索引  递增的序列 用二分查找性能高
    const p = arr.slice(0); // 里面内容无所谓 和 原本的数组相同 用来存放索引
    let start;
    let end;
    let middle;
    for (let i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
            let resultLastIndex = result[result.length - 1];
            // 取到索引对应的值
            if (arr[resultLastIndex] < arrI) {
                p[i] = resultLastIndex; // 标记当前前一个对应的索引
                result.push(i);
                // 当前的值 比上一个人大 ，直接push ，并且让这个人得记录他的前一个
                continue
            }
            // 二分查找 找到比当前值大的那一个
            start = 0;
            end = result.length - 1;
            while (start < end) { // 重合就说明找到了 对应的值
                middle = ((start + end) / 2) | 0; // 找到中间位置的前一个
                if (arr[result[middle]] < arrI) {
                    start = middle + 1
                } else {
                    end = middle
                } // 找到结果集中，比当前这一项大的数
            }
            // start / end 就是找到的位置
            if (arrI < arr[result[start]]) { // 如果相同 或者 比当前的还大就不换了
                if (start > 0) { // 才需要替换
                    p[i] = result[start - 1]; // 要将他替换的前一个记住
                }
                result[start] = i;
            }
        }
    }
    let len1 = result.length // 总长度
    let last = result[len1 - 1] // 找到了最后一项
    while (len1-- > 0) { // 根据前驱节点一个个向前查找
        result[len1] = last
        last = p[last]
    }
    return result;
}

console.log(getSequence([5,3,4,0])); // 求出连续后 我就知道哪些不用动了

// [1,2]

// 求当前列表中最大递增的个数

// 贪心 + 二分查找


// 在查找中如果当前的比最后的一个大，直接插入
// 如果当前这个比最后一个小,采用二分查找的方式 找到已经排好的列表，找到比当前数大的那一项 将其替换掉

// 1,8,5,3,4,9,7,6,2,2.5

// 1 
// 1 8
// 1 5
// 1 3 4
// 1 3 4 7
// 1 3 4 6
// 1 2 2.5 6