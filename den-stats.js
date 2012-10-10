function initFunc()
{
    $.getJSON('/course_names.json', populateCourseNames)
}

function populateCourseNames(data)
{
    console.log(data);
    for(var item in data)
    {
	console.log(item);
    }
}

function prettyCourseName(name)
{
    var dept = name.match(/\D+/);
    var num = name.match(/\d+/)
    return dept[0].toUpperCase() + ' ' + num[0];
}


$(document).ready(initFunc);