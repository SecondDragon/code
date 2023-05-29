
// var test = () => {
//   var i
//   var arr = ['zce', 38, '我为前端而活']
//   for(i=0; i<arr.length; i++) {
//     console.log(arr[i])
//   }
// }

var test = () => {
  var i
  var arr = ['zce', 38, '我为前端而活']
  var len = arr.length
  for(i=0; i<len; i++) {
    console.log(arr[i])
  }
}

var test = () => {
  var arr = ['zce', 38, '我为前端而活']
  var len = arr.length
  while(len--) {
    console.log(arr[len])
  }
}
test()