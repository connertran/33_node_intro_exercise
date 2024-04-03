const fs = require("fs");
const process = require("process");
// $ npm install axios
const axios = require("axios");

function writeOutputInFile(file, data) {
  fs.writeFile(file, data, "utf8", function (err) {
    if (err) {
      console.error(`Couldn't write ${file}: ${err}`);
      process.exit(1);
    }
  });
}

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (e) {
    console.log(`Error fetching ${url}: ${e}`);
    process.exit(1);
  }
}
function catWrite(path, filename) {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    writeOutputInFile(path, data);
  });
}

async function webCatWrite(path, url) {
  try {
    let res = await axios.get(url);
    let data = res.data;
    writeOutputInFile(path, data);
  } catch (e) {
    console.log(`Error fetching ${url}: ${e}`);
    process.exit(1);
  }
}

if (process.argv[2] === "--out") {
  const outputFile = process.argv[3];
  const readOrURLFile = process.argv[4];
  if (readOrURLFile.slice(0, 4) === "http") {
    webCatWrite(outputFile, readOrURLFile);
  } else {
    catWrite(outputFile, readOrURLFile);
  }
} else {
  if (process.argv[2].slice(0, 4) === "http") {
    webCat(process.argv[2]);
  } else {
    cat(process.argv[2]);
  }
}
