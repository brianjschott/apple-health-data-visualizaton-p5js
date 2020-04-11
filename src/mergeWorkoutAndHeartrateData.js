const helpers = require('./fileconverthelpers.js')

let workoutData = helpers.jsonReader("data/converted/formattedWorkoutData.json")
let heartrateData = helpers.jsonReader("data/converted/heartrateData.json")
let workoutHeartrateReadings = []
let initialRecord = 0

for (workout of workoutData["workouts"]) {
    // console.log(workout)
    for (let i = initialRecord; i < heartrateData["heartrateRecords"].length; i++) {
        let record = heartrateData["heartrateRecords"][i]
        
        let start = new Date(workout.start)
        let end = new Date(workout.end)
        let hr = new Date(record.time)
        

        console.log("Checking", start, "and", end, "against", hr)

        if (start < hr && hr < end) {
            if (!workout.hasOwnProperty('workoutHeartrateReadings')) {
                workout.workoutHeartrateReadings = []
            }
            console.log(hr)
            workout.workoutHeartrateReadings.push({
                "time": record.time,
                "hr": record.heartrate
            })
        }

        if (hr > end) {
            initialRecord = i + 1;
            break;
        }
    }

}

helpers.jsonWriter(workoutData, 'data/converted/mergedHeartrateWorkoutData.json')