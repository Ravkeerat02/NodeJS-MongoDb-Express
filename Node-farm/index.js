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

// top level is executed only once when code is executed
// will read the data and parse the json as a a string 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('Hello from the server')
    }else if(pathName === '/product'){
        res.end('This is the product')
    }else if (pathName === '/api'){
        // reads the content in the data.json file - content is gonna be in json - __ - refers to current file 
        // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data) =>{
        //     // converts json into string 
        //     const productData = JSON.parse(data); 
            // console.log(productData);
            // sends back the data in json format
            res.writeHead(200,{'Content-type':'application/json'})
            res.end(data)
    }else{
        // head - response we are about to send
        res.writeHead(404,{
            'Content-type' : 'text/html'
        }); 
        res.end('<h2>Pgae not found</h2>')
    }
});
// listen - takes in few params(port-computer address(local))
server.listen(8000,'127.0.0.1', () =>{
    console.log('Listening to request on p8000')
})

