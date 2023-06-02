const fs = require('fs');
// fs - refers to file system module

// async version of file sync
// UTF-8 - will not cause the buffer and read it staright in english
const txtIn = fs.readFileSync('./txt/input.txt','utf-8')
console.log(txtIn)
//  const hello = 'Hello world'
// console.log(hello)

