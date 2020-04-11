const fs = require('fs')
const xml2js = require('xml2js')

var parser = new xml2js.Parser()


var methods = {
    //input a file path as a string, outputs to a resultant file in JSON
    //only works for small files
    convertXMLFileToJSON: function (xmlInputFile, jsonOutputFile) {

        fs.readFile(xmlInputFile, (err, data) => {
            
            if (err) return console.log("Read file error", err)

            parser.parseString(data, (err, result) => {
            
                if (err) return console.log("String parse error", err)
                
                jsonWriter(result, jsonOutputFile)
                
            })
            
        })
    },

    //takes in a file path, returns a JSON object
    //credit to medium and @osiolabs for this helper function
    jsonReader: function(filePath) {
        

            return JSON.parse(fs.readFileSync(filePath))

    
    },

    jsonWriter: function(jsonObject, jsonOutputFilePath) {
        fs.writeFile(jsonOutputFilePath, JSON.stringify(jsonObject, undefined, 2), (err) => {
                    
            if (err) return console.log("File write error", err)

        })
    },

    //inputs: a JSON object, the text to be found in that value, and the text to replace it with
    //modified from a post, thanks to StackOverflow: https://stackoverflow.com/questions/24482814/json-object-array-inside-array-find-and-replace-in-javascript
    findAndReplace: function(object, value, replaceValue) {

        for (var x in object) {
            if (object.hasOwnProperty(x)) {
                if (typeof object[x] == 'object') {
                    this.findAndReplace(object[x], value, replaceValue);
                }
                if (typeof object[x] == 'string' && object[x].search(value) != -1) { 
                    console.log("replacing", object[x])
                    object[x] = object[x].replace(value, replaceValue)
                    console.log ("now it is", object[x])
                    // break; // uncomment to stop after first replacement
                }
            }
        }
    }
}

module.exports = methods