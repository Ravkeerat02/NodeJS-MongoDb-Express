// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module1");
const calc1 = new C();
console.log(calc1.add(2, 5));
console.log('************************')
console.log(calc1.divide(1000,50));
console.log('************************')

// exports
// const calc2 = require("./test-module-2");
const { add, multiply  } = require("./test-module2");
console.log(multiply(2, 5));
console.log('************************')
console.log(add(10,12));

// caching - code is loaded = time it was initalized
require("./test-module3")();
