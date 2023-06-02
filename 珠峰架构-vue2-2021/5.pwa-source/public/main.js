
const ul = document.querySelector('ul');


async function getList(){ 
    // fetch Api 浏览器提供的 天生支持promise
    let res = await fetch('/api/list');
    let data = await res.json();
    let str = '';
    data.forEach(link=>{
        str+= `<li><img src="${link}" /></li>`
    })
    ul.innerHTML = str;
}
getList();
