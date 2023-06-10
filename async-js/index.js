const fs = require('fs');
const superagent = require('superagent');

// Promise function to read a file
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
};

// Promise function to write to a file
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('No modification allowed');
      resolve('Yepieeeeeeeeeeeeeee');
    });
  });
};

// Async function to get dog pictures
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // Send multiple requests concurrently using Promise.all
    // getting the resilt for all3 requests at the same time 
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // looping all 3 at the same time - so it can be executed all togdther
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    // Write images to a file
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Image saved to file!');
  } catch (err) {
    console.log(err);

    throw err;
  }
  return '2: READY 🐶';
};

// Getting the input(result)
(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();
