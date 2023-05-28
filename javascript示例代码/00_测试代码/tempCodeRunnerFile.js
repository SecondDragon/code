var x=5

function foo3(x, y = x + 2) {
  console.log(x);
  // y();
  console.log(y);
  console.log(x);

  var x;
  console.log(x);
}
foo3(1);
console.log(x);