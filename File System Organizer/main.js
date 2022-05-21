#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
let input = process.argv.slice(2);
let command = input[0];
const types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
switch (command) {
    case "tree": treeFn(input[1])
        break;
    case "organize": console.log(input[1]);
        organizeFn(input[1]);
        break;
    case "help": helpFn();
        break;
    default: console.log("Please  enter right command");
        break;
}

function treeFn(dirPath) {
    if (dirPath == undefined) {
        treeHelper(process.cwd(),"                                                ")
        return;
    }
    else if (fs.existsSync(dirPath)) {
        // fs.mkdirSync("Organized Folder");
        // console.log(dirPath);
        treeHelper(dirPath, "                                                ");


    }
    else {

        console.log(__dirname + "Path does not exist");
        return;
    }

}



function treeHelper(dirPath, indent) {

    let isFile = fs.lstatSync(dirPath).isFile();
    // console.log(isFile);
    if (isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent, "|-------", fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "|_______", dirName);
        let children=fs.readdirSync(dirPath);
        for(let i of children){
            let childPath=path.join(dirPath,i);
            treeHelper(childPath,indent,"\t");
        }
    }
}
function organizeFn(dirPath) {
    //input dir path
    //create organised directory
    //check all files
    //identfy categories
    if (dirPath == undefined) {
        console.log("Kindly enter the path");
        return;
    }
    else if (fs.existsSync(dirPath)) {
        // fs.mkdirSync("Organized Folder");

        let destPath = path.join(dirPath, "Organized Files");
        if (fs.existsSync(destPath)) {
            console.log("Folder already exists");
            return;
        }
        fs.mkdirSync(destPath);
        organizeHelper(dirPath, destPath)

    }
    else {

        console.log(__dirname + "Path does not exist");
        return;
    }

}
function helpFn() {
    console.log(`
    List of all the commands:
    node main.js tree "<directoryPath>"
    node main.js organize "<directoryPath>"
    node main.js help

`)
}
function organizeHelper(src, dest) {
    let children = fs.readdirSync(src);
    for (let i of children) {
        let childAddress = path.join(src, i);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            let category = getCategory(i);
            console.log(category);
            sendToCategory(childAddress, dest, category);
        }
    }
}
function getCategory(childName) {
    let ext = path.extname(childName);
    ext = ext.slice(1);
    console.log(ext);
    for (let type in types) {
        let currType = types[type];
        for (let i = 0; i < currType.length; i++) {
            if (ext == currType[i]) {
                return type;
            }

        }
    }
    return "others";
}
function sendToCategory(srcFilePath, dest, category) {

    let catPath = path.join(dest, category);
    if (!fs.existsSync(catPath)) {
        fs.mkdirSync(catPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(catPath, fileName);

    fs.copyFileSync(srcFilePath, destFilePath);




}


