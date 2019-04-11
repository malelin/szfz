let a = [
  { name: "joker", height: 11 },
  { name: "testla", height: 11 },
  { name: "jhon", height: 11 }
];
let b = a.slice(1, 2);
console.log(b);
b[0].name = "lemen";
console.log(b);
console.log(a);
let json = [1, 2, 3, { aa: 11 }];
let obj = { height: 100, ...json };
console.log(obj);
