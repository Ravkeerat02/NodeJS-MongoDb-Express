const fs = require('fs');
// set timer - using arrow function 
// not running inside I/O loop
setTimeout(() => console.log("TImer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished") , 0);

// using file system 
fs.readFile('test-file.txt' , () =>{
    console.log("I/O finished");
    console.log("------------------");

    setTimeout(() => console.log("TImer 2 finished"), 0);
    setTimeout(() => console.log("TImer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished") , 0);
})

console.log("Hello from top-level code")