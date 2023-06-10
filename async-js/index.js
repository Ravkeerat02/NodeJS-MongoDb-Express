const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

// Promise function takes in an executor function (asynchronous code)
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      // Result of the error handler
      if (err) reject('Could not find it');
      resolve(data);
    });
  });
};

// creating Promise function - takes in file and thing thats been worked upon
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject('Nothing was found');
            resolve('Success . WE FOUND IT') ;
        });
    });
};  
        

readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);

    // Returns a promise - pending promise (no data returned)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);

    // fs.writeFile('dog-img.txt', res.body.message, err => {
    //   if (err) {
    //     console.log('Error writing to file');
    //     return;
    //   }
    //   console.log('Dog saved');
    // });f
  })
// Used for returning an error
    .then(()=>{
        console.log('IMAGE SAVED'); 
        
    }) 
    .catch(err => {
        console.log(err.message);
  });
