let a = { b: 11, fn: null };
if (typeof a.fn !== "undefined") {
  console.log("bb");
}
console.log("b");
