const fs = require('fs');
const http = require('http') ; 
const url = require('url') ;

// fs - refers to file system module
// http - gives networking capabiloties
// async version of file sync
// UTF-8 - will not cause the buffer and read it staright in english
// Blocking - sync way 
// const txtIn = fs.readFileSync('./txt/input.txt','utf-8')
// console.log(txtIn)
// const txtOut = `This is an expermient : ${txtIn}\n Added text ON ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',txtOut);
// console.log('Txt added')


// // Non-blocking - async way
// // will start reading and then move on to he next cmd given
// // 2 arg - err 1 , data - 2
// // Read-this name and start.txt(name inside the file should be same )
// // example of callback HELL - reads line after line - executes in one go 
// fs.readFile('./txt/stat.txt','utf-8',  (err , data1) =>{
//     if(err ) return console.log('ERROR')
//     fs.readFile(`./txt/${data1}.txt` , 'utf-8' , (err , data2) =>{
//         console.log(data2);
//         fs.readFile(`./txt/append.txt` , 'utf-8' , (err , data3) =>{
//             console.log(data3);
//             // there is no data - can produce the error
//                 fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                     console.log('File has been customized')  
//             })
//         });
//     });
// }); 
// console.log('Read this file')

// ********************SERVER***********************
// requires call back function
const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('Hello from the server')
    }else if(pathName === '/product'){
        res.end('This is the product')
    }else{
        res.writeHead(404); 
        res.end('Pgae not found')
    }
});
// listen - takes in few params(port-computer address(local))
server.listen(8000,'127.0.0.1', () =>{
    console.log('Listening to request on p8000')
})

