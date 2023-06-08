const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
// after how many iterations the next will occur 
process.env.UV_THREADPOOL_SIZE = 2;
// set timer - using arrow function 
// not running inside I/O loop
setTimeout(() => console.log("TImer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished") , 0);

// using file system 
fs.readFile('test-file.txt' , () =>{
    console.log("I/O finished");
    console.log("------------------");

    setTimeout(() => console.log("TImer 2 finished"), 0);
    // event loop will wait for the time specirfid
    setTimeout(() => console.log("TImer 3 finished"), 3000);
    // will occurs immediately 
    setImmediate(() => console.log("Immediate 2 finished") , 0);

    // part of micro task - gets run by the next phase(meaning the end of the last phase)
    process.nextTick(() => console.log("Process.nextTick"));

    // using crypto module - length , iteration and how strong it will be 
    crypto.pbkdf2Sync('password', 'salt', 100000, 528, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    })
    // works in sybc way 
    crypto.pbkdf2Sync('password', 'salt', 100000, 528, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2Sync('password', 'salt', 100000, 528, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2Sync('password', 'salt', 100000, 528, 'sha512', () => {
        console.log(Date.now() - start, 'Password encrypted');
    });

});

console.log("Hello from top-level code");
