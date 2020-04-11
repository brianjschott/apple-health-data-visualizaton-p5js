let testdata, workout, heartRateArray
//x,y, r, graphWidth, graphHeight, labelFreq = 0, minVal = 0, maxVal = 0
let graphSettings = {}

let workoutNum = 169
function preload() {
    testdata = loadJSON("../../data/converted/mergedHeartrateWorkoutData.json")

}

function setup() {
    
    createCanvas(1200, 600)
    
    workouts = testdata["workouts"]
    
    createDropdownFromArrayOfWorkouts(workouts)

    workoutHeartrateReadings = workouts["workoutHeartrateReadings"]

    if (workoutHeartrateReadings != undefined) {
        heartRateArray = getArrayOfDataFromPropertiesOfObjectArray(workoutHeartrateReadings, "hr")
        graphSettings = {
            graphTitle: "Workout Heartrate Data",
            titleSpacing: 25,
            x: 50,
            y: 100,
            rows: 10,
            cols: workoutHeartrateReadings.length,
            graphWidth: 950,
            graphHeight: 400,
            labelFreqX:20,
            labelFreqY: 2,
            minValRows: 60,
            maxValRows: 160,
            minValCols: 0,
            maxValCols: workoutHeartrateReadings.length,
            dataPointSize: 5,
            lineColor: 'red',
            bgColor: 'purple'
        }
        

        drawGrid(graphSettings)
        plotDataWithLines(heartRateArray, graphSettings)
    }
 

    
}

function draw() {

    
}

function drawGrid(graphSettings) {
    background(graphSettings.bgColor)
    textSize(54)
    if (graphSettings.graphTitle != undefined) {
        textAlign(CENTER)
        text(graphSettings.graphTitle, (graphSettings.x + (graphSettings.x + graphSettings.graphWidth))/2, graphSettings.y - graphSettings.titleSpacing)
    }

    textSize(10)
    stroke('black')
    drawRows(graphSettings)
    drawCols(graphSettings)
}

function drawRows(graph) {
    let counter = 0
    let currentLabelVal = graph.maxValRows
    let labelRowSpacing = 5
    let labelRowVerticalSpacing = 5 
    textStyle(BOLD)
    textAlign(RIGHT)
    for (let i = graph.y; i <= (graph.graphHeight + graph.y); i += (graph.graphHeight/graph.rows)) {
           line(graph.x, i, graph.x + graph.graphWidth, i)
           if (graph.labelFreqY != 0 && counter % graph.labelFreqY == 0) {
                text(currentLabelVal, graph.x - labelRowSpacing, i + labelRowVerticalSpacing)
           }
           counter++
           currentLabelVal -= (Math.abs(graph.maxValRows - graph.minValRows) / graph.rows)
    }
}

function drawCols(graph) {
    let counter = 0
    let currentLabelVal = graph.minValCols
    let labelColSpacing = 15   
    let labelColHorizontalSpacing = 0
    textStyle(BOLD)
    textAlign(CENTER)
    for (let i = graph.x; i <= (graph.graphWidth + graph.x); i += (graph.graphWidth/graph.cols)) {
        line(i, graph.y, i, graph.y + graph.graphHeight)
        if (graph.labelFreqX != 0 && counter % graph.labelFreqX == 0) {
            text(int(currentLabelVal), i + labelColHorizontalSpacing, graph.y + graph.graphHeight + labelColSpacing)
        }
        counter++
        currentLabelVal += (Math.abs(graph.maxValCols - graph.minValCols) / graph.cols)
    }
}

function plotData(readings, graphSettings) {
    let arrayIndex = 0;
    strokeWeight(5)
    if (readings != undefined) {
        for (let i = graphSettings.x; i <= (graphSettings.x + graphSettings.graphWidth); i += (graphSettings.graphWidth/graphSettings.cols)) {
            if (readings[arrayIndex] == undefined) {break}
            let newYValue = map(readings[arrayIndex], graphSettings.minValRows, graphSettings.maxValRows, graphSettings.y, graphSettings.y + graphSettings.graphHeight)
            point(i, newYValue)
            arrayIndex++;
        }
    }
    else {
        print("Error getting data")
    }
}

function plotDataWithLines(readings, graphSettings) {
    let arrayIndex = 0;
    strokeWeight(5)
    if (readings != undefined) {
        for (let i = graphSettings.x; i <= (graphSettings.x + graphSettings.graphWidth); i += (graphSettings.graphWidth/graphSettings.cols)) {
            if (readings[arrayIndex] == undefined) {break}

            let newYValue = map(readings[arrayIndex], graphSettings.minValRows, graphSettings.maxValRows, graphSettings.y, graphSettings.y + graphSettings.graphHeight)
            point(i, newYValue)
            
            if (arrayIndex > 0) {
                stroke(graphSettings.lineColor)
                line(i, newYValue, previousXVal, previousYVal)
            }
            previousXVal = i
            previousYVal = newYValue
            
            arrayIndex++;
        }
    }
    else {
        print("Error getting data")
    }
}

function getArrayOfDataFromPropertiesOfObjectArray(array, propName) {
    let newArray = []
    
    for (item of array) {
        console.log(item)
        newArray.push(item[propName])
    }
    return newArray
}

function createDropdownFromArrayOfWorkouts(array) { 
    const sel = createSelect();
    sel.position(width-20, height-20)
    for (let i = 0; i < array.length; i++) {
        let elem = array[i]
        const option = createElement('option')
        option.html(elem.type + ": " + elem.date)
        option.attribute("index", i)
        sel.child(option)
    }
}

function getWorkoutFromList(timestamp) {

}