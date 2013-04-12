var chartNames = ["cs225", "ece110"];

var testData = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,1)",
			data : [65,59,90,81,56,55,40]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,1)",
			data : [28,48,40,19,96,27,100]
		}
	]
}

var chartCanvases = {};
var whiteRGB = "#000000";

var cWidth = 400;
var cHeight = 400;

function CanvasChart(canvasElem) {
	this.canvas = canvasElem;
	this.chart = new Chart(canvasElem.getContext("2d"));
}

CanvasChart.prototype.displayData = function (data, opts) {
	this.chart.Bar(data, opts);
}

$(document).ready(readyFunc) ;

function readyFunc() {
	console.log("uguu");
	populateChartSelect();

	var chartName = $("#chartSelect").val();
	var chartAllData = genChartData(chartName);
	spawnCanvas(chartName, chartAllData);

	$("#chartSelect").change(
		function () {
			var newChartName = $("#chartSelect").val();
			spawnCanvas(newChartName, genChartData(newChartName));
		}
		);
	//spawnCanvases();
}

function populateChartSelect() {
	for(var i = 0; i < chartNames.length; i++) {
		$("#chartSelect").append(new Option(chartNames[i]+" Chart", chartNames[i]));
	}
	
}

function spawnCanvases() {
	for(var i = 0; i < chartNames.length; i++) {
		var newCanvas = document.createElement('canvas');
		newCanvas.width = cWidth;
		newCanvas.height = cHeight;

		chartCanvases[chartNames[i]] = new CanvasChart(newCanvas);
		$("#canvasDiv").append(newCanvas)
		chartCanvases[chartNames[i]].displayData(testData);
		var d = genChartData(chartNames[i]);
		console.log(d);
		chartCanvases[chartNames[i]].displayData(d);

		//paintCanvas(newCanvas, "#"+i+i+i+i+i+i);
	}
}

function spawnCanvas(chartName, chartData) {
	console.log(chartName);
	console.log(chartData);
	$("#canvasDiv").html('');
	for(var i = 0; i < chartData.length; i++) {
		var newCanvas = document.createElement('canvas');
		newCanvas.width = cWidth;
		newCanvas.height = cHeight;

		var newDiv = document.createElement("div")
		var newPar = $("<p></p>").append($("<h1></h1>").append(chartData[i].title));
		newDiv.appendChild(newPar[0]);
		newDiv.appendChild(newCanvas);
		$("#canvasDiv").append(newDiv);

		chartCanvases[chartName] = new CanvasChart(newCanvas);
		console.log(chartData[i].data);
		chartCanvases[chartName].displayData(chartData[i].data);
	}
}

function paintCanvas(canvasElem, fillColorString) {
	var ctxContext = canvasElem.getContext("2d");
	ctxContext.fillStyle = fillColorString;
	ctxContext.fillRect(0, 0, cWidth, cHeight);
	ctxContext.fillColorString = whiteRGB;
}

