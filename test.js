let a = [
  { name: "joker", height: 11 },
  { name: "testla", height: 11 },
  { name: "jhon", height: 11 }
];
let b = [];
a.map(item => {
  b.push(item);
});
b[1] = "aaa";
console.log(a);
console.log(b);
