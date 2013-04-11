function genGradeData(chartName) {
	var gradeData = 
	{
		labels: ["Freshman", "Sophomore", "Junior", "Senior"], 
		datasets: [ { data: [0, 0,0, 0] } ] 
	}; // 4 classes, initialize counts to 0


	var tempDataArr = [0, 0, 0, 0];

	var jsonData = $.ajax({
		dataType: "json",
		url: chartName+".json",
		async: false, 
		data: undefined,
		success: function(data) {
			console.log(data);
			for(var i = 0; i < data.length; i++) {
				if(data[i].grade == "freshman") {
					gradeData.datasets[0].data[0]++;
				}
				else if (data[i].grade == "sophomore") {
					gradeData.datasets[0].data[1]++;
				}
				else if (data[i].grade == "junior") {
					gradeData.datasets[0].data[2]++;
				}
				else if (data[i].grade == "senior") {
					gradeData.datasets[0].data[3]++;
				}
			}
		}
		});

	console.log(gradeData.datasets[0].data);

	return gradeData
}

function genChartData(chartName) {
	return [
		genGradeData(chartName)
	];
}
