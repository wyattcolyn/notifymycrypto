//load current chart package
google.charts.load("45", {
  packages: ["corechart", "line"]
});
// set callback function when api loaded\
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawChart3);
google.charts.setOnLoadCallback(drawAllChart);

let interval = 3600

function drawChart() {
	$.ajax({

        dataType: 'json', // type of response data
        url : "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10&toTs=-1&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b",
        type : 'GET',
        success : function(response) {
        	let initialValue = response.Data.Data[0].high
        	let initialTime = serialDateToNiceDate(response.Data.Data[0].time/3600/24).toString().substr(0,24)
        	  // create data object with default value
        	  let data = google.visualization.arrayToDataTable([
        	  	["Hours", "1 Bitcoin in USD"],
        	  	[initialTime, initialValue]
        	  	]);
        	for(let i=1 ;i < response.Data.Data.length; i++) {
        		data.addRow([serialDateToNiceDate(response.Data.Data[i].time/3600/24).toString().substr(0,24), response.Data.Data[i].high])
        	}

  // create options object with titles, colors, etc.
  let options = {
  	title: "Bitcoin",
  	colors: ['#64056C'],
  	backgroundColor: 'none',

  	hAxis: {
  		title: "Time",
  		textPosition: 'none',
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	vAxis: {
  		title: "USD",
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	legend: {
  		textStyle: {
  			color: '#1A48A4'
  		}
  	},

  	titleTextStyle: {
  		color: '#1A48A4'
  	}
  };
  // draw chart on load
  let chart = new google.visualization.LineChart(
  	document.getElementById("BTCchart_div"));
  chart.draw(data, options);

  window.addEventListener("resize", function () {
  	chart.draw(data, options);
  })

  const Button = document.getElementById("btcButton");

  Button.addEventListener("click", function() {
  	chart.draw(data, options);
  });

  // interval for adding new data every ???(sec)
  let currentTime = 0;
  let updateTime = Date.now()/1000

  setInterval(function() {
  	$.ajax({

				dataType: 'json', // type of response data
				url : 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b',
				type : 'GET',
				success : function(response) {
					let value = response.USD
					currentTime = serialDateToNiceDate((updateTime+=interval)/3600/24).toString().substr(0,24);
					data.addRow([currentTime, value]);
					chart.draw(data, options);
				},
			})
  }, interval*1000);
}
})
}

function drawChart2() {

	$.ajax({

        dataType: 'json', // type of response data
        url : "https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=10&toTs=-1&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b",
        type : 'GET',
        success : function(response) {
        	let initialValue = response.Data.Data[0].high
        	let initialTime = serialDateToNiceDate(response.Data.Data[0].time/3600/24).toString().substr(0,24)
        	  // create data object with default value
        	  let data = google.visualization.arrayToDataTable([
        	  	["Hours", "1 Ethereum in USD"],
        	  	[initialTime, initialValue]
        	  	]);
        	  for(let i=1 ;i < response.Data.Data.length; i++) {
        	  	data.addRow([serialDateToNiceDate(response.Data.Data[i].time/3600/24).toString().substr(0,24), response.Data.Data[i].high])
        	  }

  // create options object with titles, colors, etc.
  let options = {
  	title: "Ethereum",
  	backgroundColor: 'none',
  	hAxis: {
  		title: "Time",
  		textPosition: 'none',
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	vAxis: {
  		title: "USD",
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	legend: {
  		textStyle: {
  			color: '#1A48A4'
  		}
  	},

  	titleTextStyle: {
  		color: '#1A48A4'
  	}
  };
  // draw chart on load
  let chart = new google.visualization.LineChart(
  	document.getElementById("ETHchart_div")
  	);
  chart.draw(data, options);

  window.addEventListener("resize", function () {
  	chart.draw(data, options);
  })

    const Button = document.getElementById("ethButton");

    Button.addEventListener("click", function() {
    	chart.draw(data, options);
    });

  // interval for adding new data every ???(sec)
  let currentTime = 0;
  let updateTime = Date.now()/1000

  setInterval(function() {
  	$.ajax({
				dataType: 'json', // type of response data
				url : 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b',
				type : 'GET',
				success : function(response) {
					let value = response.USD
					currentTime = serialDateToNiceDate((updateTime += interval)/3600/24).toString().substr(0,24);
					data.addRow([currentTime, value]);
					chart.draw(data, options);
				},
			})
  }, interval*1000);

}
})
}

function drawChart3() {

	$.ajax({

        dataType: 'json', // type of response data
        url : "https://min-api.cryptocompare.com/data/v2/histohour?fsym=LTC&tsym=USD&limit=10&toTs=-1&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b",
        type : 'GET',
        success : function(response) {
        	let initialValue = response.Data.Data[0].high
        	let initialTime = serialDateToNiceDate(response.Data.Data[0].time/3600/24).toString().substr(0,24)        
        	  // create data object with default value
        	  let data = google.visualization.arrayToDataTable([
        	  	["Hours", "1 Litecoin in USD"],
        	  	[initialTime, initialValue]
        	  	]);
        	  for(let i=1 ;i < response.Data.Data.length; i++) {
        	  	data.addRow([serialDateToNiceDate(response.Data.Data[i].time/3600/24).toString().substr(0,24), response.Data.Data[i].high])
        	  }

  // create options object with titles, colors, etc.
  let options = {
  	title: "Litecoin",
  	backgroundColor: 'none',
  	colors: ['7FFFD4'],
  	hAxis: {
  		title: "Time",
  		textPosition: 'none',
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	vAxis: {
  		title: "USD",
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	legend: {
  		textStyle: {
  			color: '#1A48A4'
  		}
  	},

  	titleTextStyle: {
  		color: '#1A48A4'
  	}
  };
  // draw chart on load
  let chart = new google.visualization.LineChart(
  	document.getElementById("LTCchart_div")
  	);
  chart.draw(data, options);

  window.addEventListener("resize", function () {
  	chart.draw(data, options);
  })

  const Button = document.getElementById("ltcButton");

  Button.addEventListener("click", function() {
  	chart.draw(data, options);
  });

  // interval for adding new data every ???(sec)
  let currentTime = 0;
  let updateTime = Date.now()/1000
  setInterval(function() {

  	$.ajax({
				dataType: 'json', // type of response data
				url : 'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b',
				type : 'GET',
				success : function(response) {
					let value = response.USD
					currentTime = serialDateToNiceDate((updateTime += interval)/3600/24).toString().substr(0,24);
					data.addRow([currentTime, value]);
					chart.draw(data, options);
				},
			})

  }, interval*1000);
}
})
}

function drawAllChart() {

	function ajaxCall1() {
		var obj;
		$.ajax({

        dataType: 'json', // type of response data
        url : "https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=10&toTs=-1&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b",
        type : 'GET',
        async: false,
        success : function(response) {
        	obj = response.Data.Data
        }
      });
		return obj;
	}


	function ajaxCall2() {
		var obj;
		$.ajax({
        dataType: 'json', // type of response data
        url : "https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=10&toTs=-1&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b",
        type : 'GET',
        async: false,
        success : function(response) {
        	obj = response.Data.Data
        }
      });
		return obj
	}

	$.ajax({
        dataType: 'json', // type of response data
        url : "https://min-api.cryptocompare.com/data/v2/histohour?fsym=LTC&tsym=USD&limit=10&toTs=-1&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b",
        type : 'GET',
        success : function(response) {
        	let btcArray = ajaxCall1()
        	let ethArray = ajaxCall2()
        	let initialTime = serialDateToNiceDate(response.Data.Data[0].time/3600/24).toString().substr(0,24)       
        	  // create data object with default value
        	  let allData = google.visualization.arrayToDataTable([
        	  	["Months", "1 Bitcoin in USD", "1 Ethereum in USD", "1 Litecoin in USD"],
        	  	[initialTime, btcArray[0].high, ethArray[0].high, response.Data.Data[0].high]
        	  	]);
        	  for(let i=1 ;i < response.Data.Data.length; i++) {
        	  	allData.addRow([serialDateToNiceDate(response.Data.Data[i].time/3600/24).toString().substr(0,24), btcArray[i].high, ethArray[i].high, response.Data.Data[i].high])
        	  }

  // create options object with titles, colors, etc.
  let allOptions = {
  	title: "AllCoins",
  	curveType: 'function',
  	legend: { position: 'bottom' },
  	colors: ['#64056C', 'blue', '7FFFD4'],
  	backgroundColor: 'none',

  	hAxis: {
  		title: "Time",
  		textPosition: 'none',
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	vAxis: {
  		title: "USD",
  		textStyle: {
  			color: '#1A48A4'
  		},
  		titleTextStyle: {
  			color: '#1A48A4'
  		}
  	},

  	legend: {
  		textStyle: {
  			color: '#1A48A4'
  		}
  	},

  	titleTextStyle: {
  		color: '#1A48A4'
  	}
  };
  // draw chart on load
  let allChart = new google.visualization.ComboChart(
  	document.getElementById("Allchart_div")
  	);
  allChart.draw(allData, allOptions);

  window.addEventListener("resize", function () {
  	allChart.draw(allData, allOptions);
  })

  const Button = document.getElementById("allButton");

  Button.addEventListener("click", function() {
  	allChart.draw(allData, allOptions);
  });

  // interval for adding new data every 5000ms
  let currentTime = 0;
  let updateTime = Date.now()/1000
  
  setInterval(function() {
  	function currentAjaxCall1() {
  	var obj;
  	$.ajax({

				dataType: 'json', // type of response data
				url : 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b',
				type : 'GET',
				async: false,
				success : function(response) {
					 obj = response.USD
				},
			})
  	return obj;
  }

  	function currentAjaxCall2() {
  	var obj;
  	$.ajax({
				dataType: 'json', // type of response data
				url : 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b',
				type : 'GET',
				async: false,
				success : function(response) {
					obj = response.USD
				},
			})
  	return obj
  }

  	$.ajax({

				dataType: 'json', // type of response data
				url : 'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD&api_key=ec2e8882cd27fcbe32ed27687f29807cbf1da7d48bdb20618663752206e8af0b',
				type : 'GET',
				success : function(response) {
					let btcValue = currentAjaxCall1()
					let ethValue = currentAjaxCall2()
					currentTime = serialDateToNiceDate((updateTime += interval)/3600/24).toString().substr(0,24);
					allData.addRow([currentTime, btcValue, ethValue, response.USD]);
  				allChart.draw(allData, allOptions);
				},
			})

  }, interval*1000);
}
})
}

function serialDateToNiceDate(date) {
  return new Date(Math.round((date)*86400*1000));
  }