//Width and height of map
var width = 960;
var height = 500;

var lowColor = '#f9f9f9'
var highColor = '#bc2a66'


// D3 Projection
var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2]) // translate to center of screen
    .scale([1000]); // scale things down so see entire US

// Define path generator
var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
    .projection(projection); // tell path generator to use albersUsa projection

//Create SVG element and append map to the SVG
//WHERE ARE THIS CODE?
const svg = d3.select(".map")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .attr("class", "graph")
    .attr("fill", "blue");


d3.csv('../dataSource/Sheet 1-Mental_Health_Care_in_the_Last_4_Weeks.csv').then(function (data) {
    var dataFilter = [];

    for (var d = 0; d < data.length; d++) {
        if (data[d].Group === 'By State' && data[d].Indicator === 'Needed Counseling or Therapy But Did Not Get It, Last 4 Weeks' && data[d]['Time Period'] === '13')
            dataFilter.push(data[d])
    }

    console.log('dataFilter', dataFilter); //51

    var dataValue = dataFilter.map(function (d) {
        return parseFloat(d.Value);
    });

    var minVal = d3.min(dataValue)
    var maxVal = d3.max(dataValue)
    var ramp = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])
    //console.log('minVal', minVal);//12.2
    //console.log('maxVal', maxVal);//26.8

    // Load GeoJSON data and merge with states data
    d3.json('us-states.json').then(function (json) {

        // Loop through each state data value in the .csv file
        for (var i = 0; i < dataFilter.length; i++) {

            // Grab State Name
            //var dataState = data[i].State;
            var dataState = dataFilter[i].State;

            // Grab data value 
            //var dataValue = data[i].Value;
            var dataValue = dataFilter[i].Value;

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;

                if (dataState === jsonState) {

                    // Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;

                    // Stop looking through the JSON
                    break;
                }
            }

        }
        console.log('json.features', json.features);
        const obj = json.parse(d);

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll('.path')
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function (d) { return ramp(d.properties.value) });

        // add a legend
        var w = 140, h = 300;

        var key = d3.select(".map")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "legend")
            .attr("transform", "translate(15, 6)"); //

        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "100%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        legend.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", highColor)
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", lowColor)
            .attr("stop-opacity", 1);

        key.append("rect")
            .attr("width", w - 100)
            .attr("height", h)
            .style("fill", "url(#gradient)")
            .attr("transform", "translate(0,10)");

        var y = d3.scaleLinear()
            .range([h, 0])
            .domain([minVal, maxVal]);

        var yAxis = d3.axisRight(y);

        key.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(41,10)")
            .call(yAxis)
            ;
    })


});
