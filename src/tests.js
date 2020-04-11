const helpers = require('./fileconverthelpers.js')

// let data = helpers.jsonReader('data/converted/formattedData.json')

// console.log(data['workouts'].length)



// let data = helpers.jsonReader('data/converted/output.json')
// //console.log(data)
// helpers.findAndReplace(data, "HKWorkoutActivityType", "")
// helpers.jsonWriter(data, 'data/converted/formattedData.json')

let testDate = new Date("2015-08-18 10:31:00 -0400")
console.log(testDate.getTime())