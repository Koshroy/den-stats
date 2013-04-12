function genGradeData(chartData) {
	var gradeData = 
	{
		labels: ["Freshman", "Sophomore", "Junior", "Senior"], 
		datasets: [ { data: [0, 0,0, 0] } ] 
	}; // 4 classes, initialize counts to 0


	var tempDataArr = [0, 0, 0, 0];

	console.log(chartData);
	for(var i = 0; i < chartData.length; i++) {
		if(chartData[i].grade == "freshman") {
			gradeData.datasets[0].data[0]++;
		}
		else if (chartData[i].grade == "sophomore") {
			gradeData.datasets[0].data[1]++;
		}
		else if (chartData[i].grade == "junior") {
			gradeData.datasets[0].data[2]++;
		}
		else if (chartData[i].grade == "senior") {
			gradeData.datasets[0].chartData[3]++;
		}
	}


	console.log(gradeData.datasets[0].data);

	return gradeData
}

function genHoursData(chartData) {
	var hoursHist = {};

	for(var i = 0; i < chartData.length; i++) {
		var avgHours = (chartData[i].hours[0] + chartData[i].hours[1]) / 2;
		if (avgHours in hoursHist) {
			hoursHist[avgHours] += 1;
		}
		else { hoursHist[avgHours] = 1; }
	}

	var hoursKeys = Object.keys(hoursHist);
	var hoursData = [];
	for(var i = 0; i < hoursKeys.length; i++) {
		hoursData.push(hoursHist[hoursKeys[i]]);
	}


	return {
		labels: hoursKeys.map(function (num) { return num.toString(); } ),
		datasets: [ {data: hoursData }]
	};
}

function getChartData(chartName) {
	var jsonData = {}
	$.ajax({
		dataType: "json",
		url: chartName+".json",
		async: false, 
		data: undefined,
		success: function(data) {
			jsonData = data;
		}});
	return jsonData;
}

function genChartData(chartName) {
	var chartData = getChartData(chartName);
	return [
		{title: "Grade/Class Distribution", data: genGradeData(chartData)},
		{title: "Average Class Hours Taken", data: genHoursData(chartData)}
	];
}
