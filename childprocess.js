let cp=require("child_process");
// cp.execSync("calc"); //opens calculator
// cp.execSync("code"); //opens vs code
// cp.execSync("start chrome"); //opens chrome
// cp.execSync("start chrome https:\\www.google.com") //opens chrome with google.com
let x=cp.execSync("node abc.js"); // receives the output frm abc.js file
console.log(""+x); //""+ to make output value from binary to string