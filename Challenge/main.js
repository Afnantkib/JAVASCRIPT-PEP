#!/usr/bin/env node
(function () {

    let input = process.argv.slice(2);
    //use npm link to link to global
    let lineNo = 1;
    // let strData = "";
    let s = n = b = concat = append = false;
    const fs = require("fs");
    let fileArr = [];
    for (let i of input) {
        if (i[0] == "-") {
            if (i == "-s") {
                s = true;
            } else if (i == "-n") {
                if (!b) {
                    n = true;
                }
            } else if (i == "-b") {
                if (!n) {
                    b = true;
                }
            }
        } else if (i == ">>") {
            concat = true;
        }
        else if (fs.existsSync(i)) {

            fileArr.push(i);

        } else {
            console.log("File path dosent match");

        }
    }
    let strData = "";
    if (concat) {
        for (i = 0; i < fileArr.length - 2; i++) {
            fileFn(fileArr[i], s, n, b);
        }

        let lastFilePath = fileArr[fileArr.length - 1];
        fs.writeFileSync(lastFilePath, strData);
    } else if (append) {
        for (i = 0; i < fileArr.length - 2; i++) {
            fileFn(fileArr[i], s, n, b);
        }

        let lastFilePath = fileArr[fileArr.length - 1];
        fs.appendFileSync(lastFilePath, strData);
    }
    else {
        for (let i of fileArr) {
            fileFn(i, s, n, b);
        }
    }
    // console.log(strData);
    function fileFn(path, s, n, b) {

        let data = fs.readFileSync(path);
        data += "";
        if (s) {
            let arr = data.split("\r\n");
            let newArr = arr.slice(2);
            arr.splice(2);
            for (let i of newArr) {
                if (i != "") {
                    arr.push(i);
                }
            }
            data = arr.join("\r\n");

        }
        if (n) {
            let arr = data.split("\r\n");
            let str = "";
            arr.forEach(string => {
                str += lineNo + " " + string + "\n";
                lineNo++;

            })
            data = str;
        } else if (b) {
            let arr = data.split("\r\n");
            let str = "";
            arr.forEach(string => {
                if (string != "") {
                    str += lineNo + " " + string + "\n";
                    lineNo++;
                } else {
                    str += "\n";
                }
            })
            data = str;
        }
        strData += data;
    }






    console.log(strData);
}())