let fs=require("fs");
let binaryBuffer=fs.readFileSync("abc.js"); //read file
console.log(binaryBuffer+"")
fs.openSync("abc.txt","w"); //  open/create file in writing mode
fs.writeFileSync("abc.txt","Hello hwoadj");  //write/create file with text and overwrites text
fs.appendFileSync("abc.txt","initial text") //appends the text / creates new file if not present
fs.mkdirSync("foldername"); //makes folder with this name 
let content=fs.readdirSync("foldername");
fs.writeFileSync("foldername/abc1.text","jadhg");
fs.writeFileSync("foldername/abc2.text","jadhg");
fs.unlinkSync("foldername/abc1.text"); //delete a particular file
fs.rmdirSync("foldername"); //deletes an empty folder
for(let i=0;i<content.length;i++){
    fs.unlinkSync("foldername/"+content[i]);         //helps empty folder
}
let bool=fs.existsSync("abc.txt"); //tells if path exists
let obj=fs.lstatSync(__dirname+"\\filename.js"); //return object about file
obj.isFile(); //tells if path is of file
obj.isDirectory(); //tells if path is of directory

