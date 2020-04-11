const fs = require('fs')
const node_xml_stream = require('node-xml-stream')
const parser = new node_xml_stream()

let activityType, dur, calsBurned, date, temperature, humidity, start, end

let workoutList = {workouts: []}

parser.on('opentag', (name, attrs) => {
    if (name == 'Workout') {
        activityType = attrs.workoutActivityType
        dur = parseFloat(attrs.duration)
        calsBurned = parseFloat(attrs.totalEnergyBurned)
        date = attrs.creationDate
        start = attrs.startDate
        end = attrs.endDate
    }

    if (name == 'MetadataEntry' && attrs.key == 'HKWeatherTemperature') {
        temperature = parseFloat(attrs.value.substring(0, attrs.value.indexOf(' ')))
    }

    if (name == 'MetadataEntry' && attrs.key == 'HKWeatherHumidity') {
        humidity = parseFloat(attrs.value.substring(0, attrs.value.indexOf(' ')))
    }

})

parser.on('closetag', (name) => {
    if (name == 'Workout') {
        workoutList['workouts'].push({
            'type': activityType, 
            'length': dur, 
            'caloriesBurned': calsBurned,
            'date': date,
            'start': start,
            'end': end,
            //adds temperature and humidity only if they exist for that record
            //the ... merges the second element of the && statement
            ...(temperature && {'temperature': temperature}),
            ...(humidity && {'humidity': humidity})
        })
    }
    temperature = undefined;
    humidity = undefined;
})

parser.on('finish', () => {
    console.log(workoutList)
    fs.writeFile('data/converted/output.json', JSON.stringify(workoutList, undefined, 2), (err) => {
            
        if (err) return console.log("File write error", err)

    })
})

let stream = fs.createReadStream('data/apple_health_export/export.xml')
stream.pipe(parser)

