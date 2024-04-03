const fs = require("fs");
const process = require("process");
// $ npm install axios
const axios = require("axios");

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

if (process.argv[2].slice(0, 4) === "http") {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}
