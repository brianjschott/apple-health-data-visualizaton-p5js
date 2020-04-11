const fs = require('fs')
const node_xml_stream = require('node-xml-stream')
const parser = new node_xml_stream()

let heartrate, time

let heartrateList = {heartrateRecords: []}

parser.on('opentag', (name, attrs) => {
    if (name == 'Record') {
        time = attrs.startDate
        heartrate = parseFloat(attrs.value)
    }


})

parser.on('closetag', (name) => {
    if (name == 'Record') {
        heartrateList['heartrateRecords'].push({
            'time': time, 
            'heartrate': heartrate, 
        })
    }

})

parser.on('finish', () => {

    fs.writeFile('data/converted/heartrateData.json', JSON.stringify(heartrateList, undefined, 2), (err) => {
            
        if (err) return console.log("File write error", err)

    })
})

let stream = fs.createReadStream('data/apple_health_export/export.xml')
stream.pipe(parser)

