import "../css/div_style.css"
import "../css/title_style.less"

// 创建div元素
const divEl = document.createElement("div")
divEl.textContent = "Hello World"
divEl.classList.add("content")
document.body.append(divEl)


// 创建h2元素
const titleEl = document.createElement("h2")
titleEl.textContent = "哈哈哈哈"
titleEl.classList.add("title")
document.body.append(titleEl)
